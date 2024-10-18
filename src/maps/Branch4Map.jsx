import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import SelectBox from '../widgets/SelectBox.jsx';
import { lu_2015, lu_2019 } from '../data/branch4_shp.jsx';
import { ES2015, ES2019 } from '../data/branch4_tif.jsx';

import styles from './Branch4Map.module.css'

// 全局变量，当前时间滑块表示的年份
let initial_year = "1800";
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: initial_year,
    visible: true,
    title: "供给服务-桑园",
};
let record_2015ES_layer = initial_layer;
let record_2019ES_layer = initial_layer;
let record_result_layer = initial_layer;
let record_2015_layerview;
let record_layerview;

const option_info = [
    { value: "provision1", label: "供给服务-桑园" },
    { value: "provision2", label: "供给服务-鱼塘" },
    { value: "regulating1", label: "调节服务-涵养水源" },
    { value: "regulating2", label: "调节服务-水质净化" },
    { value: "culture1", label: "文化服务—精神" },
    { value: "culture2", label: "文化服务—休闲" },
];

export default function Branch4Map(props) {
    let { mapProps, viewProps, setResult } = props;
    let { res_visible, } = viewProps;

    const [view2015, setView2015] = useState(null); // 左上view: LU_2015
    const [viewES2015, setViewES2015] = useState(null); // 左下view: ES_2015
    const [view2019, setView2019] = useState(null); // 右上view: LU_2019
    const [viewES2019, setViewES2019] = useState(null); // 右下view: ES_2019

    const [option15, setOption15] = useState('provision1');
    const [option19, setOption19] = useState('provision1');

    const mapview2015Ref = useRef(null);
    const mapviewES2015Ref = useRef(null);
    const mapview2019Ref = useRef(null);
    const mapviewES2019Ref = useRef(null);

    const title2015Ref = useRef(null);
    const Root2015Ref = useRef(null);
    const title2019Ref = useRef(null);
    const Root2019Ref = useRef(null);

    const title2015ESRef = useRef(null);
    const Root2015ESRef = useRef(null);
    const select2015ESRef = useRef(null);
    const RootSelect2015ESRef = useRef(null);

    const title2019ESRef = useRef(null);
    const Root2019ESRef = useRef(null);
    const select2019ESRef = useRef(null);
    const RootSelect2019ESRef = useRef(null);

    useEffect(() => {
        setView2015(BaseMapview(mapview2015Ref.current, [lu_2015], mapProps));
        setViewES2015(BaseMapview(mapviewES2015Ref.current, [ES2015], mapProps));
        setView2019(BaseMapview(mapview2019Ref.current, [lu_2019], mapProps));
        setViewES2019(BaseMapview(mapviewES2019Ref.current, [ES2019], mapProps));

        return () => {
            view2015 && view2015.destroy();
            view2019 && view2019.destroy();
            viewES2015 && viewES2015.destroy();
            viewES2019 && viewES2019.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch4Map unmount");
        };
    }, []);

    useEffect(() => {
        if (!view2019 || !view2015 || !viewES2019 || !viewES2015) return;
        let handle;
        const views = [view2019, view2015, viewES2019, viewES2015];
        for (const v of views) {
            v.ui.remove("default-bookmarks-expand");
            v.ui.remove("default-search-expand");
        }
        // view视角同步
        let active;
        const sync = (source) => {
            if (!active || !active.viewpoint || active !== source) {
                return;
            }
            for (const view of views) {
                if (view !== active) {
                    view.viewpoint = active.viewpoint;
                }
            }
        };
        for (const view of views) {
            handle = reactiveUtils.watch(
                () => [view.interacting, view.viewpoint],
                ([interacting, viewpoint]) => {
                    // Only print the new zoom value when the view is stationary
                    if (interacting) {
                        active = view;
                        sync(active);
                    }
                    if (viewpoint) {
                        sync(view);
                    }
                });
        }
        return () => {
            for (const view of views) {
                handle.remove();
            }
        };
        // 监听视图变化
    }, [view2015]);

    useEffect(() => {
        if (!view2015 || !viewES2015 || !view2019 || !viewES2019) return;

        if (!title2015Ref.current) {
            title2015Ref.current = document.createElement('div');
            title2015Ref.current.className = styles.titleContainer;
            view2015.ui.add(title2015Ref.current, "top-right");
            Root2015Ref.current = ReactDOM.createRoot(title2015Ref.current);
        }
        if (!title2019Ref.current) {
            title2019Ref.current = document.createElement('div');
            title2019Ref.current.className = styles.titleContainer;
            view2019.ui.add(title2019Ref.current, "top-right");
            Root2019Ref.current = ReactDOM.createRoot(title2019Ref.current);
        }
        if (!title2015ESRef.current) {
            title2015ESRef.current = document.createElement('div');
            title2015ESRef.current.className = styles.titleContainer;
            viewES2015.ui.add(title2015ESRef.current, "top-right");
            Root2015ESRef.current = ReactDOM.createRoot(title2015ESRef.current);
        }
        if (!select2015ESRef.current) {
            select2015ESRef.current = document.createElement('div');
            select2015ESRef.current.className = styles.selectBoxContainer;
            viewES2015.ui.add(select2015ESRef.current, "top-right");
            RootSelect2015ESRef.current = ReactDOM.createRoot(select2015ESRef.current);
        }
        if (!title2019ESRef.current) {
            title2019ESRef.current = document.createElement('div');
            title2019ESRef.current.className = styles.titleContainer;
            viewES2019.ui.add(title2019ESRef.current, "top-right");
            Root2019ESRef.current = ReactDOM.createRoot(title2019ESRef.current);
        }
        if (!select2019ESRef.current) {
            select2019ESRef.current = document.createElement('div');
            select2019ESRef.current.className = styles.selectBoxContainer;
            viewES2019.ui.add(select2019ESRef.current, "top-right");
            RootSelect2019ESRef.current = ReactDOM.createRoot(select2019ESRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (Root2015Ref.current) {
            Root2015Ref.current.render(<>
                <li style={{ fontSize: "medium" }}>{lu_2015.title}</li>
            </>);
        }
        if (Root2019Ref.current) {
            Root2019Ref.current.render(<>
                <li style={{ fontSize: "medium" }}>{lu_2019.title}</li>
            </>);
        }
        if (Root2015ESRef.current) {
            Root2015ESRef.current.render(<>
                    <li style={{ fontSize: "medium" }}>{record_2015ES_layer.title}</li>
            </>);
        }
        if (RootSelect2015ESRef.current) {
            RootSelect2015ESRef.current.render(<>
                <SelectBox
                    items={option_info} handleSelectChange={(event) => { setOption15(event.target.value) }}
                />
            </>);
        }
        if (Root2019ESRef.current) {
            Root2019ESRef.current.render(<>
                    <li style={{ fontSize: "medium" }}>{record_2019ES_layer.title}</li>
           </>);
        }
        if (RootSelect2019ESRef.current) {
            RootSelect2019ESRef.current.render(<>
                <SelectBox
                    items={option_info} handleSelectChange={(event) => { setOption19(event.target.value) }}
                />
            </>);
        }
    }, [view2015]);

    // 监听浏览器窗口大小变化，自动调整图例展开状态
    useEffect(() => {
        if (!view2015 || !mapview2015Ref.current) return;
        const legend1 = view2015.ui.find("default-legend-expand");
        const legend2 = view2019.ui.find("default-legend-expand");
        const legend3 = viewES2015.ui.find("default-legend-expand");
        const legend4 = viewES2019.ui.find("default-legend-expand");
        const legend = [legend1, legend2, legend3, legend4];

        const checkLegendExpanded = (init = false) => {
            let isinit = init === true ? true : false;
            const width = mapview2015Ref.current.clientWidth;
            if (width < 550) {
                for (const l of legend) {
                    l.expanded = false;
                }
            }
            else if (width >= 550 && isinit) {
                for (const l of legend) {
                    l.expanded = true;
                }
            }

            console.log("mapview width: " + width + " init: " + isinit + " legend expanded: " + legend[0].expanded);
        };
        // 初始化检查
        checkLegendExpanded(true);
        window.addEventListener("resize", checkLegendExpanded);
        return () => {
            window.removeEventListener("resize", checkLegendExpanded);
        };
    }, [view2015]);


    useEffect(() => {
        if (!view2015 || !option15 || !option19) return;
        console.log("2015 service_option changed: ", option15);
        console.log("2019 service_option changed: ", option19);

        update_2015ES_layer(option15);
        update_2019ES_layer(option19);
        // update_cur_layerview();

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (Root2019ESRef.current) {
            Root2019ESRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_2019ES_layer.title}</li>
            </>);
        }
        if (Root2015ESRef.current) {
            Root2015ESRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_2015ES_layer.title}</li>
            </>);
        }

    }, [view2015, option15, option19]);

    useEffect(() => {
        if (!view2015 || !view2019) return;
        update_cur_layerview(res_visible);
    }, [res_visible]);


    // useEffect(() => {
    //     if (!view) return;
    //     reactiveUtils.on(
    //         () => view.popup, "trigger-action",
    //         (event) => {
    //             let orifilter = record_layerview.filter;
    //             let orieffect = record_layerview.featureEffect;
    //             if (event.action.id === "show-this-village") {
    //                 console.log();
    //                 show_this_village(orifilter);
    //             }
    //             else if (event.action.id === "show-all-data") {
    //                 show_all_data(orifilter);
    //                 record_layerview.featureEffect = orieffect;
    //             }
    //         }
    //     )
    // }, [view, cur_option, cur_year]);


    function update_2015ES_layer(option) {
        if (record_2015ES_layer && record_2015ES_layer.id == option) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新2015 ES图层。当前2015 ES图层id：" + record_2015ES_layer.id + " 目标id：" + option);
        let new_layer = ES2015.findLayerById(option);
        if (new_layer) {
            new_layer.visible = true;
            record_2015ES_layer.visible = false;
            record_2015ES_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + record_2015ES_layer.id);
        }
        else {
            console.log("--未找到一致图层。");
        }
    }
    function update_2019ES_layer(option) {
        if (record_2019ES_layer && record_2019ES_layer.id == option) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新2019 ES图层。当前2019 ES图层id：" + record_2019ES_layer.id + " 目标id：" + option);
        let new_layer = ES2019.findLayerById(option);
        if (new_layer) {
            new_layer.visible = true;
            record_2019ES_layer.visible = false;
            record_2019ES_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + record_2019ES_layer.id);
        }
        else {
            console.log("--未找到一致图层。");
        }
    }

    function update_cur_layerview(isfilter) {
        view2015.whenLayerView(lu_2015).then((layerview) => {
            record_2015_layerview = layerview;
            console.log("更新2015layerview");

            // if (cur_option.includes("landuse")) {
            //     filter_layerview(cur_option);
            // }
        });

        view2019.whenLayerView(lu_2019).then((layerview) => {
            record_layerview = layerview;
            console.log("更新layerview");
            isfilter ? filter_layerview() : show_all_data();
        });
    }

    function filter_layerview(option = "landuse-1_2_3") {
        const allTypes = ["1", "2", "3", "4", "5", "6"]; // 这里定义所有类型
        const matchedTypes = option.match(/\d/g) || []; // 获取所有数字，默认为空数组
        const uniqueFilteredTypes = [...new Set(matchedTypes)]; // 去重
        const validFilteredTypes = uniqueFilteredTypes.filter(type => allTypes.includes(type));
        console.log("筛选的类型：" + validFilteredTypes.join(', '));

        let resultcontent = "";
        const queries = [];
        for (const layerview of [record_2015_layerview, record_layerview]) {
            if (validFilteredTypes.length > 0) {
                // 使用 IN 子句
                layerview.filter = {
                    where: validFilteredTypes.map(val => `研究地 = '${val}'`).join(' OR')
                };
            }
            else {
                layerview.filter = null; // 默认不筛选
            }

            const effectConfig = {
                filter: layerview.filter ? new FeatureFilter({
                    where: layerview.filter.where,
                }) : null,
                includedEffect: layerview.filter ? " drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" : null, // 放大1.2倍
                // excludedEffect: "blur(2px) brightness(70%)" // 淡化其他不相关部分
            };
            layerview.featureEffect = new FeatureEffect(effectConfig);

            queries.push(layerview.queryFeatures().then(response => {
                let areaByTypes = {};
                let uniqueTypes = new Set(); // 用于存储唯一的类型
                let features = response.features;

                features.forEach(feature => {
                    let type = feature.attributes.研究地; // type: number
                    let area = feature.attributes.面积;
                    // console.log("type: " + type + ", area: " + area);
                    uniqueTypes.add(type);

                    areaByTypes[type] = (areaByTypes[type] || 0) + area;
                });
                console.log(areaByTypes);

                let cur_content = "<ul>" +
                    "<p><b>" + layerview.layer.title + "</b></p>";
                if (uniqueTypes.has(2)) {
                    cur_content +=
                        "<li>桑园面积：" + areaByTypes[2].toFixed(2) + " 平方米</li>";
                }
                if (uniqueTypes.has(3)) {
                    cur_content +=
                        "<li>水田面积：" + areaByTypes[3].toFixed(2) + " 平方米</li>";
                }
                if (uniqueTypes.has(1)) {
                    cur_content +=
                        "<li>鱼塘面积：" + areaByTypes[1].toFixed(2) + " 平方米</li>";
                }
                if (uniqueTypes.has(4)) {
                    cur_content +=
                        "<li>建设用地面积：" + areaByTypes[4].toFixed(2) + " 平方米</li>";
                }
                if (uniqueTypes.has(5)) {
                    cur_content +=
                        "<li>其他农用地面积：" + areaByTypes[5].toFixed(2) + " 平方米</li>";
                }
                if (uniqueTypes.has(6)) {
                    cur_content +=
                        "<li>未利用地面积：" + areaByTypes[6].toFixed(2) + " 平方米</li>";
                }
                cur_content += "</ul>";
                resultcontent += cur_content;
            }));
        }
        Promise.all(queries).then(() => {
            setResult(resultcontent);
        });

    }

    function show_all_data() {
        for (const layerview of [record_2015_layerview, record_layerview]) {
            layerview.filter = null;
            layerview.featureEffect = null;
        }
        setResult("");
    }



    return (
        <>
            {/* 左侧2015年地图 */}
            <div className={styles.mapViewContainer}>
                <div className={styles.mapView} ref={mapview2015Ref} />
                <div className={styles.mapTifView} ref={mapviewES2015Ref} />
            </div>
            {/* 右侧2019年地图 */}
            <div className={styles.mapViewContainer}>
                <div className={styles.mapView} ref={mapview2019Ref} />
                <div className={styles.mapTifView} ref={mapviewES2019Ref} />
            </div>


        </>
    );
}