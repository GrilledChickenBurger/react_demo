import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Search from "@arcgis/core/widgets/Search";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import {
    huzhou_group, huzhou_ids,
    huzhou_lpi, idx
} from '../data/branch2_huzhou.jsx';
import { lu_group, nanxun_ids, edges } from '../data/branch2_nanxun_shp.jsx';
import { tif_group } from '../data/branch2_nanxun_tif.jsx';
import { local_group, local_ids } from '../data/branch2_local_tif.jsx';

import styles from './Branch2Map.module.css'
import Expand from '@arcgis/core/widgets/Expand.js';


// 全局变量，当前显示的图层组
let record_tif_layergroup = new GroupLayer({
    title: "none",
    layers: [],
    visible: true
});
let record_layergroup = new GroupLayer({
    title: "none",
    layers: [],
    visible: true
});
let is_layergroup_change = false;
// 全局变量，当前时间滑块表示的年份
let initial_year = "1800";
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: initial_year,
    visible:true,
};
let record_tif_layer = initial_layer;
let record_layer = initial_layer;
let record_layerview;


export default function Branch2Map(props) {
    let { mapProps, viewProps } = props;
    let { cur_year, cur_option,
        tif_opacity, tif_visible,
        shp_opacity, shp_visible } = viewProps;

    const [view, setView] = useState(null);
    const mapviewRef = useRef(null);
    const selectintroRef = useRef(null);
    const reactRootRef = useRef(null); // 用于存储 React 组件的根

    const idxRef = useRef(null);
    const RootidxRef = useRef(null);

    // INITIALIZE 初始化mapview
    useEffect(() => {
        setView(BaseMapview(mapviewRef.current,
            [   local_group,
                tif_group, lu_group, edges,
                huzhou_group],
            mapProps));
        return () => {
            view && view.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch2Map unmount");
        };
    }, []);

    // INITIALIZE 初始化右上角标题组件 + 景观格局expand组件
    useEffect(() => {
        if (!view) return;
        if (!selectintroRef.current) {
            selectintroRef.current = document.createElement('div');
            selectintroRef.current.className = styles.selectBoxContainer;
            view.ui.add(selectintroRef.current, "top-right");
            reactRootRef.current = ReactDOM.createRoot(selectintroRef.current);
        }
        if (!idxRef.current) {
            idxRef.current = document.createElement('div');
            idxRef.current.className = styles.idxContainer;
            const expand = new Expand({
                view: view,
                content: idxRef.current,
                expanded:true
            });
            view.ui.add(expand, "top-right");
            RootidxRef.current = ReactDOM.createRoot(idxRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (reactRootRef.current) {
            reactRootRef.current.render(<>
                <p style={{fontWeight:"bold", marginTop:0,marginBottom:0}}>当前内容：</p>
                </>);
        }
    }, [view, cur_option, ]);

    // 搜索定位行政村
    // useEffect(() => {
    //     if (!view) return;
    //     const search_village = new Search({
    //         view: view,
    //         allPlaceholder: "搜索城市、行政村",
    //         includeDefaultSources:false,
    //         sources: [
    //             {
    //                 layer: edges,
    //                 name:"湖州市各行政村位置",
    //                 searchFields: ["XZQDM", "XZQMC"],
    //                 suggestionTemplate: "湖州市，南浔区，{XZQMC}",
    //                 // displayField: "XZQMC",
    //                 outFields:["*"],
    //                 placeholder: "搜索湖州行政村名称、代码",
    //             },
    //         ],
    //     });
    //     view.ui.add(search_village, "top-right");
    //     return () => {
    //         view.ui.remove(search_village);
    //     };
    // }, [view]);

    // 在year变化时，更新景观格局指数信息
    useEffect(() => { 
        if (!view || !cur_option || !cur_option.startsWith("huzhou")) return;
        const tmpyear = huzhou_ids[cur_year];
        // 检查 cur_year 是否是 huzhou_lpi 的一个键
        const tmpyear_info = huzhou_lpi[tmpyear];
        if (!tmpyear_info) { 
            console.log("未找到对应年份信息。");
            return; // 中止后续代码执行
        } else {
            console.log("找到对应年份信息。年份："+tmpyear);
        }

        const tmpdict = idx.map((item, index) => 
            <li key={item}><b>{item}：</b>{tmpyear_info[index]}</li>
        );

        if (RootidxRef.current && cur_option.includes("huzhou")) {
            RootidxRef.current.render(<>
                <p style={{fontWeight:"bold", marginTop:0,marginBottom:0}}>景观格局指数：</p>
                <ul>{tmpdict}</ul>
                </>);
        }
        else {
            RootidxRef.current.render(null);
        }
        // return () => {
        //     RootidxRef.current.render(null);
        // };

    }, [view, cur_option, cur_year]);

    // 监听浏览器窗口大小变化，自动调整图例展开状态
    useEffect(() => {
        // 监听浏览器窗口大小变化，自动调整图例展开状态
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
    // 在option、year、dynasty变化时，更新当前图层组和当前图层
    useEffect(() => {
        if (!view || !cur_option || cur_year == undefined || cur_year == null) return;
        let true_id =
            cur_option.includes("huzhou") ? huzhou_ids[cur_year] || huzhou_ids[0] :
            cur_option.includes("local") ? local_ids[cur_year] || local_ids[0] :
                    nanxun_ids[cur_year] || nanxun_ids[0];
        console.log("option changed: ", cur_option,
            " year changed: ", cur_year, " true_id: ", true_id);
        console.log("###################################");
        is_layergroup_change = false;
        update_cur_layergroup(cur_option);

        update_cur_layer(true_id, is_layergroup_change);   //在图层组更新后，强制更新当前图层


        if (cur_option.startsWith("nanxun")) {
            update_cur_tif_layergroup();
            record_tif_layer = initial_layer;
            update_cur_tif_layer(true_id);
            edges.visible = true;
            update_cur_layerview();
        }
        else {
            tif_group.visible = false;
            edges.visible = false;
        }
        console.log("###################################");
        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (reactRootRef.current) {
            reactRootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_layer.title}</li>
                {cur_option.startsWith("nanxun") && <li style={{ fontSize: "medium" }}>{record_tif_layer.title}</li>}
                </>);
        }
    }, [view, cur_option, cur_year]);

    // 若当前图层组=南浔，则修改当前图层的可见性和透明度
    useEffect(() => {
        // 此处能够在不会经过update函数的情况下，直接修改对应图层的visible，
        // 若不加cur_option，就会在未选择任何选项时，提前改变landuse和tif的可见性
        if (!view || !cur_option) return;
        view.map.layers.forEach((layer) => {
            if (layer.id == "nanxun_landuse") {
                layer.opacity = shp_opacity;
                layer.visible = shp_visible;
            }
            if (layer.id == "nanxun_tif") {
                layer.opacity = tif_opacity;
                layer.visible = tif_visible;
            }
        });
    }, [view, tif_opacity, shp_opacity, tif_visible, shp_visible]);

    // 在option变化时，根据对应图层组，修改view的中心点和缩放级别
    useEffect(() => {
        if (!view || !cur_option) return;
        if (cur_option.includes("huzhou")) {
            view.center = [119.83, 30.71],
            view.zoom = 10;
        }
        else if(cur_option.includes("landuse") || cur_option === 'ALL') {
            view.center =  [120.171, 30.745],
            view.zoom = 12;
        }
        else {
            view.center = [120.24, 31.226],    
            view.zoom = 10;
        }
    }, [view, cur_option]);

    // popup action 事件
    useEffect(() => {
        if (!view) return;
        reactiveUtils.on(
            () => view.popup, "trigger-action",
            (event) => {
                let orifilter = record_layerview.filter;
                let orieffect = record_layerview.featureEffect;
                if (event.action.id === "show-this-village") {
                    console.log();
                    show_this_village(orifilter);
                }
                else if (event.action.id === "show-all-data") {
                    show_all_data(orifilter);
                    record_layerview.featureEffect = orieffect;
                }
            }
        )
    }, [view, cur_option, cur_year]);



    function update_cur_layergroup(name) {
        if (record_layergroup.id == name) {
            console.log("图层组一致，无需更新图层组。is layergroup change: " + is_layergroup_change);
            return;
        }
        console.log("准备更新图层组，当前图层组：" + record_layergroup.id +
            " 目标图层组：" + name);
        let new_layergroup; let isfind = false;
        for (const element of view.map.layers) {
            if (element.id == name) {
                new_layergroup = element;
                isfind = true;
                break;
            }
        }
        if (!isfind) {
            console.log("未找到. is layergroup change: " + is_layergroup_change);
            return;
        }

        record_layergroup.visible = false;
        new_layergroup.visible = true;
        record_layergroup = new_layergroup;
        is_layergroup_change = true;
        console.log("成功更新图层组，当前图层组：" + record_layergroup.id +
            " is layergroup change: " + is_layergroup_change);
        
        console.log("----------------------------");
    }

    function update_cur_tif_layergroup() {
        if (record_tif_layergroup.id == 'nanxun_tif') {
            console.log("图层组一致，无需更新图层组。");
            return;
        }

        console.log("准备更新TIF图层组，当前图层组：" + record_tif_layergroup.id);
        tif_group.visible = true;
        record_tif_layergroup = tif_group;
        console.log("成功更新TIF图层组，当前图层组：" + record_tif_layergroup.id);
        console.log("------------------------------");

    }
    function update_cur_tif_layer(id) {
        id = typeof id === 'number' ? id.toString() : id;
        if (record_tif_layer && record_tif_layer.id == id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新TIF图层。当前TIF图层id：" + record_tif_layer.id
            + "  目标id：" + id);
        let new_layer;
        if (record_tif_layergroup.findLayerById(id)) {
            new_layer = record_tif_layergroup.findLayerById(id);
            new_layer.visible = true;
            record_tif_layer.visible = false;
            record_tif_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + id);
            console.log("------------------------------");
            return;
        }
        // 当前图层组最早的年份
        let first_id = "0";
        for (const element of record_tif_layergroup.layers) {
            first_id = element.id;
            break;
        }
        // console.log("first_id: " + first_id + "  id: " + id);

        // 若当前id超过最早年份，则cur_layer用最早的图层
        if (Number(id) <= Number(first_id)) {
            record_tif_layer = record_tif_layergroup.findLayerById(first_id);
            record_tif_layer.visible = true;
            console.log("--初始化成功，当前图层id：" + first_id);
        }
        else {
            let pre_id = "0";
            for (const element of record_tif_layergroup.layers) {
                if (Number(element.id) < Number(id)) {
                    pre_id = element.id;
                    // console.log("pre_id: " + pre_id);
                }
                else {
                    break;
                }
            }
            new_layer = record_tif_layergroup.findLayerById(pre_id);
            record_tif_layer.visible = false;
            new_layer.visible = true;
            record_tif_layer = new_layer;
            console.log("--成功更新图层，当前图层id：" + pre_id);
        }
        // else {
        //     console.log("--不存在可更换图层，保持原状。");
        // }
        console.log("------------------------------");

    }
    function update_cur_layer(id, forceupdate = false) {
        id = typeof id === 'number' ? id.toString() : id;
        if (!forceupdate && record_layer && record_layer.id == id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }

        console.log("准备更新特征图层。当前特征图层id：" + record_layer.id
            + "  目标id：" + id);
        let new_layer;
        if (record_layergroup.findLayerById(id)) {
            new_layer = record_layergroup.findLayerById(id);
            new_layer.visible = true;
            record_layer.visible = false;
            record_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + id);
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

    function update_cur_layerview() {
        view.whenLayerView(record_layer).then((layerview) => {
            record_layerview = layerview;
            console.log("更新layerview");

            filter_layerview(cur_option);

        });
    }

    function filter_layerview(option) {
        const allTypes = ["1", "2", "3", "4", "5", "6"]; // 这里定义所有类型
        const matchedTypes = option.match(/\d/g) || []; // 获取所有数字，默认为空数组
        const uniqueFilteredTypes = [...new Set(matchedTypes)]; // 去重
        const validFilteredTypes = uniqueFilteredTypes.filter(type => allTypes.includes(type));
        console.log("筛选的类型：" + validFilteredTypes.join(', '));

        if (validFilteredTypes.length > 0) {
            // 使用 IN 子句
            record_layerview.filter = {
                where: validFilteredTypes.map(val => `研究地 = '${val}'`).join(' OR')};
            
        }
        else {
            record_layerview.filter = null; // 默认不筛选
        }

        const effectConfig = {
            filter: record_layerview.filter ? new FeatureFilter({
                where: record_layerview.filter.where,
            }) : null,
            includedEffect: record_layerview.filter ? " drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" : null, // 放大1.2倍
            // excludedEffect: "blur(2px) brightness(70%)" // 淡化其他不相关部分
        };
        record_layerview.featureEffect = new FeatureEffect(effectConfig);
    }

    // popup里的action按钮点击事件
    function show_this_village(orifilter) {
        let QSDWMC = view.popup.selectedFeature.attributes.QSDWMC;
        console.log(QSDWMC);

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

            console.log(areaByTypes);
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
        update_cur_layerview();
        view.popup.dockEnabled = false;
        view.zoom = 14;

    }

    return (
        <div className={styles.mapView} ref={mapviewRef} />
    );
}