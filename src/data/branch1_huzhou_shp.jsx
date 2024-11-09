import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import * as colorSchemes from "@arcgis/core/smartMapping/symbology/color.js";

import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

// 对人口图层，设置 不同指标的 renderer
const renderer_info = {
    '人口密': 'Orange 4',
    '人口增': 'Red 6',
};

export const huzhou_pop_params = {};
for (const key in renderer_info) {
    huzhou_pop_params[key] = {
        field: key,
        classificationMethod: "quantile",
        numClasses: 5,
        colorScheme: colorSchemes.getSchemeByName({
            name: renderer_info[key],
            geometryType: 'polygon',
            theme: 'high-to-low'
        }),
    };
}


// 设置 popupTemplate
const showOnly = {
    title: "仅显示该村数据",
    id: "show-this-village",
    icon: 'filter',
};
const showOnlyCity = {
    title: "仅显示该区县数据",
    id: "show-this-county",

};
const showALL = {
    title: "显示全体数据",
    id: "show-all-data",
    icon: 'view-visible',
};
const lu_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州乡村 土地利用 {SJNF}年",
    actions: [showOnly, showALL],
    content: [{
        type: "text",
        text: "<b>所在位置：湖州市，{QSDWMC}</b>",
    },
    {
        type: "fields",
        fieldInfos: [{
            fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "数据年份"              // popup表格的表头信息
        }, {
            fieldName: "QSDWMC",
            label: "权属单位名称"
        }, {
            fieldName: "DL_DLMC",
            label: "大类名称"
        }, {
            fieldName: "DLMC",
            label: "具体名称"
        },{
            fieldName: "TBMJ",
            label: "面积"
        }],
    }],
};

const income_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州乡村 收入情况 {SJNF}年",
    content: [{
        type: "text",
        text: "<b>所在位置：湖州市，{XZQMC}</b>",
    },
    {
        type: "fields",
        fieldInfos: [{
            fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "数据年份"              // popup表格的表头信息
        }, {
            fieldName: "XZQMC",
            label: "行政村名称"
        }, {
            fieldName: "XZCSR",
            label: "行政村收入"
        }],
    }],
};

const tourist_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州乡村 游客量 {SJNF}年",
    content: [{
        type: "text",
        text: "<b>所在位置：湖州市，{XZQMC}</b>",
    },
    {
        type: "fields",
        fieldInfos: [{
            fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "数据年份"              // popup表格的表头信息
        }, {
            fieldName: "XZQMC",
            label: "行政村名称"
        }, {
            fieldName: "XZCYK_1",
            label: "一季度游客量"
        }, {
            fieldName: "XZCYK_2",
            label: "二季度游客量"
        }, {
            fieldName: "XZCYK_3",
            label: "三季度游客量"
        }, {
            fieldName: "XZCYK_4",
            label: "四季度游客量"
        }, {
            fieldName: "XZCYK_ALL",
            label: "年度总游客量"
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

const lu_2019 = new FeatureLayer({
    title: "湖州乡村 土地利用 2019年",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2019_lu_noborder/FeatureServer",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const lu_group = new GroupLayer({
    id: "landuse",
    layers: [lu_2019],
    visible: false,
    visibilityMode: "exclusive",
});
lu_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = lu_popup_template;
});

const income_2019 = new FeatureLayer({
    title: "湖州乡村 收入情况 2019年",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2019_income/FeatureServer",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const income_group = new GroupLayer({
    id: "income",
    layers: [income_2019],
    visible: false,
    visibilityMode: "exclusive",
});
income_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = income_popup_template;
});


const tourist_2022 = new FeatureLayer({
    title: "湖州乡村 游客量 2022年",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2022_tourist/FeatureServer",
    id: "2022",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const tourist_group = new GroupLayer({
    id: "tourist",
    layers: [tourist_2022],
    visible: false,
    visibilityMode: "exclusive",
});
tourist_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = tourist_popup_template;
});

const pop_2020 = new FeatureLayer({
    title: "湖州乡村 人口信息 2020年",
    url:"https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2020_population/FeatureServer",
    id: "2020",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const pop_group = new GroupLayer({
    id: "population",
    layers: [pop_2020],
    visibilityMode:"exclusive",
    visible: false,
});
pop_group.layers.forEach(element => {
    element.visible = false;
});

// 最顶端：湖州市边界图层

export const huzhou_edges = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_Vedges_alpha0/FeatureServer",
    title: "湖州市各行政村边界",
    id: "huzhou_edges",
    visible: false,
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    legendEnabled: false,
    popupTemplate: village_popup_template,
});

