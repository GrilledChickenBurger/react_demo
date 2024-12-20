import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';


import GroupLayer from "@arcgis/core/layers/GroupLayer";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import { real_2019group, constrain_group } from '../data/branch5_real.jsx';
import { pred_2035group, pred_2019group, real_2015group } from '../data/bransh5_simulate.jsx';

import styles from './Branch5Map.module.css'

let initial_layergroup = new GroupLayer({
    title: "none",
    layers: [],
});
let record_real_layergroup = initial_layergroup;
let record_sim_layergroup = initial_layergroup;
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: '1800',
    visible: true,
};
let other_layer = initial_layer;
let record_real_layer = initial_layer;
let record_sim_layer = initial_layer;


const real_layersINFO4step = {
    1: { layergroupTitle: "constrain", layersID: ["redline", "YNPK",] },
    2: { layergroupTitle: "real_2019", layersID: ["2019"] },
    3: { layergroupTitle: "real_2019", layersID: ["2019"] },
};
const sim_layersINFO4step = {
    1: { layergroupTitle: "real_2015", layersID: ["2015"] },
    2: { layergroupTitle: "pred_2019", layersID: ["2019_base"] },
    3: { layergroupTitle: "pred_2035", layersID: ["2035_base"] },
};
let real_layergroupTitle;
let sim_layergroupTitle;
let real_layersID;
let sim_layersID;

export default function Branch5Map(props) {
    let { mapProps, viewProps } = props;
    const { step = 1, cur_option = "base" } = viewProps;

    const [real_view, setRealView] = useState(null); // 左侧real view: redline, 19real, 19real
    const [sim_view, setSimView] = useState(null); // 右侧simulate view:15real, 19sim, 35sim
    // 右侧view: farmer+enterprise+tourist
    const mapviewRealRef = useRef(null);
    const mapviewSimRef = useRef(null);
    const realTitleRef = useRef(null);
    const simTitleRef = useRef(null);
    const realRootRef = useRef(null);
    const simRootRef = useRef(null);

    // INITIALIZE 初始化mapview
    useEffect(() => {
        setRealView(BaseMapview(mapviewRealRef.current, [constrain_group, real_2019group], mapProps));
        setSimView(BaseMapview(mapviewSimRef.current, [real_2015group, pred_2019group, pred_2035group], mapProps));

        return () => {
            real_view && real_view.destroy();
            sim_view && sim_view.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch5Map unmount");
        };
    }, []);

    // INITIALIZE 多视角同步
    useEffect(() => {
        if (!real_view || !sim_view) return;
        let handle;
        const views = [real_view, sim_view];
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
    }, [real_view, sim_view]);

    // INITIALIZE 初始化右上角标题组件 (2个)
    useEffect(() => {
        if (!real_view || !sim_view) return;
        if (!realTitleRef.current) {
            realTitleRef.current = document.createElement('div');
            realTitleRef.current.className = styles.selectBoxContainer;
            real_view.ui.add(realTitleRef.current, "top-right");
            realRootRef.current = ReactDOM.createRoot(realTitleRef.current);
        }
        if (!simTitleRef.current) {
            simTitleRef.current = document.createElement('div');
            simTitleRef.current.className = styles.selectBoxContainer;
            sim_view.ui.add(simTitleRef.current, "top-right");
            simRootRef.current = ReactDOM.createRoot(simTitleRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (realRootRef.current) {
            realRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
        if (simRootRef.current) {
            simRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }

    }, [real_view, sim_view]);

    // 监听浏览器窗口大小变化，自动调整图例展开状态
    useEffect(() => {
        if (!real_view || !sim_view || !mapviewRealRef.current) return;
        const legend1 = real_view.ui.find("default-legend-expand");
        const legend2 = sim_view.ui.find("default-legend-expand");
        const legend = [legend1, legend2,];

        const checkLegendExpanded = (init = false) => {
            let isinit = init === true ? true : false;
            const width = mapviewRealRef.current.clientWidth;
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
    }, [real_view, sim_view]);

    // CORE FUNCTIONS
    // 根据当前step，更新当前的 real 和 simulate 图层组
    // 根据当前option，当step=3时，更新当前的 result 图层
    useEffect(() => {
        if (!real_view || !sim_view || !cur_option || !step) return;
        console.log(" service_option changed: " + cur_option + " step: " + step);

        real_layergroupTitle = real_layersINFO4step[step].layergroupTitle;
        sim_layergroupTitle = sim_layersINFO4step[step].layergroupTitle;
        real_layersID = real_layersINFO4step[step].layersID;
        sim_layersID = sim_layersINFO4step[step].layersID;

        console.log("###################################");
        update_cur_layergroup();
        update_real_layer();
        update_sim_layer();
        if (step == 3) {
            update_res_layer(cur_option);
        }
        console.log("###################################");

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (realRootRef.current) {
            realRootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{
                    record_real_layer.id==='redline' ? "南浔区的生态红线及永久基本农田" :
                    record_real_layer.title}</li>
                {/* <li style={{ fontSize: "medium" }}>{YNPK.title}</li> */}
            </>);
        }
        if (simRootRef.current) {
            simRootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_sim_layer.title}</li>

            </>);
        }

    }, [real_view, sim_view, cur_option, step]);



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

    function update_cur_layergroup() {
        if (record_real_layergroup.title == real_layergroupTitle && record_sim_layergroup.title == sim_layergroupTitle) {
            console.log("--图层组一致，无需更新图层组。");
            return;
        }
        console.log("准备更新左侧real图层组，当前图层组：" + record_real_layergroup.title +
            "，目标：" + real_layergroupTitle);
        console.log("准备更新右侧simulate图层组，当前图层组：" + record_sim_layergroup.title +
            "，目标：" + sim_layergroupTitle);

        let real_layergroup; let sim_layergroup;
        for (const element of real_view.map.layers) {
            if (element.title == real_layergroupTitle) {
                real_layergroup = element;
                break;
            }
        }
        for (const element of sim_view.map.layers) {
            if (element.title == sim_layergroupTitle) {
                sim_layergroup = element;
                break;
            }
        }
        if (!real_layergroup || !sim_layergroup) {
            console.log("--图层组不存在，无法更新。");
            return;
        };
        real_layergroup.visible = true;
        record_real_layergroup = real_layergroup;
        sim_layergroup.visible = true;
        record_sim_layergroup = sim_layergroup;

        console.log("更新图层组成功，当前图层组：" + record_real_layergroup.title + " " + record_sim_layergroup.title);
        console.log("------------------------------");
    }

    function update_real_layer() {
        if (record_real_layer && record_real_layer.id == real_layersID[0]) {
            console.log("--左侧real图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新左侧real图层。当前左侧real图层id：" + record_real_layer.id +
            "，目标：" + real_layersID[0]);


        let new_layer_list = [];
        for (const ID of real_layersID) {
            let new_layer = record_real_layergroup.findLayerById(ID);
            if (new_layer) {
                new_layer.visible = true;
                new_layer_list.push(new_layer);
                console.log("--找到一致图层：" + ID);
            }
            else {
                console.log("--不存在图层：" + ID + "，保持原状。");
            }
        }
        if (new_layer_list.length > 0) {
            record_real_layer.visible = false;
            record_real_layer = new_layer_list[0];
            console.log("更新左侧real图层成功。当前左侧real图层id：" + record_real_layer.id);
            if (new_layer_list.length > 1) {
                other_layer = new_layer_list[1];
            }
            else {
                other_layer.visible = false;
                other_layer = initial_layer;
            }
            console.log("其他图层：" + other_layer.id);
        }
        else {
            console.log("未找到任何一致图层，更新左侧real图层失败。");
        }
        console.log("----------------------------");
    }

    function update_sim_layer() {
        if (record_sim_layer && record_sim_layer.id == sim_layersID[0]) {
            console.log("--右侧simulate图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新右侧simulate图层。当前右侧simulate图层id：" + record_sim_layer.id +
            "，目标：" + sim_layersID[0]);


        let new_layer;
        for (const ID of sim_layersID) {
            new_layer = record_sim_layergroup.findLayerById(ID);
            if (new_layer) {
                new_layer.visible = true;
                console.log("--找到一致图层，当前图层id：" + record_sim_layer.id);
            }
            else {
                console.log("--不存在图层：" + ID + "，保持原状。");
            }
        }
        if (new_layer) {
            record_sim_layer.visible = false;
            record_sim_layer = new_layer;
            console.log("更新右侧simulate图层成功。当前右侧simulate图层id：" + record_sim_layer.id);
        }
        else {
            console.log("未找到任何一致图层，更新右侧simulate图层失败。");
        }
        console.log("----------------------------");
    }

    function update_res_layer(option) {
        console.log("准备更新2035图层。当前2035图层id：" + record_sim_layer.id);
        let option2 = "2035_" + option;
        if (record_sim_layer.id == option2) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        let pred_layer;
        if (record_sim_layergroup.findLayerById(option2)) {
            pred_layer = record_sim_layergroup.findLayerById(option2);
            pred_layer.visible = true;
            record_sim_layer.visible = false;
            record_sim_layer = pred_layer;
            console.log("--找到一致图层，当前图层id：" + record_sim_layer.id);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }
        console.log("----------------------");

    }

    return (
        <>
            {/* 左侧：限制、2019真、2019真 */}
            <div className={styles.mapRealView} ref={mapviewRealRef} />
            {/* 右侧：2015真、2019模拟、2035模拟 */}
            <div className={styles.mapSimulateView} ref={mapviewSimRef} />
        </>
    );
}