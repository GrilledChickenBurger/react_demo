import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp.js";

// 设置 TIF 的renderer

// Esri color ramps - Blue and Red 8
const colors5 = [[202, 0, 32, 1], [244, 165, 130, 1], [255, 254, 230, 1], [146, 197, 222, 1], [5, 113, 176, 1]];
const renderer = new RasterStretchRenderer({
    colorRamp : new MultipartColorRamp({
        colorRamps: [
            { algorithm: "cie-lab", fromColor: colors5[4], toColor: colors5[3] },
            { algorithm: "cie-lab", fromColor: colors5[3], toColor: colors5[2] },
            { algorithm: "cie-lab", fromColor: colors5[2], toColor: colors5[1] },
            { algorithm: "cie-lab", fromColor: colors5[1], toColor: colors5[0] },
        ]
      }),
    // stretchType: "percent-clip",
    // minPercent: 0.500,
    // maxPercent: 0.500,
    stretchType: "standard-deviation",
    numberOfStandardDeviations: 2,
    useGamma: true,
    gamma: 1.0,
});

// 具体图层

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
    element.renderer = renderer;
});

const total_2020 = new ImageryTileLayer({
    title: "湖州市可持续评估结果",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_totalres/ImageServer",
    id: "2020",
});
export const total_group = new GroupLayer({
    title: "total",
    layers: [total_2020],
    // visibilityMode:"exclusive",
    visible: false,
});
total_group.layers.forEach(element => {
    element.visible = false;
    element.renderer = renderer;
});