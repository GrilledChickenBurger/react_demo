import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// import "https://js.arcgis.com/4.24/esri/themes/light/main.css";


export default function MyMapViewer({}) {

    const mapRef = useRef();

    useEffect(() => {
        const map = new Map({
            basemap: 'streets-navigation-vector'
        });

        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-79.940, 32.788],
            zoom: 16
        });

        const featureLayer = new FeatureLayer({
            url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/Charleston_Buildings_SLR_2080/FeatureServer/85',
            popupTemplate: {
                title: "{BuildingFID}",
                outFields: ["*"],
                content: "{BuildingFID}"
            },
        });

        map.add(featureLayer);

        return () => {
            if (view) {
                view.destroy()
            }
        };
    }, []);

    const mapStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        margin: 0,
        padding: 0,
    };

    return (
        <div className="map-container" ref={mapRef} style={mapStyle} />
    );
};