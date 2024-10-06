import React, { useContext, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage4.module.css';
const Branch4Map = lazy(() => import('../maps/Branch4Map.jsx'));

import { VersionContext } from "../App.jsx";

const option_info = [
    { value: "landuse_all", label: "南浔区——总体土地利用情况" },
    { value: "landuse_1-2-3", label: "南浔区——桑基鱼塘分布情况" },
    { value: "landuse_2", label: "南浔区——桑园分布情况" },
    { value: "landuse_3", label: "南浔区——水田分布情况" },
    { value: "landuse_1", label: "南浔区——鱼塘分布情况" },
];



export default function BranchPage4() {
    const [cur_option, setCurOption] = useState('');
    const [result, setResult] = useState(null);

    const mapProps = {
        basemap: 'osm',
        center: [120.288, 30.744],
        zoom: 10,
    };
    const viewProps = {
        cur_option: cur_option,
    };

    const version = useContext(VersionContext);

    return (
        <>
            {/* ====================================== Header */}
            <Header />

            {/* =============================== Main Content */}

            <div className={styles.allContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch4Map mapProps={mapProps} viewProps={viewProps} setResult={setResult} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <SideSpan cur_option={cur_option} setCurOption={setCurOption} />
                </div>
            </div>
            
            {result &&
                
                <div className={styles.resultContainer}>
                <hr style={{ width: "95%", height: "1px", backgroundColor: "gray" }} />
                    
                <h2>两年份差异结果</h2>
                <div className={styles.resultContent} dangerouslySetInnerHTML={{ __html: result }} />

            </div>}
            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer version={version} />
        </>
    );
}

function SideSpan({ cur_option, setCurOption }) {
    const intro = <>六种服务的定性关系式提取，展示桑基减少、鱼塘面积增加对各服务的影响。<br />
        <b>选择不同选项，筛选土地利用类型。<br />
        单击地图，可查看具体位置的详细数据。</b></>;
    const guide = <b>
        <li>左上：2015年南浔区土地利用；</li>
        <li>左下：2015年南浔区ES图；（直方图，待补充）</li>
        <li>右上：2019年南浔区土地利用；</li>
        <li>右下：2019年南浔区ES图。（直方图，待补充）</li></b>

    const option_label = cur_option === "landuse_all" ? "总体土地利用" :
                        cur_option === "landuse_1-2-3" ? "桑基鱼塘分布" :
                        cur_option === "landuse_2" ? "桑园分布" :
                        cur_option === "landuse_3" ? "水田分布" :
                        cur_option === "landuse_1" ? "鱼塘分布" : "";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p>{intro}</p>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                <div className={styles.selectBoxContainer}>
                    <p>展示的土地利用类型：</p>
                    <SelectBox items={option_info} handleSelectChange={(event) => { setCurOption(event.target.value); }} />
                </div>
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            {/* <div className={styles.sideSpan}>Result opacity: {result_opacity * 100}%
                <div className={styles.opacitySliderContainer}>
                    <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={result_opacity}
                        onChange={(event)=>{setResultOpacity(event.target.value);}} />
                    <button className={styles.toggleButton} onClick={(event)=>{setResultVisible(!result_visible);}}>
                        {result_visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

            </div> */}

        </div>
    );
}