import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

const farmer_provision = new FeatureLayer({
    title: "基于农民-供给服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_pro/FeatureServer",
    id: "provision",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const farmer_regulating = new FeatureLayer({
    title: "基于农民-调节服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_reg/FeatureServer",
    id: "regulating",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const farmer_culture = new FeatureLayer({
    title: "基于农民-文化服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_farmer_cul/FeatureServer",
    id: "culture",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const farmer_group = new GroupLayer({
    title: "farmer",
    layers: [farmer_provision, farmer_regulating, farmer_culture],
    visible: false,
    visibilityMode: "exclusive",
    listMode:"hide",
});
farmer_group.layers.forEach(element => {
    element.visible = false;
    // element.popupTemplate = lu_popup_template;
});

const enterprise_provision = new FeatureLayer({
    title: "基于企业-供给服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_pro/FeatureServer",
    id: "provision",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const enterprise_regulating = new FeatureLayer({
    title: "基于企业-调节服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_reg/FeatureServer",
    id: "regulating",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const enterprise_culture = new FeatureLayer({
    title: "基于企业-文化服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_enterprise_cul/FeatureServer",
    id: "culture",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const enterprise_group = new GroupLayer({
    title: "enterprise",
    layers: [enterprise_provision, enterprise_regulating, enterprise_culture],
    visible: false,
    visibilityMode: "exclusive",
    listMode:"hide",

});
enterprise_group.layers.forEach(element => {
    element.visible = false;
    // element.popupTemplate = lu_popup_template;
});

const tourist_provision = new FeatureLayer({
    title: "基于游客-供给服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_pro/FeatureServer",
    id: "provision",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const tourist_regulating = new FeatureLayer({
    title: "基于游客-调节服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_reg/FeatureServer",
    id: "regulating",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const tourist_culture = new FeatureLayer({
    title: "基于游客-文化服务的热点分析",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_tourist_cul/FeatureServer",
    id: "culture",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const tourist_group = new GroupLayer({
    title: "tourist",
    layers: [tourist_provision, tourist_regulating, tourist_culture],
    visible: false,
    visibilityMode: "exclusive",
    // listMode:"hide-children",
    listMode:"hide",
});
tourist_group.layers.forEach(element => {
    element.visible = false;
    // element.popupTemplate = lu_popup_template;
});
