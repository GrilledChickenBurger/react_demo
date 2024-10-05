import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage4.module.css';
const Branch4Map = lazy(() => import('../maps/Branch4Map.jsx'));

const option_info = [
    { value: "ALL", label: "南浔区——土地利用情况" },
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
            <div className={styles.resultContainer}>
                <h1>Result</h1>
                <p>This is the result of the selected option.</p>
                {result ? (
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                ) : (
                    <p>没有结果</p>
                )}
            </div>
            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer />
        </>
    );
}

function SideSpan({ cur_option, setCurOption }) {
    const intro = "六种服务的定性关系式提取，展示桑基减少、鱼塘面积增加对各服务的影响。";
    const guide = <b>
        左侧内容：（上）2015年南浔区土地利用；<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（下）2015年南浔区ES图。<br></br>
        右侧内容：（上）2019年南浔区土地利用；<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（下）2019年南浔区ES图。
    </b>

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>SideSpan</h1>
            <p>{intro}<br></br>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>Current option: {cur_option}
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