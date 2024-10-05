import React, { useContext, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage3.module.css';
const Branch3Map = lazy(() => import('../maps/Branch3Map.jsx'));

import { VersionContext } from '../App.jsx';

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

    const version = useContext(VersionContext);

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
            <Footer version={version} />
        </>
    );
}

function SideSpan({ service_option, setServiceOption,
    base_option, setBaseOption,
    result_opacity, setResultOpacity,
    result_visible, setResultVisible }) {

    const intro ="展示湖州市南浔区的生态系统服务分析，以及进一步分析结果（生态系统服务的热点分析、多利益相关者对生态系统服务的态度）。"
    const guide = <><li><b>左侧内容：南浔区各生态系统服务的计算结果；</b></li>
                <li><b>右侧内容：各利益相关者对每种服务的热点分析</b> </li>
                <li>将热点分析视为权重，处理左侧的生态系统服务，即可得到：<b>该利益相关者对该服务的态度。</b></li></>

    const base_label = base_option === "farmer" ? "农民" :
        base_option === "enterprise" ? "企业" :
            base_option === "tourist" ? "游客" : "";
    const service_option_slice = service_option.slice(0, -1);
    const service_label = service_option_slice === "provision" ? "供给" :
        service_option_slice === "regulating" ? "调节" :
            service_option_slice === "culture" ? "文化" : "";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p>{intro}</p>
            <p style={{marginTop:"0"}}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: 基于 {base_label} 的 {service_label} 服务
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

            <div className={styles.sideSpan}>结果: {base_label} 对于 {service_label} 服务的态度
            
            <p style={{marginBottom:"8px", fontSize:"medium", fontWeight:"bold"}}>结果透明度: {result_opacity * 100}%</p>
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
