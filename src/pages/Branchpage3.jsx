import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';


// import SideSpan from '../structures/SideSpan.jsx';

// import CardCollection from '../structures/CardCollection.jsx';
// import Card from '../structures/Card.jsx';

import styles from './Branchpage3.module.css';

const Branch3Map = lazy(() => import('../maps/Branch3Map.jsx'));

const service_info = [
    { value: "provision1", label: "供给服务——桑园" },
    { value: "provision2", label: "供给服务——鱼塘" },
    { value: "regulating1", label: "调节服务——涵养水源" },
    { value: "regulating2", label: "调节服务——水质净化" },
    { value: "culture1", label: "文化服务——精神" },
    { value: "culture2", label: "文化服务——休闲" },
];

const base_info = [
    { value: "farmer", label: "农民" },
    { value: "enterprise", label: "企业" },
    { value: "tourist", label: "游客" },
];


export default function BranchPage3() {
    // const [year, setYear] = useState(new Date().getFullYear());
    // const handleYearChange = (value) => {
    //     // console.log("year value: ", event.target.value);
    //     setYear(value);
    // }
    const [service_option, setServiceOption] = useState('');
    const [base_option, setBaseOption] = useState('');
    const [result_opacity, setResultOpacity] = useState(1);
    const [result_visible, setResultVisible] = useState(false);

    const mapProps = {
        basemap: 'osm',
        center: [120.288, 30.744],
        zoom: 10,
    };
    const viewProps = {
        service_option: service_option,
        base_option: base_option,
        result_opacity: result_opacity,
        result_visible: result_visible,
    };

    // const yearSliderProps = {
    //     startYear: 1960,
    //     endYear: 2020,
    //     handleYearChange: handleYearChange,
    //     yearNodes: [1960, 1970, 2000, 2010, 2020],
    //     slideStep:5
    // };


    return (
        <>
            {/* ====================================== Header */}
            <Header />

            {/* =============================== Main Content */}

            <div className={styles.allContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch3Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <SideSpan service_option={service_option} setServiceOption={setServiceOption}
                        base_option={base_option} setBaseOption={setBaseOption}
                        result_opacity={result_opacity} setResultOpacity={setResultOpacity}
                        result_visible={result_visible} setResultVisible={setResultVisible} />
                </div>
            </div>

            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer />
        </>
    );
}

function SideSpan({ service_option, setServiceOption,
    base_option, setBaseOption,
    result_opacity, setResultOpacity,
    result_visible, setResultVisible }) {

    const intro = "将热点分析视为权重，处理左侧的生态系统服务，即可得到：该利益相关者对该服务的态度。";
    const guide = <b>左侧内容：南浔区各生态系统服务的计算结果；<br></br>右侧内容：各利益相关者对每种服务的热点分析</b>

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>SideSpan</h1>
            <p>{guide}<br></br>{intro}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>Current option: {service_option} service Based on {base_option}
                <div className={styles.selectBoxContainer}>
                    <p>生态服务（左）：</p>
                    <SelectBox items={service_info} handleSelectChange={(event) => { setServiceOption(event.target.value); }} />
                </div>
                <div className={styles.selectBoxContainer}>
                    <p>利益相关者（右）：</p>
                    <SelectBox items={base_info} handleSelectChange={(event) => { setBaseOption(event.target.value); }} />
                </div>
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>Result opacity: {result_opacity * 100}%
                <div className={styles.opacitySliderContainer}>
                    <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={result_opacity}
                        onChange={(event) => { setResultOpacity(event.target.value); }} />
                    <button className={styles.toggleButton} onClick={() => { setResultVisible(!result_visible); }}>
                        {result_visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

            </div>

        </div>
    );
}
