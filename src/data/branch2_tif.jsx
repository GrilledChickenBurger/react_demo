import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

const tif_1960 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun1960_tif/ImageServer",
    title: "南浔区菱湖镇、和孚镇1960年遥感影像",
    id: '1960',
});
const tif_1970 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun1970_tif/ImageServer",
    title: "南浔区菱湖镇、和孚镇1970年遥感影像",
    id: '1970',
});
const tif_2020 = new ImageryTileLayer({
    url: "https://tiledimageservices9.arcgis.com/vBCQ4PWZkZBueexC/arcgis/rest/services/nanxun2000_tif/ImageServer",
    title: "南浔区菱湖镇、和孚镇2000年遥感影像",
    id: '2000',
});
export const tif_group = new GroupLayer({
    title: 'tif',
    layers: [tif_1960, tif_1970, tif_2020],
    visible: true,
});
tif_group.layers.forEach(element => {
    element.visible = false;
    element.legendEnabled = false;
});