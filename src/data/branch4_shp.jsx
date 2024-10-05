import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const lu_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州{SJNF}各行政村信息",
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


export const lu_2015 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2015_lu_1/FeatureServer",
    title: "南浔区2015年土地利用情况",
    id: "2015",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    popupTemplate: lu_popup_template,
    visible: false,
});
export const lu_2019 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_lu_1/FeatureServer",
    title: "南浔区2019年土地利用情况",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    popupTemplate: lu_popup_template,
    visible: false,
});