import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

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

// const pop_2020 = new ImageryTileLayer({
//     title: "湖州乡村 人口数量 2020年",
//     url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2020_population/ImageServer",
//     id: "2020",
// });
// export const pop_group = new GroupLayer({
//     id: "population",
//     layers: [pop_2020],
//     // visibilityMode:"exclusive",
//     visible: false,
// });
// pop_group.layers.forEach(element => {
//     element.visible = false;
//     element.renderer = renderer;
// });

const total_2020 = new ImageryTileLayer({
    title: "湖州乡村 总体评估结果 2020年",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_totalres/ImageServer",
    id: "2020",
});
export const total_group = new GroupLayer({
    id: "total",
    layers: [total_2020],
    // visibilityMode:"exclusive",
    visible: false,
});

const total1_2020 = new ImageryTileLayer({
    title: "湖州乡村 环境维度评估结果 2020年",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_totalres_ecologic/ImageServer",
    id: "2020",
});
export const total1_group = new GroupLayer({
    id: "total1",
    layers: [total1_2020],
    // visibilityMode:"exclusive",
    visible: false,
});

const total2_2020 = new ImageryTileLayer({
    title: "湖州乡村 经济维度评估结果 2020年",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_totalres_economic/ImageServer",
    id: "2020",
});
export const total2_group = new GroupLayer({
    id: "total2",
    layers: [total2_2020],
    // visibilityMode:"exclusive",
    visible: false,
});

const total3_2020 = new ImageryTileLayer({
    title: "湖州乡村 社会维度评估结果 2020年",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_totalres_social/ImageServer",
    id: "2020",
});
export const total3_group = new GroupLayer({
    id: "total3",
    layers: [total3_2020],
    // visibilityMode:"exclusive",
    visible: false,
});


total_group.layers.forEach(element => {
    element.visible = false;
    element.renderer = renderer;
});
total1_group.layers.forEach(element => {
    element.visible = false;
    element.renderer = renderer;
});
total2_group.layers.forEach(element => {
    element.visible = false;
    element.renderer = renderer;
});
total3_group.layers.forEach(element => {
    element.visible = false;
    element.renderer = renderer;
});