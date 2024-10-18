
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import PopupTemplate from "@arcgis/core/PopupTemplate";



export default function BaseMapview(container, layers, mapProps = { }) {

    // 设置默认值
    const {
        basemap = "osm",
        center = [120.288, 30.744],
        zoom = 10,
        widgets_list = [],
    } = mapProps;
    
    const map = new Map({
        basemap: basemap,
        layers: layers,
    });

    const view = new MapView({
        container: container,
        map: map,
        center: center,
        zoom: zoom,
    });

    
    // Default Widget: Search
    const searchWidget = new Search({
        view: view,
        id:"default-search",
    });
    const searchExpand = new Expand({
        content: searchWidget,
        expanded: false,
        view: view,
        id:"default-search-expand",
    });
    view.ui.add(searchExpand, { position: "top-left" });

    // Default Widget: Bookmarks
    const bookmarksWidget = new Bookmarks({
        view: view,
        id: "default-bookmarks",
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
        id: "default-bookmarks-expand",
    });
    view.ui.add(bookmarksExpand, "top-left");
    bookmarksWidget.on("bookmark-select", function (event) {
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
        id: "default-legend-expand",
    });
    view.ui.add(legendExpand, "bottom-right");

    if (widgets_list.length > 0) {
        widgets_list.map((widget, _) => {
            let widget_pos = widget.position || "bottom-right";
            let widget_item = widget.item;
            widget_item.view = view;
            view.ui.add(widget_item, widget_pos);
         })
    }

    // 监听view，单击时终端显示当前位置数值信息
    view.on('click', function (e) {
        const lat = e.mapPoint.latitude;
        const lon = e.mapPoint.longitude;
        console.log(`当前位置：纬度 ${lat} 经度 ${lon}`);
        // console.log(`当前位置经纬度坐标：${e.mapPoint}`);
    });


    return view;
}


// BaseMapview.propTypes = {
//     container:React.MutableRefObject,
//     center: propType.arrayOf(propType.number),
//     zoom: propType.number,
//     basemap: propType.string,
// };
// BaseMapview.defaultProps = {
//     center: [120.3, 30.7],
//     zoom: 10,
//     basemap: "osm",
//     layers: null,
// };