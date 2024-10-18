import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

const colors6 = [[43, 131, 186, 1], [171, 221, 164, 1], [255, 255, 191, 1], [215, 25, 28, 1], [253, 174, 97, 1], [225,225,225,1]];

const renderer = new UniqueValueRenderer({
    field: "名称",
    defaultSymbol: {
        type: "simple-fill",
        color: [255, 0.5],
        outline: {
            color: [0, 0, 0, 0.5],
            width: 1,
        },
    },
    uniqueValueInfos: [
        {
            value: "鱼塘",
            symbol: { type: "simple-fill", color: colors6[0] },
        },
        {
            value: "桑园",
            symbol: { type: "simple-fill", color: colors6[1] },
        },
        {
            value: "水田",
            symbol: { type: "simple-fill", color: colors6[2] },
        },
        {
            value: "建设用地",
            symbol: { type: "simple-fill", color: colors6[3] },
        },
        {
            value: "其他农用地",
            symbol: { type: "simple-fill", color: colors6[4] },
        },
        {
            value: "未利用地",
            symbol: { type: "simple-fill", color: colors6[5] },
        },
    ],
});


// STEP 1: Pre Simulate

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

const real_2015 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2015_ori/FeatureServer",
    title: "南浔区2015年土地利用真实情况",
    id: "2015",
    outFields: ["*"],
    // visible: false,
    popupTemplate: lu_popup_template,
});
export const real_2015group = new GroupLayer({
    title: "real_2015",
    layers: [real_2015],
    visible: false,
});
real_2015group.layers.forEach((element) => {
    element.visible = false;
});

// STEP 2: Formal Simulate

const pred_2019base = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2019_baseline_pred/ImageServer",
    title: "南浔区2019年土地利用情况预测——基线",
    id: "2019_base",
});
export const pred_2019group = new GroupLayer({
    title: "pred_2019",
    layers: [pred_2019base],
    visible: false,
});
pred_2019group.layers.forEach((element) => {
    element.renderer = renderer;
    element.visible = false;
});

// STEP 3: Result

const pred_2035base = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2035_baseline_pred/ImageServer",
    title: "南浔区2035年土地利用情况预测——基线",
    id: "2035_base",
});
const pred_2035farmer = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2035_farmer_pred/ImageServer",
    title: "南浔区2035年土地利用情况预测——农民主导",
    id: "2035_farmer",
});

const pred_2035enterprise = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2035_enterprise_pred/ImageServer",
    title: "南浔区2035年土地利用情况预测——企业主导",
    id: "2035_enterprise",
});
const pred_2035tourist = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2035_tourist_pred/ImageServer",
    title: "南浔区2035年土地利用情况预测——旅游主导",
    id: "2035_tourist",
});

export const pred_2035group = new GroupLayer({
    title: "pred_2035",
    layers: [pred_2035base, pred_2035farmer, pred_2035enterprise, pred_2035tourist],
    visible: false,
    // visibilityMode: "exclusive",

});
pred_2035group.layers.forEach((element) => {
    element.renderer = renderer;
    element.visible = false;
});


// 右侧simulate view:15real, 19sim, 35sim
export const pred_group = new GroupLayer({
    title: "真实数据",
    id: "real",
    layers: [real_2015group, pred_2019group, pred_2035group],
    visibilityMode: "exclusive",
});
// 发现将layers里的pred_2019group误写成pred_2019base，将导致pred_2019group里的pred_2019base被改为空
// 推测原因可能是一个图层只能属于一个图层组，不能同时在多个图层组里