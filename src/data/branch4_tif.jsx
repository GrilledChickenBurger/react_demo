import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp.js";

// Esri color ramps - Blue and Red 8
const colors3 = [[239, 138, 98, 1], [247, 247, 247, 1], [103, 169, 207, 1]];
const colors5 = [[202, 0, 32, 1], [244, 165, 130, 1], [247, 247, 247, 1], [146, 197, 222, 1], [5, 113, 176, 1]];
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
// 2015数据待补充，先用2019的
const regulating1_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg1/ImageServer",
    title: "调节服务——涵养水源",
    id: "regulating1",
});
const regulating2_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg2/ImageServer",
    title: "调节服务——水质净化",
    id: "regulating2",
});
const culture1_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul1/ImageServer",
    title: "文化服务——精神",
    id: "culture1",
});
const culture2_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul2/ImageServer",
    title: "文化服务——休闲",
    id: "culture2",
});
const provision1_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro1/ImageServer",
    title: "供给服务——桑园",
    id: "provision1",
});
const provision2_15 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro2/ImageServer",
    title: "供给服务——鱼塘",
    id: "provision2",
});
export const ES2015 = new GroupLayer({
    title: "2015_ES",
    layers: [provision1_15, provision2_15,
        regulating1_15, regulating2_15,
        culture1_15, culture2_15],
    // visible: false,
    visibilityMode: "exclusive",
});

ES2015.layers.forEach(element=>{
    element.visible = false;
    element.renderer = renderer;
})

const regulating1_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg1/ImageServer",
    title: "调节服务——涵养水源",
    id: "regulating1",
});
const regulating2_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg2/ImageServer",
    title: "调节服务——水质净化",
    id: "regulating2",
});
const culture1_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul1/ImageServer",
    title: "文化服务——精神",
    id: "culture1",
});
const culture2_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul2/ImageServer",
    title: "文化服务——休闲",
    id: "culture2",
});
const provision1_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro1/ImageServer",
    title: "供给服务——桑园",
    id: "provision1",
});
const provision2_19 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro2/ImageServer",
    title: "供给服务——鱼塘",
    id: "provision2",
});
export const ES2019 = new GroupLayer({
    title: "2019_ES",
    layers: [provision1_19, provision2_19,
        regulating1_19, regulating2_19,
        culture1_19, culture2_19,],
    // visible: false,
    visibilityMode: "exclusive",
});

ES2019.layers.forEach(element=>{
    element.visible = false;
    element.renderer = renderer;
})