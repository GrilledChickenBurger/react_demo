import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';


import GroupLayer from "@arcgis/core/layers/GroupLayer";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import { farmer_group, enterprise_group, tourist_group } from '../data/branch3_shp.jsx';
import { service_group1, service_group2, result_group } from '../data/branch3_tif.jsx';

import styles from './Branch3Map.module.css'


// 全局变量，当前显示的图层组
let initial_layergroup = new GroupLayer({
    title: "none",
    layers: [],
});
let record_tif1_layergroup = initial_layergroup;
let record_tif2_layergroup = initial_layergroup;
let record_layergroup = initial_layergroup;
let is_layergroup_change = false;
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: "1800",
    visible: true,
};
let record_tif1_layer = initial_layer;
let record_tif2_layer = initial_layer;
let record_layer = initial_layer;
let record_result_layer = initial_layer;



export default function Branch3Map(props) {
    let { mapProps, viewProps } = props;
    let { service_option, base_option, result_opacity, result_visible } = viewProps;

    const [tifview1, setTifView1] = useState(null); // 左上view: service_group1
    const [tifview2, setTifView2] = useState(null); // 左下view: service_group2
    const [view, setView] = useState(null); // 右侧view: farmer+enterprise+tourist
    const mapTifview1Ref = useRef(null);
    const mapTifview2Ref = useRef(null);
    const mapviewRef = useRef(null);

    const baseOptionRef = useRef(null);
    const service1_OptionRef = useRef(null);
    const service2_OptionRef = useRef(null);
    const baseRootRef = useRef(null);
    const service1_RootRef = useRef(null);
    const service2_RootRef = useRef(null);
    
    // INITIALIZE 初始化mapview
    useEffect(() => {
        setTifView1(BaseMapview(mapTifview1Ref.current, [service_group1], mapProps));
        setTifView2(BaseMapview(mapTifview2Ref.current, [service_group2], mapProps));
        setView(BaseMapview(mapviewRef.current, [farmer_group, enterprise_group, tourist_group, result_group],
            { ...mapProps, zoom: 11 }));

        return () => {
            view && view.destroy();
            tifview1 && tifview1.destroy();
            tifview2 && tifview2.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch3Map unmount");
        };
    }, []);

    // INITIALIZE 多视角同步
    useEffect(() => {
        if (!view || !tifview1 || !tifview2) return;
        for (const v of [tifview1, tifview2]) {
            v.ui.remove("default-bookmarks-expand");
            v.ui.remove("default-search-expand");
        }

        const views = [view, tifview1, tifview2];
        let handle;
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

    // INITIALIZE 初始化右上角标题组件 (3个)
    useEffect(() => {
        if (!view) return;

        if (!baseOptionRef.current) {
            baseOptionRef.current = document.createElement('div');
            baseOptionRef.current.className = styles.selectBoxContainer;
            view.ui.add(baseOptionRef.current, "top-right");
            baseRootRef.current = ReactDOM.createRoot(baseOptionRef.current);
        }
        if (!service1_OptionRef.current) {
            service1_OptionRef.current = document.createElement('div');
            service1_OptionRef.current.className = styles.selectBoxContainer;
            tifview1.ui.add(service1_OptionRef.current, "top-right");
            service1_RootRef.current = ReactDOM.createRoot(service1_OptionRef.current);
        }
        if (!service2_OptionRef.current) {
            service2_OptionRef.current = document.createElement('div');
            service2_OptionRef.current.className = styles.selectBoxContainer;
            tifview2.ui.add(service2_OptionRef.current, "top-right");
            service2_RootRef.current = ReactDOM.createRoot(service2_OptionRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (baseRootRef.current) {
            baseRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
        if (service1_RootRef.current) {
            service1_RootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
        if (service2_RootRef.current) {
            service2_RootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
    }, [view, service_option, base_option]);

    // 监听浏览器窗口大小变化，自动调整图例展开状态
    useEffect(() => {
        if (!view || !mapviewRef.current) return;
        const legend = view.ui.find("default-legend-expand");
        const legend1 = tifview1.ui.find("default-legend-expand");
        const legend2 = tifview2.ui.find("default-legend-expand");

        const checkLegendExpanded = (init = false) => {
            let isinit = init === true ? true : false;
            const width = mapviewRef.current.clientWidth;
            // const height = mapviewRef.current.clientHeight;
            // (init && width < 550) ? legend.expanded = false : legend.expanded = true;
            if (width < 550) {
                legend.expanded = false;
                legend1.expanded = false;
                legend2.expanded = false;
            }
            else if (width >= 550 && isinit) {
                legend.expanded = true;
                legend1.expanded = true;
                legend2.expanded = true;
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
    // 在service_option、base_option变化时，更新当前图层组和当前图层
    useEffect(() => {
        if (!view || !service_option || !base_option) return;
        console.log("base option changed: " + base_option + " service_option changed: ", service_option);

        console.log("###################################");
        is_layergroup_change = false;
        update_cur_tif_layergroup();
        update_cur_layergroup(base_option);

        update_cur_tif_layer(service_option);
        update_cur_layer(service_option, is_layergroup_change);
        update_result_layer();
        console.log("###################################");

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (baseRootRef.current) {
            baseRootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_layer.title}</li>
            </>);
        }
        if (service1_RootRef.current) {
            service1_RootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_tif1_layer.title}</li>
            </>);
        }
        if (service2_RootRef.current) {
            service2_RootRef.current.render(<>
                <li style={{ fontSize: "medium" }}>{record_tif2_layer.title}</li>
            </>);
        }

    }, [view, service_option, base_option]);

    // 修改当前结果图层的可见性和透明度
    useEffect(() => {
        if (!view) return;
        record_result_layer.opacity = result_opacity;
        result_group.visible = result_visible;
    }, [view, result_opacity, result_visible]);




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

    function update_cur_layergroup(name) {
        if (record_layergroup.id == name) {
            console.log("图层组一致，无需更新图层组。");
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
            console.log("未找到。is layergroup change: " + is_layergroup_change);
            return;
        }

        record_layergroup.visible = false;
        new_layergroup.visible = true;
        record_layergroup = new_layergroup;
        is_layergroup_change = true;
        console.log("成功更新图层组，当前图层组：" + record_layergroup.id + 
            "is layergroup change: " + is_layergroup_change);
        
        console.log("------------------------------");

    }

    function update_cur_tif_layergroup() {
        if (record_tif1_layergroup.id == "service1" && record_tif2_layergroup.id == "service2") {
            console.log("TIF图层组一致，无需更新图层组。");
            return;
        }
        service_group1.visible = true;
        service_group2.visible = true;
        record_tif1_layergroup.visible = false;
        record_tif2_layergroup.visible = false;
        record_tif1_layergroup = service_group1;
        record_tif2_layergroup = service_group2;
        console.log("成功更新TIF图层组，当前图层组：" + record_tif1_layergroup.id + " " + record_tif2_layergroup.id);
        console.log("------------------------------");

    }

    function update_cur_tif_layer(id) {
        let real_id1 = id + "1", real_id2 = id + "2";
        if (record_tif1_layer.id == real_id1 && record_tif2_layer.id == real_id2) {
            console.log("--TIF图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新TIF图层。当前TIF图层id：" + record_tif1_layer.id + " " + record_tif2_layer.id);

        let new_layer1, new_layer2;
        if (record_tif1_layergroup.findLayerById(real_id1)) {
            new_layer1 = record_tif1_layergroup.findLayerById(real_id1);
            new_layer1.visible = true;
            record_tif1_layer.visible = false;
            record_tif1_layer = new_layer1;
            console.log("--找到一致图层，当前TIF1图层id：" + real_id1);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }
        if (record_tif2_layergroup.findLayerById(real_id2)) {
            new_layer2 = record_tif2_layergroup.findLayerById(real_id2);
            new_layer2.visible = true;
            record_tif2_layer.visible = false;
            record_tif2_layer = new_layer2;
            console.log("--找到一致图层，当前TIF2图层id：" + real_id2);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }
        console.log("------------------------------");
    }

    function update_cur_layer(id, forceupdate = false) {
        if (!forceupdate && record_layer && record_layer.id == id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        console.log("准备更新特征图层。当前特征图层id：" + record_layer.id
            + " 目标特征图层id：" + id );
        
        let new_layer;
        if (record_layergroup.findLayerById(id)) {
            new_layer = record_layergroup.findLayerById(id);
            new_layer.visible = true;
            record_layer.visible = false;
            record_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + id);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }
        console.log("------------------------------");
    }

    function update_result_layer() {
        let result_id = base_option + "_" + service_option;
        if (record_result_layer.id == result_id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }

        console.log("准备更新结果图层。当前结果图层id：" + record_result_layer.id);
        let result_layer;
        if (result_group.findLayerById(result_id)) {
            result_layer = result_group.findLayerById(result_id);
            record_result_layer.visible = false;
            result_layer.visible = true;
            record_result_layer = result_layer;
            console.log("--成功更新图层，当前图层id：" + result_id);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }
        console.log("------------------------------");
    }


    return (
        <>
            <div className={styles.mapTifViewContainer}>
                <div className={styles.mapTifView} ref={mapTifview1Ref} />
                <div className={styles.mapTifView} ref={mapTifview2Ref} />
            </div>
            <div className={styles.mapView} ref={mapviewRef} />

        </>
    );
}