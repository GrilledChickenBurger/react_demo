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

const regulating1 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg1/ImageServer",
    title: "调节服务——涵养水源",
    id: "regulating1",
});
const regulating2 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_reg2/ImageServer",
    title: "调节服务——水质净化",
    id: "regulating2",
});
const culture1 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul1/ImageServer",
    title: "文化服务——精神",
    id: "culture1",
});
const culture2 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_cul2/ImageServer",
    title: "文化服务——休闲",
    id: "culture2",
});
const provision1 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro1/ImageServer",
    title: "供给服务——桑园",
    id: "provision1",
});
const provision2 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_service_pro2/ImageServer",
    title: "供给服务——鱼塘",
    id: "provision2",
});

export const service_group = new GroupLayer({
    title: "service",
    layers: [provision1, provision2, regulating1, regulating2, culture1, culture2],
    visible: false,
    visibilityMode: "exclusive",
});
service_group.layers.forEach(element=>{
    element.visible = false;
    element.renderer = renderer;
})


const farmer_regulating_res = new ImageryTileLayer({
    title: "结果：农民对调节服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_reg_res/ImageServer",
    id: "farmer_regulating",
});
const farmer_culture_res = new ImageryTileLayer({
    title: "结果：农民对文化服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_cul_res/ImageServer",
    id: "farmer_culture",
});
const farmer_provision_res = new ImageryTileLayer({
    title: "结果：农民对供给服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_pro_res/ImageServer",
    id: "farmer_provision",
});
const enterprise_regulating_res = new ImageryTileLayer({
    title: "结果：企业对调节服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_reg_res/ImageServer",
    id: "enterprise_regulating",
});
const enterprise_culture_res = new ImageryTileLayer({
    title: "结果：企业对文化服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_cul_res/ImageServer",
    id: "enterprise_culture",
});
const enterprise_provision_res = new ImageryTileLayer({
    title: "结果：企业对供给服务的态度",
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_pro_res/ImageServer",
    id: "enterprise_provision",
});

const tourist_regulating_res = new ImageryTileLayer({
    title:"结果：游客对调节服务的态度",
    url:"https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_reg_res/ImageServer",
    id:"tourist_regulating",
});
const tourist_culture_res = new ImageryTileLayer({
    title:"结果：游客对文化服务的态度",
    url:"https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_cul_res/ImageServer",
    id:"tourist_culture",
});
const tourist_provision_res = new ImageryTileLayer({
    title:"结果：游客对供给服务的态度",
    url:"https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_pro_res/ImageServer",
    id:"tourist_provision",
});

export const result_group = new GroupLayer({
    title:"result",
    layers:[farmer_regulating_res, farmer_culture_res, farmer_provision_res,
        enterprise_regulating_res, enterprise_culture_res, enterprise_provision_res,
        tourist_regulating_res,tourist_culture_res, tourist_provision_res
    ],
    visible:false,
    visibilityMode: "exclusive",
    listMode:"hide-children",
});
result_group.layers.forEach(element=>{
    element.visible = false;
    element.renderer = renderer;
});
