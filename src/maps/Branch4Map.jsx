import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';


import GroupLayer from "@arcgis/core/layers/GroupLayer";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import { lu_2015, lu_2019 } from '../data/branch4_shp.jsx';

import styles from './Branch3Map.module.css'

// 全局变量，当前时间滑块表示的年份
let initial_year = "1800";
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: initial_year,
    visible: true,
};
let record_2015_layer = initial_layer;
let record_layer = initial_layer;
let record_result_layer = initial_layer;
let record_2015_layerview;
let record_layerview;


export default function Branch4Map(props) {
    let { mapProps, viewProps, setResult } = props;
    let { cur_option} = viewProps;

    const [view2015, setView2015] = useState(null); // 左侧view: service_group
    const [view, setView] = useState(null); // 右侧view: farmer+enterprise+tourist
    const mapview2015Ref = useRef(null);
    const mapviewRef = useRef(null);
    const title2019Ref = useRef(null);
    const title2015Ref = useRef(null);
    const Root2019Ref = useRef(null);
    const Root2015Ref = useRef(null);

    useEffect(() => {
        setView2015(BaseMapview(mapview2015Ref.current, [lu_2015], mapProps));
        setView(BaseMapview(mapviewRef.current, [lu_2019], mapProps));

        return () => {
            view && view.destroy();
            view2015 && view2015.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch3Map unmount");
        };
    }, []);

    useEffect(() => {
        if (!view || !view2015) return;
        let handle;
        const views = [view, view2015];
        // 两个view视角同步
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
    }, [view]);

    useEffect(() => {
        if (!view) return;
        if (!title2019Ref.current) {
            title2019Ref.current = document.createElement('div');
            title2019Ref.current.className = styles.selectBoxContainer;
            view.ui.add(title2019Ref.current, "top-right");
            Root2019Ref.current = ReactDOM.createRoot(title2019Ref.current);
        }
        if (!title2015Ref.current) {
            title2015Ref.current = document.createElement('div');
            title2015Ref.current.className = styles.selectBoxContainer;
            view2015.ui.add(title2015Ref.current, "top-right");
            Root2015Ref.current = ReactDOM.createRoot(title2015Ref.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (Root2019Ref.current) {
            Root2019Ref.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
        if (Root2015Ref.current) {
            Root2015Ref.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }

    }, [view, cur_option]);

    useEffect(() => {
        if (!view || !cur_option) return;
        console.log(" service_option changed: ", cur_option);

        // 由于更换图层组后，新图层的id可能和旧图层的id相同，导致无法更新图层，因此需要先初始化图层
        record_layer = initial_layer;
        update_cur_2015_layer();
        update_cur_2019_layer();

        update_cur_layerview();

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (Root2019Ref.current) {
            Root2019Ref.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
                <li style={{ fontSize: "medium" }}>{record_layer.title}</li>
            </>);
        }
        if (Root2015Ref.current) {
            Root2015Ref.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
                <li style={{ fontSize: "medium" }}>{record_2015_layer.title}</li>

            </>);
        }

    }, [view, cur_option]);




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


    function update_cur_2015_layer() {
        console.log("准备更新2015图层。当前2015图层id：" + record_2015_layer.id);
        if (record_2015_layer && record_2015_layer.id == '2015') {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        let new_layer = lu_2015;
        new_layer.visible = true;
        record_2015_layer.visible = false;
        record_2015_layer = new_layer;
        console.log("--找到一致图层，当前图层id：" + record_2015_layer.id);

    }
    function update_cur_2019_layer() {
        console.log("准备更新2019图层。当前2019图层id：" + record_layer.id);
        if (record_layer && record_layer.id == '2019') {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        let new_layer = lu_2019;
        new_layer.visible = true;
        record_layer.visible = false;
        record_layer = new_layer;
        console.log("--找到一致图层，当前图层id：" + record_layer.id);
        
    }
        


    function update_cur_layerview() {
        view.whenLayerView(record_layer).then((layerview) => {
            record_layerview = layerview;
            console.log("更新layerview");

            // if (cur_option.includes("landuse")) {
            //     filter_layerview(cur_option);
            // }
        });

        view2015.whenLayerView(record_2015_layer).then((layerview) => {
            record_2015_layerview = layerview;
            console.log("更新2015layerview");

            if (cur_option.includes("landuse")) {
                filter_layerview(cur_option);
            }
        });
    }

    function filter_layerview(option) {
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
                    "<p><b>南浔区" + layerview.layer.title + "</b></p>";
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
                cur_content += "</ul>";
                resultcontent += cur_content;
            }));
        }
        Promise.all(queries).then(() => {
            setResult(resultcontent);
        });

    }



    return (
        <>
            <div className={styles.mapTifView} ref={mapview2015Ref} />
            <div className={styles.mapView} ref={mapviewRef} />

        </>
    );
}