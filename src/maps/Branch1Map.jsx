import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color.js";

import BaseMapview from './BaseMapview.jsx';
import { lu_group, income_group, tourist_group, pop_group, huzhou_pop_params, huzhou_edges, } from '../data/branch1_huzhou_shp.jsx';
import {  total_group, total1_group, total2_group, total3_group } from '../data/branch1_huzhou_tif.jsx';
import { CSJ_group, CSJ_params, csj_edges } from '../data/branch1_csj_shp.jsx';

import styles from './Branch1Map.module.css'


// 全局变量，当前显示的图层组
let record_layergroup = new GroupLayer({
    id: "none",
    layers: [],
});
let is_layergroup_change = false;
// 全局变量，当前时间滑块表示的年份
let initial_year = "1800";
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: initial_year,
    visible: true,
};
let record_layer = initial_layer;
let record_layerview;

const csj_info = {
    GPI:"真实发展指数（人均）",
    'GDP': "国民生产总值（人均）",
    'EF': "生态足迹（人均）",
    'ECC': "生物承载力（人均）",
};
const population_info = {
    '人口密': "人口密度",
    '人口增': "人口增长率",
};


export default function Branch1Map(props) {
    let { mapProps, viewProps } = props;
    let { cur_year, cur_option } = viewProps;

    const [view, setView] = useState(null);
    const mapviewRef = useRef(null);
    const selectintroRef = useRef(null);
    const reactRootRef = useRef(null); // 用于存储 React 组件的根
    const [popup_info, setPopupInfo] = useState({ year: "", value: "", lat: "", lon: "" });
    const [selectedCountyAttribute, setSelectedCountyAttribute] = useState(null);
    const [selectedCountyGeometry, setSelectedCountyGeometry] = useState(null);

    // INITIALIZE 初始化mapview
    useEffect(() => {
        setView(BaseMapview(mapviewRef.current,
            [
                pop_group, total3_group,
                income_group, tourist_group, total2_group,
                lu_group, total1_group,
                total_group,
                huzhou_edges,

                CSJ_group,
                csj_edges
            ],
            // { ...mapProps, widgets_list: [{ item: search_village, position: "top-right" }] }
            mapProps
        ));
        return () => {
            view && view.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch1Map unmount");
        };
    }, []);

    // INITIALIZE 初始化右上角标题组件
    useEffect(() => {
        if (!view) return;
        if (!selectintroRef.current) {
            selectintroRef.current = document.createElement('div');
            selectintroRef.current.className = styles.selectBoxContainer;
            view.ui.add(selectintroRef.current, "top-right");
            reactRootRef.current = ReactDOM.createRoot(selectintroRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (reactRootRef.current) {
            reactRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }

    }, [view, cur_option]);

    // 搜索定位行政村
    useEffect(() => {
        if (!view) return;
        const search_village = new Search({
            view: view,
            allPlaceholder: "搜索城市、行政村",
            includeDefaultSources: false,
            sources: [
                {
                    layer: huzhou_edges,
                    name: "湖州市各行政村位置",
                    searchFields: ["XZQDM", "XZQMC"],
                    suggestionTemplate: "湖州市，{XZQMC}",
                    // displayField: "XZQMC",
                    outFields: ["*"],
                    placeholder: "搜索湖州行政村名称、代码",
                },
                {
                    layer: csj_edges,
                    name: "长三角各城市位置",
                    searchFields: ["省", "省代码", "市", "市代码", "英文"],
                    suggestionTemplate: "{省}，{市}",
                    // displayField: "市",
                    outFields: ["*"],
                    placeholder: "搜索省、市名称",
                }
            ],
        });
        view.ui.add(search_village, "top-right");
        return () => {
            view.ui.remove(search_village);
        };
    }, [view]);

    // 监听浏览器窗口大小变化，自动调整图例展开状态
    useEffect(() => {
        if (!view || !mapviewRef.current || !cur_option) return;
        const legend = view.ui.find("default-legend-expand");

        const checkLegendExpanded = (init = false) => {
            let isinit = init === true ? true : false;
            const width = mapviewRef.current.clientWidth;
            // const height = mapviewRef.current.clientHeight;
            // (init && width < 550) ? legend.expanded = false : legend.expanded = true;
            if (width < 550) {
                legend.expanded = false;
            }
            else if (width >= 550 && isinit) {
                legend.expanded = true;
            }

            console.log("mapview width: " + width + " init: " + isinit + " legend expanded: " + legend.expanded);
        };
        // 初始化检查
        checkLegendExpanded(true);
        window.addEventListener("resize", checkLegendExpanded);
        return () => {
            window.removeEventListener("resize", checkLegendExpanded);
        };
    }, [view]);

    // CORE FUNCTIONS
    // 在option、year变化时，更新当前图层组和当前图层
    useEffect(() => {
        if (!view || !cur_option || !cur_year) return;
        console.log("INSIDE MAP: option changed: " + cur_option +
            " year changed: " + cur_year);
        console.log("###################################");
        is_layergroup_change = false;
        update_cur_layergroup(cur_option);
        // 根据当前尺度，展示相应的边界
        if (cur_option.includes('csj27')) {
            csj_edges.visible = true;
            huzhou_edges.visible = false;
        }
        else {
            csj_edges.visible = false;
            huzhou_edges.visible = true;
        }

        // 由于更换图层组后，新图层的id可能和旧图层的id相同，导致无法更新图层，因此需要强制更新
        update_cur_layer(cur_year, is_layergroup_change);

        if (cur_option.includes('landuse')) {   // landuse: 需要筛选LU类别
            update_cur_layerview();
        }
        else if (cur_option.includes('csj27')) {    // csj27: 需要更改renderer展示不同字段的数据
            update_csj_renderer();
        }
        else if (cur_option.includes('population')) {    // population: 需要更改renderer展示不同字段的数据
            update_population_renderer();
        }
        console.log("###################################");

        if (reactRootRef.current) {
            if(cur_option.includes("csj27")) {
                reactRootRef.current.render(<>
                    <li style={{ fontSize: "medium" }}>长三角 {csj_info[cur_option.split("_")[1]]} {cur_year}年</li>
                </>);
            }
            else if(cur_option.includes("population")) {
                reactRootRef.current.render(<>
                    <li style={{ fontSize: "medium" }}>湖州乡村 {population_info[cur_option.split("_")[1]]} {cur_year}年</li>
                </>);
            }
            else {
                reactRootRef.current.render(<>
                    <li style={{ fontSize: "medium" }}>{record_layer.title}</li>
                </>);
            }
        }

    }, [view, cur_option, cur_year]);


    // 在option变化时，根据对应图层组，修改view的中心点和缩放级别
    useEffect(() => {
        if (!view) return;
        if (cur_option.includes("csj")) {
            view.center = [119.14, 30.96],
                view.zoom = 7;
        }
        else if (cur_option.includes("landuse")) {
            view.center = [120.3, 30.7],
                view.zoom = 12;
        }
        else {
            view.center = [119.83, 30.71],
                view.zoom = 10;
        }
    }, [view, cur_option]);

    // // 对tif类型的population，添加单击查询像素值的查询函数
    // useEffect(() => {
    //     if (!view) return;
    //     const getClickInfo = async (event) => {
    //         if (record_layergroup.id == "population" || record_layergroup.id == "total") {
    //             record_layer.identify(event.mapPoint).then(response => {
    //                 if (!response.value) {
    //                     console.log("此处无数据");
    //                     return;
    //                 }
    //                 setPopupInfo({
    //                     year: record_layer.id,
    //                     value: String(response.value[0]),
    //                     lat: String(event.mapPoint.latitude),
    //                     lon: String(event.mapPoint.longitude),
    //                 });

    //             });
    //         }
    //     };

    //     const handle = view.on("click", getClickInfo);
    //     return () => {
    //         handle.remove();
    //     };
    // }, [view]);

    // // 对tif类型的population，添加popup模板
    // useEffect(() => {
    //     if (!view) return;
    //     let popup_content0 = selectedCountyAttribute ?
    //         "<b>所在位置：湖州市，" + selectedCountyAttribute.XZQMC + "</b><br />"
    //         : "<b>所在位置：湖州市";
    //     function update_population_popup() {
    //         return popup_content0
    //             + "<ul>" +
    //             "<li>数据年份：" + popup_info.year + "</li>" +
    //             "<li>人口数量：" + popup_info.value + "</li>" +
    //             // "<li>纬度：" + popup_info.lat + "</li>" +
    //             // "<li>经度：" + popup_info.lon + "</li>" +
    //             "</ul>";
    //     }
    //     function update_total_popup() {
    //         return popup_content0
    //             + "<ul>" +
    //             "<li>数据年份：" + popup_info.year + "</li>" +
    //             "<li>总体评估结果：" + popup_info.value + "</li>" +
    //             "</ul>";
    //     }

    //     pop_group.layers.forEach(layer => {
    //         layer.popupTemplate = {
    //             title: record_layer.title,
    //             content: update_population_popup(),
    //         };
    //     });
    //     total_group.layers.forEach(layer => {
    //         layer.popupTemplate = {
    //             title: record_layer.title,
    //             content: update_total_popup(),
    //         };
    //     });

    //     return () => {
    //         pop_group.layers.forEach(layer => {
    //             layer.popupTemplate = null;
    //         });
    //         total_group.layers.forEach(layer => {
    //             layer.popupTemplate = null;
    //         });
    //     };

    // }, [view, popup_info, selectedCountyAttribute]);

    // 对csj27类型的csj，根据选项设置popup模板
    useEffect(() => {
        if (!view || !cur_option) return;
        if (!cur_option.startsWith("csj27")) return;
        const tmp_field = cur_option.split("_")[1];
        const tmp_title = csj_info[tmp_field];
        function update_popup() {
            return [{
                type: "text",
                text: "<b>所在位置：{省}，{市}</b>",
            },
            {
                type: "fields",
                fieldInfos: [{
                    fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
                    label: "数据年份"              // popup表格的表头信息
                }, {
                    fieldName: tmp_field,       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
                    label: tmp_title              // popup表格的表头信息
                }],
            }];
        }
        CSJ_group.layers.forEach(layer => {
            layer.popupTemplate = {
                title: `长三角 ${tmp_title} {SJNF}年`,
                content: update_popup(),
            };
        });
        return () => {
            CSJ_group.layers.forEach(layer => {
                layer.popupTemplate = null;
            });
        };

    }, [view, cur_option]);

    // 对population，根据选项设置popup模板
    useEffect(() => {
        if (!view || !cur_option) return;
        if (!cur_option.startsWith("population")) return;
        const tmp_field = cur_option.split("_")[1];
        const tmp_title = population_info[tmp_field];
        function update_popup() {
            return [{
                type: "text",
                text: "<b>所在位置：湖州市，{XZQMC}</b>",
            },
            {
                type: "fields",
                fieldInfos: [{
                    fieldName: "SJNF",
                    label: "数据年份"
                },{
                    fieldName: "XZQMC",
                    label: "行政村名称"
                },{
                    fieldName: tmp_field, 
                    label: tmp_title
                }],
            }];
        }
        pop_group.layers.forEach(layer => {
            layer.popupTemplate = {
                title: `湖州乡村 ${tmp_title} {SJNF}年`,
                content: update_popup(),
            };
        });
        return () => {
            pop_group.layers.forEach(layer => {
                layer.popupTemplate = null;
            });
        };

    }, [view, cur_option]);

    // 对show-this-county、show-this-village，添加点击获取顶端edge图层geometry的事件
    useEffect(() => {
        if (!view) return;

        const getClickGeo = async (event) => {
            // 使用视图的 hitTest 来查找图层
            const response = await view.hitTest(event);
            const edgeFeature = response.results.find(result => result.graphic.layer.id === 'huzhou_edges'); // 确保使用正确的边缘图层标题

            if (edgeFeature) {
                console.log("成功获取edge图层的行政村mask");
                const edgeGeometry = edgeFeature.graphic.geometry; // 获取边界几何
                const edgeAttributes = edgeFeature.graphic.attributes; // 获取边界属性
                // console.log(edgeFeature);
                setSelectedCountyGeometry(edgeGeometry);
                setSelectedCountyAttribute(edgeAttributes);

            }
        };

        const handle = view.on("click", getClickGeo);

        return () => {
            handle.remove();
        };
    }, [view]);

    // popup action 事件
    useEffect(() => {
        if (!view || !selectedCountyGeometry) return;

        const handler = async (event) => {
            let orifilter = record_layerview.filter;
            let orieffect = record_layerview.featureEffect;
            if (event.action.id === "show-this-village") {
                show_this_village(orifilter);
            }
            else if (event.action.id === "show-this-county") {
                await show_this_county(orifilter);
            }
            else if (event.action.id === "show-all-data") {
                show_all_data(orifilter);
                record_layerview.featureEffect = orieffect;
            }
        };
        reactiveUtils.on(
            () => view.popup, "trigger-action",
            handler
        )

        return () => {

        };
    }, [view, selectedCountyGeometry]);


    function update_cur_layergroup(name) {
        if (name.startsWith("landuse")) {
            name = "landuse";
        }
        else if (name.startsWith("csj27")) {
            name = "csj27";
        }
        else if (name.startsWith("population")) {
            name = "population";
        }
        if (record_layergroup.id == name) {
            console.log("图层组一致，无需更新图层组。");
            return;
        }

        console.log("准备更新图层组，当前图层组：" + record_layergroup.id +
            " 目标图层组：" + name);
        let new_layergroup; let isfind = false;
        for (const element of view.map.layers) {
            if (element.title && element.title == name|| element.id == name) {
                new_layergroup = element;
                isfind = true;
                break;
            }
        }
        if (!isfind) {
            console.log("未找到，使用默认图层组：landuse");
            new_layergroup = lu_group;
        }

        record_layergroup.visible = false;
        new_layergroup.visible = true;
        record_layergroup = new_layergroup;
        is_layergroup_change = true;
        console.log("成功更新图层组，当前图层组：" + record_layergroup.id +
            " is layergroup change: " + is_layergroup_change);
        
        console.log("----------------------------");

    }

    function update_cur_layer(id, forceupdate = false) {
        id = typeof id === 'number' ? id.toString() : id;
        if (!forceupdate && record_layer && record_layer.id == id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }

        console.log("准备更新特征图层。当前特征图层id：" + record_layer.id +
            " 目标id：" + id);
        let new_layer;
        if (record_layergroup.findLayerById(id)) {
            new_layer = record_layergroup.findLayerById(id);
            new_layer.visible = true;
            record_layer.visible = false;
            record_layer = new_layer;
            console.log("--成功更新图层，当前图层id：" + id);
            console.log("----------------------------");
            return;
        }
        // 当前图层组最早的年份
        let first_id = "0";
        for (const element of record_layergroup.layers) {
            first_id = element.id;
            break;
        }
        // 若当前id超过最早年份，则cur_layer用最早的图层
        if (Number(id) < Number(first_id)) {
            record_layer = record_layergroup.findLayerById(first_id);
            record_layer.visible = true;
            console.log("--初始化成功，当前图层id：" + first_id);
        }
        else {
            let pre_id = "0";
            for (const element of record_layergroup.layers) {
                if (Number(element.id) < Number(id)) {
                    pre_id = element.id;
                }
                else {
                    break;
                }
            }
            new_layer = record_layergroup.findLayerById(pre_id);
            record_layer.visible = false;
            new_layer.visible = true;
            record_layer = new_layer;
            console.log("--成功更新图层，当前图层id：" + pre_id);
        }
        // else {
        //     console.log("--不存在可更换图层，保持原状。");
        // }
        console.log("----------------------------");

    }

    function update_csj_renderer() {
        const tmp_field = cur_option.split("_")[1];
        const tmp_param = CSJ_params[tmp_field];
        console.log("准备更新renderer。当前字段：" + tmp_field);
        CSJ_group.layers.forEach(element => {
            let tmp_layer_param = { ...tmp_param, layer: element };
            colorRendererCreator.createClassBreaksRenderer(tmp_layer_param)
                .then(response => {
                    element.renderer = response.renderer;
                });

        })
        console.log("成功更新 renderer。");
    }

    function update_population_renderer() {
        const tmp_field = cur_option.split("_")[1];
        const tmp_param = huzhou_pop_params[tmp_field];
        console.log("准备更新renderer。当前字段：" + tmp_field);
        pop_group.layers.forEach(element => {
            let tmp_layer_param = { ...tmp_param, layer: element };
            colorRendererCreator.createClassBreaksRenderer(tmp_layer_param)
                .then(response => {
                    element.renderer = response.renderer;
                });
        })
        console.log("成功更新 renderer。");
    }



    function update_cur_layerview() {
        view.whenLayerView(record_layer).then((layerview) => {
            record_layerview = layerview;
            console.log("更新layerview");

            if (record_layergroup.id == "landuse") {
                filter_layerview(cur_option);
            }
        });
    }

    function filter_layerview(option) {
        const filterMap = {
            landuse_01: "01",
            landuse_03: "03",
            landuse_11: "11"
        };

        const DL_DLBM = filterMap[option] || "-1"; // 从映射中获取值，默认值为 "-1"

        console.log("筛选：" + DL_DLBM);
        record_layerview.filter = DL_DLBM !== "-1"
            ? { where: `DL_DLBM = '${DL_DLBM}'` }
            : null; // 使用模板字符串构建条件

        const effectConfig = {
            filter: DL_DLBM !== "-1" ? new FeatureFilter({
                where: `DL_DLBM = '${DL_DLBM}'`
            }) : null,
            includedEffect: DL_DLBM !== "-1" ? " drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" : null, // 放大1.2倍
            // excludedEffect: "blur(2px) brightness(70%)" // 淡化其他不相关部分
        };
        record_layerview.featureEffect = new FeatureEffect(effectConfig);
    }

    // popup里的action按钮点击事件
    function show_this_village(orifilter) {
        let QSDWMC = view.popup.selectedFeature.attributes.QSDWMC;
        console.log("action: show-this-village, " + QSDWMC);

        // 构建查询条件
        const baseCondition = `QSDWMC ='${QSDWMC}'`;
        record_layerview.filter = {
            where: orifilter ? `${orifilter.where} AND ${baseCondition}` : baseCondition,
        };
        // 筛选后的效果
        const effectConfig = {
            includedEffect: "drop-shadow(3px, 3px, 3px, black)",
            filter: new FeatureFilter({ where: record_layerview.filter.where }),
        };
        record_layerview.featureEffect = new FeatureEffect(effectConfig);

        // 处理查询结果
        record_layerview.queryFeatures().then(response => {
            let areaByTypes = {};
            let uniqueTypes = new Set(); // 用于存储唯一的类型
            let features = response.features;

            features.forEach(feature => {
                let type = feature.attributes.DL_DLBM;
                let area = feature.attributes.TBMJ;
                // console.log(feature.attributes.QSDWMC+","+type+","+area);
                // console.log(feature.attributes.Shape__Area);
                uniqueTypes.add(type);

                areaByTypes[type] = (areaByTypes[type] || 0) + area;
            });

            // console.log(areaByTypes);
            view.popup.content = "<ul>" +
                "<p><b>权属单位名称：" + QSDWMC + "</b></p>";
            if (uniqueTypes.has("01")) {
                view.popup.content +=
                    "<li>耕地面积：" + areaByTypes["01"].toFixed(2) + " 平方米</li>";
            }
            if (uniqueTypes.has("03")) {
                view.popup.content +=
                    "<li>林地面积：" + areaByTypes["03"].toFixed(2) + " 平方米</li>";
            }
            if (uniqueTypes.has("11")) {
                view.popup.content +=
                    "<li>水体面积：" + areaByTypes["11"].toFixed(2) + " 平方米</li>";
            }
            view.popup.content += "</ul>";
            // console.log(view.popup.content);

            view.popup.dockEnabled = true;
            view.zoom = 15;
            // console.log(view.popup.location);
            view.goTo(view.popup.location)
                .catch(error => {
                    if (error.name != "AbortError") {
                        console.error(error);
                    }
                });
        });
    }

    async function show_this_county(orifilter) {
        // 确保 selectedCountyGeometry 包含有效的几何信息
        if (!selectedCountyGeometry) {
            console.error("未选中县的几何信息!");
            return;
        }

        record_layerview.filter = {
            where: orifilter ? orifilter.where : "1=1",
            geometry: selectedCountyGeometry,
            spatialRelationship: 'intersects'
        };

        // 筛选后的效果
        const effectConfig = {
            includedEffect: "drop-shadow(3px, 3px, 3px, black)",
            filter: new FeatureFilter({ where: record_layerview.filter.where }),
        };
        record_layerview.featureEffect = new FeatureEffect(effectConfig);

        // 处理查询结果
        record_layerview.queryFeatures().then(response => {
            let areaByTypes = {};
            let uniqueTypes = new Set(); // 用于存储唯一的类型
            let features = response.features;

            features.forEach(feature => {
                let type = feature.attributes.DL_DLBM;
                let area = feature.attributes.TBMJ;
                // console.log(feature.attributes.QSDWMC+","+type+","+area);
                // console.log(feature.attributes.Shape__Area);
                uniqueTypes.add(type);

                areaByTypes[type] = (areaByTypes[type] || 0) + area;
            });

            console.log(areaByTypes);
            view.popup.content = "<ul>" +
                "<p><b>区县名称：" + selectedCountyAttribute.name + "</b></p>";
            if (uniqueTypes.has("01")) {
                view.popup.content +=
                    "<li>耕地面积：" + areaByTypes["01"].toFixed(2) + " 平方米</li>";
            }
            if (uniqueTypes.has("03")) {
                view.popup.content +=
                    "<li>林地面积：" + areaByTypes["03"].toFixed(2) + " 平方米</li>";
            }
            if (uniqueTypes.has("11")) {
                view.popup.content +=
                    "<li>水体面积：" + areaByTypes["11"].toFixed(2) + " 平方米</li>";
            }
            view.popup.content += "</ul>";

            view.popup.dockEnabled = true;
            view.zoom = 15;
            // console.log(view.popup.location);
            view.goTo(view.popup.location)
                .catch(error => {
                    if (error.name != "AbortError") {
                        console.error(error);
                    }
                });

        });
    }

    function show_all_data() {
        console.log("action: show-all-data");
        update_cur_layerview();
        view.popup.dockEnabled = false;
        view.zoom = 14;

    }

    return (
        <div className={styles.mapView} ref={mapviewRef} />
    );
}