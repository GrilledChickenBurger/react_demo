import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

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
    title: "湖州{SJNF}各行政村信息",
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
    title: "湖州{SJNF}各行政村年度人均收入信息",
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
    title: "湖州{SJNF}各行政村年度游客量信息",
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

const csj_popup_template = {
    // autocasts as new PopupTemplate()
    title: "长三角27个城市信息",
    content: [{
        type: "text",
        text: "<b>所在位置：{省}，{市}</b>" +
            "<li>市代码：{市代码}</li>" +" <li>市类型：{市类型}</li>",
    },
    {
        type: "fields",
        fieldInfos: [{
            fieldName: "省",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "省"              // popup表格的表头信息
        }, {
            fieldName: "市",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "市"              // popup表格的表头信息
        }, {
            fieldName: "市代码",
            label: "市代码"
        }, {
            fieldName: "市类型",
            label: "市类型"
        }, ],
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
    title: "湖州市2019年土地利用情况",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2019_lu_noborder/FeatureServer",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const lu_group = new GroupLayer({
    title: "landuse",
    layers: [lu_2019],
    visible: false,
    visibilityMode: "exclusive",
});
lu_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = lu_popup_template;
});

const income_2019 = new FeatureLayer({
    title: "湖州市2019年人均收入",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2019_income/FeatureServer",
    id: "2019",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const income_group = new GroupLayer({
    title: "income",
    layers: [income_2019],
    visible: false,
    visibilityMode: "exclusive",
});
income_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = income_popup_template;
});


const tourist_2022 = new FeatureLayer({
    title: "湖州市2022年旅游景点",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2022_tourist/FeatureServer",
    id: "2022",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
export const tourist_group = new GroupLayer({
    title: "tourist",
    layers: [tourist_2022],
    visible: false,
    visibilityMode: "exclusive",
});
tourist_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = tourist_popup_template;
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

