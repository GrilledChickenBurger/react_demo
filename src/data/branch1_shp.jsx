import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";


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
        text: "",
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


export const edges = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_edges_alpha0/FeatureServer",
    title: "南浔区边界",
    id: "edges",
    outFields: ["*"],    // 若后续需要featurefilter，则需要设置此项
    legendEnabled : false,
});

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
});
lu_group.layers.forEach(element => {
    element.visible = false;
    element.popupTemplate = lu_popup_template;
});

// export default lu_group;