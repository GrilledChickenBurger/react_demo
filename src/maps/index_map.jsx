import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import PopupTemplate from "@arcgis/core/PopupTemplate";

import styles from "./index_map.module.css";


function IndexMap() {
    // let view;
    const mapviewRef = useRef(null); // 创建一个 ref 来引用 DOM 元素
    useEffect(() => {
        const popup_template = new PopupTemplate({
            title: "当前位置：{name}",
        });

        const edge_layer = new FeatureLayer({
            url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_edges/FeatureServer",
            title: "湖州市县总览",
            outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
            popupTemplate: popup_template,
        });
        const map = new Map({
            basemap: "osm",
            layers: [edge_layer],
        });

        // 确保组件挂载后再创建 MapView
        const view = new MapView({
            map: map, // 你的地图对象
            container: mapviewRef.current, // 获取 HTMLDivElement
            center: [120.3, 30.7], // 经度，纬度
            zoom: 10, // 缩放级别
            constraints: {
                minZoom: 10,
                maxZoom: 18,
                minScale: 10000000,
                maxScale: 0
            },
        });

        // 小组件：搜索框
        const search = new Search({
            view: view
        });
        const searchExpand = new Expand({
            content: search,
            expanded: false,
            view: view,
        });
        view.ui.add(searchExpand, {position: "top-left"});

        // 小组件：介绍展开框
        const introContent = <div className={styles.introContent}>
            <h3>欢迎使用地理设计平台！</h3>
            <p>本平台由浙江大学地理设计团队开发维护。地理设计是一种新兴的规划理念与规划方法，由新一代空间信息技术提供支持，可提供强大的分析和模拟功能。</p>
            <p>本平台希望在景观可持续(Landscape Sustainability Science)理论支撑下，开展地理设计在城乡景观中的实践，并结合GIS、三维建模、3D打印、人工智能等技术，建立一个与学科紧密度高的地理设计平台，从而推动地理设计领域进一步发展。</p>
        </div>;
        const introContainer = document.createElement('div');
        introContainer.className = styles.introContainer;
        ReactDOM.createRoot(introContainer).render(introContent);
        const introExpand = new Expand({
            content: introContainer,
            expanded: true,
            view: view,
        });
        view.ui.add(introExpand, "top-right");

        // 小组件：书签
        const bookmarks = new Bookmarks({
            view: view,
            visibleElements: {
                addBookmarkButton: true,
                editBookmarkButton: true
            },
            draggable: true,
            // whenever a new bookmark is created, a 100x100 px
            // screenshot of the view will be taken and the rotation, scale, and extent
            // of the view will not be set as the viewpoint of the new bookmark
            defaultCreateOptions: {
                takeScreenshot: true,
                captureViewpoint: true,
                captureTimeExtent: false, // the time extent of the view will not be saved in the bookmark
                screenshotSettings: {
                    width: 100,
                    height: 100
                }
            }
        });
        const bookmarksExpand = new Expand({
            content: bookmarks,
            expanded: false,
            view: view,
        });
        view.ui.add(bookmarksExpand, "top-left");
        // collapses the associated Expand instance
        // when the user selects a bookmark
        bookmarks.on("bookmark-select", function(event){
            bookmarksExpand.expanded = false;
        });

        // Default Widget: Legend
        const legendWidget = new Legend({
            view: view,
        });
        const legendExpand = new Expand({
            content: legendWidget,
            expanded: false,
            view: view,
        });
        view.ui.add(legendExpand, "bottom-right");

        // 监听view，单击时终端显示当前位置数值信息
        view.on('click', function (e) {
            const lat = e.mapPoint.latitude;
            const lon = e.mapPoint.longitude;
            console.log(`当前位置：纬度 ${lat} 经度 ${lon}`);
        });

        return () => {
            if (view) {
                view.destroy(); // 清理 MapView 实例
            }

            if (bookmarksExpand) {
                bookmarksExpand.destroy(); // 清理书签展开框
            }
            if (introExpand) {
                introExpand.destroy(); // 清理介绍展开框
            }
            if (searchExpand) {
                searchExpand.destroy(); // 清理介绍展开框
            }
            if (legendExpand) {
                legendExpand.destroy(); // 清理图例展开框
            }
        };
    }, []); // 只有在组件挂载时运行


    return (
        <div className={styles.mapViewContent}>
            <div ref={mapviewRef} className={styles.mapView} />
            
        </div>

    );
}

export default IndexMap;