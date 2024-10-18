import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";


// STEP 1: Pre Simulate

const redline_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州市南浔区生态红线信息",
    content: [{
        type: "fields",
        fieldInfos: [{
            fieldName: "XQBH",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "保护区编号"              // popup表格的表头信息
        }, {
            fieldName: "XQMC",
            label: "保护区名称"
        }, {
            fieldName: "XQMJ",
            label: "保护区面积"
        }],
    }],
};
const redline = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun_redline/FeatureServer",
    title: "湖州市南浔区生态保护红线",
    id: "redline",
    visible:false,
    outFields: ["*"],
    popupTemplate: redline_popup_template,
});

const YN_popup_template = {
    // autocasts as new PopupTemplate()
    title: "湖州市南浔区永农保护片块信息",
    content: [{
        type: "text",
        text: "编号：{BHPKBH}，保护时间：{BHKSSJ} - {BHJSSJ}"
    },
        {
        type: "fields",
        fieldInfos: [{
            fieldName: "分区",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
            label: "所在区县"              // popup表格的表头信息
        }, {
            fieldName: "BHPKMJ",
            label: "保护片块面积"
        }, {
            fieldName: "JBNTMJ",
            label: "基本农田面积"
        }, {
            fieldName: "GDMJ",
            label: "耕地面积"
        },{
            fieldName: "ZLDJDM",
            label:"质量等级代码"
        },],
    }],
};
const YNPK = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun_YN_BHPK/FeatureServer",
    title: "湖州市南浔区耕地保护工程",
    id: "YNPK",
    outFields: ["*"],
    visible: false,
    popupTemplate: YN_popup_template,
});

export const constrain_group = new GroupLayer({
    title: "constrain",
    layers: [redline, YNPK],
    visible: false,
});

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

// STEP 2: Formal Simulate
// STEP 3: Result

const real_2019 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_ori/FeatureServer",
    title: "南浔区2019年土地利用真实情况",
    id: "2019",
    outFields: ["*"],
    visible: false,
    popupTemplate: lu_popup_template,
});
export const real_2019group = new GroupLayer({
    title: "real_2019",
    layers: [real_2019],
    visible: false,
});

//左侧real view: redline, 19real, 19real
const simulate_group = new GroupLayer({
    title: "模拟数据",
    id: "simulate",
    layers: [constrain_group, real_2019group],
    visibilityMode: "exclusive",
});
