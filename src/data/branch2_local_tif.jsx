import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";


export const local_ids = ['0', '1', '2'];
export const local_labels = ['春秋战国', '明万历', '清同治'];

const local_chun = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/chunqiu/ImageServer",
    title: "春秋战国时期塘浦圩田",
    id:'0'
});

const local_ming = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_ming/ImageServer",
    title:'明万历-《湖州府志》-湖州府平面图',
    id: '1'
});

const local_qing = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/huzhou_qing/ImageServer",
    title:'清同治十三年-《湖州府志》-湖州归安县地图',
    id: '2'
});

export const local_group = new GroupLayer({
    id: 'local',
    layers: [local_chun, local_ming, local_qing],
    visibilityMode: 'exclusive',
    visible: false
});
local_group.layers.forEach(layer => {
    layer.visible = false;
    layer.legendEnabled = false;
});