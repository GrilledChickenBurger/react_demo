import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

// 设置 popupTemplate
const showOnly = {
    title: "仅显示该村数据",
    id: "show-this-village",
    icon: 'filter',
};
const showALL = {
    title: "显示全体数据",
    id: "show-all-data",
    icon: 'view-visible',
};
const lu_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州市南浔区{SJNF}土地利用信息",
    content: [{
        type: "fields",
        fieldInfos: [{
            fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "数据年份"              // popup表格的表头信息
        }, {
            fieldName: "研究名",
            label: "大类名称"
        }, {
            fieldName: "面积",
            label: "面积"
        }],
    }],
};

const village_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州市各行政村位置",
    content: [{
        type: "text",
        text: "<b>所在位置：湖州市，{XZQMC}</b>" +
            "<li>行政村代码：{XZQDM}</li>",
    },],
};


// 具体图层

const lu_1975 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun1975_lu/FeatureServer",
    title: "南浔区1975年土地利用情况",
    id: "1975",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const lu_2000 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2000_lu/FeatureServer",
    title: "南浔区2000年土地利用情况",
    id: "2000",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const lu_2005 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2005_lu/FeatureServer",
    title: "南浔区2005年土地利用情况",
    id: "2005",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const lu_2015 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2015_lu/FeatureServer",
    title: "南浔区2015年土地利用情况",
    id: "2015",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const lu_2019 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_lu/FeatureServer",
    title: "南浔区2019年土地利用情况",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});

export const lu_group = new GroupLayer({
    title: "landuse",
    layers: [lu_1975, lu_2000, lu_2005, lu_2015, lu_2019],
    visible: false,
    visibilityMode: "exclusive",
});
lu_group.layers.forEach(element => {
    element.visible = false;
    element.opacity = 0.7;
    element.popupTemplate = lu_popup_template;
});


// 最顶端：南浔区行政村边界图层

export const edges = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun_Vedges_alpha0/FeatureServer",
    title: "南浔区边界",
    id: "edges",
    visible: false,
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    legendEnabled: false,
    popupEnabled: village_popup_template,
});