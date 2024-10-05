import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';


import GroupLayer from "@arcgis/core/layers/GroupLayer";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import BaseMapview from './BaseMapview.jsx';
import { farmer_group, enterprise_group, tourist_group } from '../data/branch3_shp.jsx';
import { service_group, result_group } from '../data/branch3_tif.jsx';

import styles from './Branch3Map.module.css'


// 全局变量，当前显示的图层组
let record_tif_layergroup = new GroupLayer({
    title: "none",
    layers: [],
});
let record_layergroup = new GroupLayer({
    title: "none",
    layers: [],
});
// 全局变量，当前时间滑块表示的年份
let initial_year = "1800";
// 全局变量，当前图层组显示的具体图层
let initial_layer = {
    id: initial_year,
    visible: true,
};
let record_tif_layer = initial_layer;
let record_layer = initial_layer;
let record_result_layer = initial_layer;
let record_layerview;


export default function Branch3Map(props) {
    let { mapProps, viewProps } = props;
    let { service_option, base_option, result_opacity, result_visible } = viewProps;

    const [tifview, setTifView] = useState(null); // 左侧view: service_group
    const [view, setView] = useState(null); // 右侧view: farmer+enterprise+tourist
    const mapTifviewRef = useRef(null);
    const mapviewRef = useRef(null);
    const baseOptionRef = useRef(null);
    const serviceOptionRef = useRef(null);
    const baseRootRef = useRef(null);
    const serviceRootRef = useRef(null);

    useEffect(() => {
        setTifView(BaseMapview(mapTifviewRef.current, [service_group], mapProps));
        setView(BaseMapview(mapviewRef.current, [farmer_group, enterprise_group, tourist_group, result_group], mapProps));

        return () => {
            view && view.destroy();
            tifview && tifview.destroy();
            // reactRootRef.current && reactRootRef.current.unmount(); // 销毁 React 根
            console.log("Branch3Map unmount");
        };
    }, []);

    useEffect(() => {
        if (!view || !tifview) return;
        const views = [view, tifview];
        let handle;
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
        if (!baseOptionRef.current) {
            baseOptionRef.current = document.createElement('div');
            baseOptionRef.current.className = styles.selectBoxContainer;
            view.ui.add(baseOptionRef.current, "top-right");
            baseRootRef.current = ReactDOM.createRoot(baseOptionRef.current);
        }
        if (!serviceOptionRef.current) {
            serviceOptionRef.current = document.createElement('div');
            serviceOptionRef.current.className = styles.selectBoxContainer;
            tifview.ui.add(serviceOptionRef.current, "top-right");
            serviceRootRef.current = ReactDOM.createRoot(serviceOptionRef.current);
        }

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (baseRootRef.current) {
            baseRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }
        if(serviceRootRef.current){
            serviceRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
            </>);
        }

    }, [view, service_option, base_option]);

    useEffect(() => {
        if (!view || !service_option || !base_option) return;
        console.log("base option changed: "+ base_option + " service_option changed: ", service_option);

        update_cur_tif_layergroup(service_option);
        update_cur_layergroup(base_option);

        // 由于更换图层组后，新图层的id可能和旧图层的id相同，导致无法更新图层，因此需要先初始化图层
        record_layer = initial_layer;
        update_cur_tif_layer(service_option);
        update_cur_layer(service_option);
        update_result_layer();

        // 检查 reactRootRef.current 是否有效，再进行渲染
        if (baseRootRef.current) {
            baseRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
                <li style={{ fontSize: "medium" }}>{record_layer.title}</li>
            </>);
        }
        if(serviceRootRef.current){
            serviceRootRef.current.render(<>
                <p style={{ fontWeight: "bold", marginTop: 0, marginBottom: 0 }}>当前内容：</p>
                <li style={{ fontSize: "medium" }}>{record_tif_layer.title}</li>

            </>);
        }

    }, [view, service_option, base_option]);

    useEffect(() => {
        if (!view) return;
        record_result_layer.opacity = result_opacity;
    }, [view, result_opacity]);

    useEffect(() => {
        if (!view) return;
        result_group.visible = result_visible;
    }, [view, result_visible]);



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
        console.log("准备更新图层组，当前图层组：" + record_layergroup.title);
        if (record_layergroup.title == name) {
            console.log("图层组一致，无需更新图层组。");
            return;
        }

        let new_layergroup; let isfind = false;
        for (const element of view.map.layers) {
            if (element.title == name) {
                new_layergroup = element;
                isfind = true;
                break;
            }
        }
        if (!isfind) {
            console.log("未找到。");
            return;
        }

        record_layergroup.visible = false;
        new_layergroup.visible = true;
        record_layergroup = new_layergroup;
        console.log("成功更新图层组，当前图层组：" + record_layergroup.title);

    }

    function update_cur_tif_layergroup(name) {
        console.log("准备更新TIF图层组，当前图层组：" + record_tif_layergroup.title);
        if (record_tif_layergroup.title == 'service') {
            console.log("图层组一致，无需更新图层组。");
            return;
        }

        service_group.visible = true;
        record_tif_layergroup = service_group;
        console.log("成功更新TIF图层组，当前图层组：" + record_tif_layergroup.title);

    }
    function update_cur_tif_layer(id) {
        console.log("准备更新TIF图层。当前TIF图层id：" + record_tif_layer.id);
        if (record_tif_layer && record_tif_layer.id == id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        let new_layer;
        if (record_tif_layergroup.findLayerById(id)) {
            new_layer = record_tif_layergroup.findLayerById(id);
            new_layer.visible = true;
            record_tif_layer.visible = false;
            record_tif_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + id);
            return;
        }

        else {
            console.log("--不存在可更换图层，保持原状。");
        }
    }
    function update_cur_layer(id) {
        let new_id = id.slice(0,-1);
        console.log("准备更新特征图层。当前特征图层id：" + record_layer.id);
        if (record_layer && record_layer.id == new_id) {
            console.log("--图层一致，无需更新图层。");
            return;
        }
        let new_layer;
        if (record_layergroup.findLayerById(new_id)) {
            new_layer = record_layergroup.findLayerById(new_id);
            new_layer.visible = true;
            record_layer.visible = false;
            record_layer = new_layer;
            console.log("--找到一致图层，当前图层id：" + new_id);
            return;
        }

        else {
            console.log("--不存在可更换图层，保持原状。");
        }
    }

    function update_result_layer() {
        let service = service_option.slice(0,-1);
        let result_id = base_option + "_" + service;
        console.log("准备更新结果图层。当前结果图层id：" + record_result_layer.id);
        
        if(record_result_layer.id==result_id){
            console.log("--图层一致，无需更新图层。");
            return;
        }
        
        let result_layer;
        if(result_group.findLayerById(result_id)){
            result_layer = result_group.findLayerById(result_id);
            record_result_layer.visible=false;
            result_layer.visible=true;
            record_result_layer=result_layer;
            console.log("--成功更新图层，当前图层id：" + result_id);
        }
        else {
            console.log("--不存在可更换图层，保持原状。");
        }

    }


    return (
        <>
            <div className={styles.mapTifView} ref={mapTifviewRef} />
            <div className={styles.mapView} ref={mapviewRef} />

        </>
    );
}