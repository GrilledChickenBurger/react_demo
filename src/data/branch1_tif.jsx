import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";


const pop_2020 = new ImageryTileLayer({
    title: "湖州市2020年人口分布情况",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2020_population/ImageServer",
    id: "2020",
});
export const pop_group = new GroupLayer({
    title: "population",
    layers: [pop_2020],
    // visibilityMode:"exclusive",
    visible: false,
});
pop_group.layers.forEach(element => {
    element.visible = false;
    // element.renderer = renderer;
});
