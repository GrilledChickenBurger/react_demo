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
            <h3>欢迎使用湖州市县总览地图！</h3>
            <p>湖州市县总览地图是湖州市县的地理信息系统，主要用于湖州市县的地理信息展示、分析、决策支持。地图上呈现了湖州市县的边界、地貌、经济、文化、交通等多种信息，并提供了便捷的查询、分析、决策支持功能。</p>
            <p>本系统由湖州市县信息中心提供技术支持，由湖州市县信息中心的地理信息系统开发团队开发维护。开发团队成员来自于湖州市县信息中心、湖州市县政府、湖州市县企业、湖州市县学校、湖州市县媒体等多方面，他们共同努力，为湖州市县的发展提供有力的支撑。</p>
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
        <div className={styles.mapContainer}>
            <div ref={mapviewRef} className={styles.mapView} />
            
        </div>

    );
}

export default IndexMap;