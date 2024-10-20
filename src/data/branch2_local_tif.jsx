import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

const local_chun = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/chunqiu/ImageServer",
    title: "春秋战国时期塘浦圩田",
    id:'0'
});

const local_ming = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_ming/ImageServer",
    title:'明万历-《湖州府志》-湖州府平面图',
    id: '30'
});

const local_qing = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_qing/ImageServer",
    title:'清同治十三年-《湖州府志》-湖州归安县地图',
    id: '35'
});

export const local_group = new GroupLayer({
    title: 'local_ancient',
    layers: [local_chun, local_ming, local_qing],
    visibilityMode: 'exclusive',
    visible: false
});
local_group.layers.forEach(layer => {
    layer.visible = false;
    layer.legendEnabled = false;
});