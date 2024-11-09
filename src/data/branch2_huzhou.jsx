import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";

import GroupLayer from "@arcgis/core/layers/GroupLayer";

export const idx = ['斑块个数/个', '斑块面积/公顷', '平均斑块面积/公顷',
    '斑块面积标准差 / 公顷', '斑块密度 /（个 / 千米2）', '平均斑块形状指数'
];
export const huzhou_lpi = {
    '1910': [3826, 22179.51, 5.797, 5.308, 17.250, 1.181],
    '1980': [1630, 16957.53, 10.403 , 7.859 , 9.612 , 1.560],
    '1995': [1794, 17671.5, 9.850, 7.862, 10.152, 1.567],
    '2000': [1648, 17367.84, 10.539, 8.185, 9.489, 1.565],
    '2005': [1622, 18225, 11.236, 10.707, 8.900, 1.591,],
    '2010': [1735, 20138.49, 11.607, 10.656, 8.615, 1.590,],
    '2015': [1760, 21586.32, 12.265, 14.900, 8.153, 1.571],
    '2020': [1703, 25495.92, 14.971, 30.307, 6.680, 1.600,],
};

export const huzhou_ids = ['-1', '1890', '1910', '1930', '1980', '1995', '2000', '2005', '2010', '2015', '2020'];
export const huzhou_labels = ['新石器时期', '1890', '1910', '1930', '1980', '1995', '2000', '2005', '2010', '2015', '2020'];
export const huzhou_labelidx = [0, 2, 4, 6, 8, 10];

const pos_xsq = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhouXSQ_pos/FeatureServer",
    title: "湖州市新石器时期聚落分布",
    id: '-1',
    outFields: ['*'],
    popupTemplate: {
        title: "湖州市 新石器时期 聚落分布",
        content: [{
            type: "text",
            text: "<b>所在位置：{遗址名}</b>",
        },
        {
            type: "fields",
            fieldInfos: [{
                fieldName: "遗址名",       // fieldname需是featurelayer里已有的字段名，用来寻找单击点的数据
                label: "遗址名称"              // popup表格的表头信息
            }, {
                fieldName: "转换经",
                label: "经度"
            }, {
                fieldName: "转换纬",
                label: "纬度"
            }],
        }],
    }
});

const pos_1890_tif = new ImageryTileLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1890_pos/ImageServer",
    title: "湖州市1890年乡村聚落分布",
    id: '1890',
});

const pos_1910 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1910_pos/FeatureServer",
    title: "湖州市1910年乡村聚落分布",
    id: '1910',
    outFields: ['*'],
});

const pos_1910_tif = new ImageryTileLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1910_pos_tif/ImageServer",
    title: "湖州市1910年乡村聚落分布",
    id: '1910',
});

const pos_1930_tif = new ImageryTileLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1930_pos_tif/ImageServer",
    title: "湖州市1930年乡村聚落分布",
    id: '1930',
})

const pos_1980 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1980_pos/FeatureServer",
    title: "湖州市1980年乡村聚落分布",
    id: '1980',
    outFields: ['*'],
});

const pos_1995 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou1995_pos/FeatureServer",
    title: "湖州市1995年乡村聚落分布",
    id: '1995',
    outFields: ['*'],
});

const pos_2000 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2000_pos/FeatureServer",
    title: "湖州市2000年乡村聚落分布",
    id: '2000',
    outFields: ['*'],
});

const pos_2005 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2005_pos/FeatureServer",
    title: "湖州市2005年乡村聚落分布",
    id: '2005',
    outFields: ['*'],
});

const pos_2010 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2010_pos/FeatureServer",
    title: "湖州市2010年乡村聚落分布",
    id: '2010',
    outFields: ['*'],
});

const pos_2015 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2015_pos/FeatureServer",
    title: "湖州市2015年乡村聚落分布",
    id: '2015',
    outFields: ['*'],
});

const pos_2020 = new FeatureLayer({
    url: "https://services9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou2020_pos/FeatureServer",
    title: "湖州市2020年乡村聚落分布",
    id: '2020',
    outFields: ['*'],
});

export const huzhou_group = new GroupLayer({
    id: "huzhou",
    layers: [pos_xsq, pos_1890_tif, pos_1910_tif, pos_1930_tif, pos_1980, pos_1995, pos_2000,
        pos_2005, pos_2010, pos_2015, pos_2020],
    visible: false,
    visibilityMode: "exclusive",
});

huzhou_group.layers.forEach(layer => {
    layer.visible = false;
});
