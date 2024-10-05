import React, { useEffect, useRef, useState } from 'react';
import propType from 'prop-types';

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import PopupTemplate from "@arcgis/core/PopupTemplate";

import styles from './BaseMapview.module.css';

export default function BaseMapview(props) {
    const { center, zoom, basemap, layers } = props;
    const mapviewRef = useRef(null);

    let view;
    
    useEffect(() => {
        const map = new Map({
            basemap: basemap,
        });
        if (layers && layers.length > 0) { map.layers = layers; }

        view = new MapView({
            container: mapviewRef.current,
            map: map,
            center: center,
            zoom: zoom,
        });

        // Default Widget: Search
        const searchWidget = new Search({
            view: view,
        });
        const searchExpand = new Expand({
            content: searchWidget,
            expanded: false,
            view: view,
        });
        view.ui.add(searchExpand, { position: "top-left" });
        
        // Default Widget: Bookmarks
        const bookmarksWidget = new Bookmarks({
            view: view,
            visibleElements: {
                addBookmarkButton: true,
                editBookmarkButton: true
            },
            draggable: true,
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
            content: bookmarksWidget,
            expanded: false,
            view: view,
        });
        view.ui.add(bookmarksExpand, "top-left");
        bookmarksWidget.on("bookmark-select", function(event){
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
            // console.log(`当前位置经纬度坐标：${e.mapPoint}`);
        });

        return () => {
            if (view) {
                view.destroy(); // 清理 MapView 实例
            }

            if (bookmarksExpand) {
                bookmarksExpand.destroy(); // 清理书签展开框
            }
            if (searchExpand) {
                searchExpand.destroy(); // 清理介绍展开框
            }
            if (legendExpand) {
                legendExpand.destroy(); // 清理图例展开框
            }
        };
        
    }, [basemap, center, zoom, layers]);


    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapView} ref={mapviewRef}></div>
        </div>
    );
}


BaseMapview.propTypes = {
    center: propType.arrayOf(propType.number),
    zoom: propType.number,
    basemap: propType.string,
};
BaseMapview.defaultProps = {
    center: [120.3, 30.7],
    zoom: 10,
    basemap: "osm",
    layers: null,
};