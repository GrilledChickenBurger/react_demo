import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

import * as colorSchemes from "@arcgis/core/smartMapping/symbology/color.js";

// 设置 不同指标的 renderer

const renderer_info = {
    'GPI': 'Orange 4',
    'GDP': 'Red 6',
    'EF': 'Blue 3',
    'ECC': 'Green 1',
};

export const CSJ_params = {};
for (const key in renderer_info) {
    CSJ_params[key] = {
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

const csj_popup_template = {
    title: "长三角{SJNF}各可持续评估指标信息",
    content: [{
        type: "text",
        text: "<b>所在位置：{省}，{市}</b>",
    },
    {
        type: "fields",
        fieldInfos: [{
            fieldName: "SJNF",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "数据年份"              // popup表格的表头信息
        }, {
            fieldName: "GPI",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "GPI（真实发展指数）"              // popup表格的表头信息
        }, {
            fieldName: "GDP",
            label: "GDP（人均生产总值）"
        }, {
            fieldName: "EF",
            label: "EF（生态足迹）"
        }, {
            fieldName: "ECC",
            label: "Biocapacity（生物承载力）"
        },],
    }],
};


// 具体图层

const CSJ_2000 = new FeatureLayer({
    title: "长三角2000年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2000/FeatureServer",
    id: "2000",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2001 = new FeatureLayer({
    title: "长三角2001年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2001/FeatureServer",
    id: "2001",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2002 = new FeatureLayer({
    title: "长三角2002年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2002_1/FeatureServer",
    id: "2002", 
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2003 = new FeatureLayer({
    title: "长三角2003年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2003/FeatureServer",
    id: "2003",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2004 = new FeatureLayer({
    title: "长三角2004年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2004/FeatureServer",
    id: "2004",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2005 = new FeatureLayer({
    title: "长三角2005年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2005/FeatureServer",
    id: "2005",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2006 = new FeatureLayer({
    title: "长三角2006年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2006/FeatureServer",
    id: "2006",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2007 = new FeatureLayer({
    title: "长三角2007年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2007/FeatureServer",
    id: "2007",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2008 = new FeatureLayer({
    title: "长三角2008年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2008_2/FeatureServer",
    id: "2008",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2009 = new FeatureLayer({
    title: "长三角2009年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2009/FeatureServer",
    id: "2009",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2010 = new FeatureLayer({
    title: "长三角2010年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2010/FeatureServer",
    id: "2010",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2011 = new FeatureLayer({
    title: "长三角2011年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2011_1/FeatureServer",
    id: "2011",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2012 = new FeatureLayer({
    title: "长三角2012年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2012/FeatureServer",
    id: "2012",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2013 = new FeatureLayer({
    title: "长三角2013年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2013/FeatureServer",
    id: "2013",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2014 = new FeatureLayer({
    title: "长三角2014年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2014/FeatureServer",
    id: "2014",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2015 = new FeatureLayer({
    title: "长三角2015年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2015_1/FeatureServer",
    id: "2015",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2016 = new FeatureLayer({
    title: "长三角2016年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2016/FeatureServer",
    id: "2016",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2017 = new FeatureLayer({
    title: "长三角2017年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2017_1/FeatureServer",
    id: "2017",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});
const CSJ_2018 = new FeatureLayer({
    title: "长三角2018年可持续评估结果",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ2018/FeatureServer",
    id: "2018",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
});

export const CSJ_group = new GroupLayer({
    title: "csj27",
    layers: [CSJ_2000, CSJ_2001, CSJ_2002, CSJ_2003, CSJ_2004, CSJ_2005, CSJ_2006, CSJ_2007, CSJ_2008, CSJ_2009, CSJ_2010, CSJ_2011, CSJ_2012, CSJ_2013, CSJ_2014, CSJ_2015, CSJ_2016, CSJ_2017, CSJ_2018],
    visible: false,
    visibilityMode: "exclusive",
});
CSJ_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = csj_popup_template;
});


// 占位图层，起到一个初始造型的作用。

const csj_0 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/CSJ27_merge/FeatureServer",
    title: "长三角27个城市的(可持续评估结果)",
    id: '2020',
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    // 发现图例过多会只显示一种颜色。
});
export const csj0_group = new GroupLayer({
    title: "csj0",
    layers: [csj_0],
    visible: false,
});
csj0_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = csj_popup_template;
});

// 最顶端：长三角27个城市的边界图层

export const csj_edges = new FeatureLayer({
    title: "长三角各省市边界",
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/csj_edges_alpha0/FeatureServer",
    id: "csj_edges",
    visible: false,
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    legendEnabled: false,
});
