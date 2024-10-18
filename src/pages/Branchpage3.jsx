import React, { useContext, useState, lazy, Suspense } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage3.module.css';
const Branch3Map = lazy(() => import('../maps/Branch3Map.jsx'));

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const service_info = [
    { value: "provision", label: "供给服务" },
    { value: "regulating", label: "调节服务" },
    { value: "culture", label: "文化服务" },
];

const base_info = [
    { value: "farmer", label: "农民" },
    { value: "enterprise", label: "企业" },
    { value: "tourist", label: "游客" },
];


export default function BranchPage3() {

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

            {/* ============================================== BreadCrumb */}
            <BreadCrumb />
            {/* ============================================== Intro */}
            <div className={styles.introContainer}>
                <Intro />
            </div>

            {/* =============================== Main Content */}

            <div className={styles.coreContainer}>
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

export function BranchPiece3() {
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
    return (<>
        {/* ============================================== BreadCrumb */}
        <BreadCrumb />
        {/* ============================================== Intro */}
        <div className={styles.introContainer}>
            <Intro />
        </div>
        {/* =============================== Main Content */}
        <div className={styles.coreContainer}>
            <div className={styles.mapContainer}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Branch3Map mapProps={mapProps} viewProps={viewProps} />
                </Suspense>
            </div>
            <div className={styles.divider}></div>

            {/* ======================================================== */}
            <div className={styles.sideSpanContainer}>
                <SideSpan service_option={service_option} setServiceOption={setServiceOption}
                    base_option={base_option} setBaseOption={setBaseOption}
                    result_opacity={result_opacity} setResultOpacity={setResultOpacity}
                    result_visible={result_visible} setResultVisible={setResultVisible} />
            </div>
        </div>

    </>);

}

function SideSpan({ service_option, setServiceOption,
    base_option, setBaseOption,
    result_opacity, setResultOpacity,
    result_visible, setResultVisible }) {

    const guide = <><li><b>左侧内容：各生态系统服务；</b></li>
        <li><b>右侧内容：各主体对各服务的热点分析</b> </li></>

    const base_label = base_option === "farmer" ? "农民" :
        base_option === "enterprise" ? "企业" :
            base_option === "tourist" ? "游客" : "";
    const service_label = service_option === "provision" ? "供给" :
        service_option === "regulating" ? "调节" :
            service_option === "culture" ? "文化" : "";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>

            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项：
                {base_label && service_label && `${base_label}，${service_label}`}
                {/* <div className={styles.sideSpanLabel}>
                    当前选项：
                    {base_label && service_label && `${base_label}，${service_label}`}
                </div> */}
                <div className={styles.selectBoxContainer}>
                    <p>生态服务（左）：</p>
                    <SelectBox items={service_info} handleSelectChange={(event) => { setServiceOption(event.target.value); }} />
                </div>
                <div className={styles.selectBoxContainer}>
                    <p>主体（右）：</p>
                    <SelectBox items={base_info} handleSelectChange={(event) => { setBaseOption(event.target.value); }} />
                </div>
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>结果: {base_label} 对于 {service_label} 服务的态度

                {/* <p style={{ marginBottom: "8px", fontSize: "medium", fontWeight: "bold" }}>结果透明度: {result_opacity * 100}%</p>
                <div className={styles.opacitySliderContainer}>
                    <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={result_opacity}
                        onChange={(event) => { setResultOpacity(event.target.value); }} />
                    <button className={styles.toggleButton} onClick={() => { setResultVisible(!result_visible); }}>
                        {result_visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div> */}
                {base_option && service_option &&
                    <button className={styles.sideSpanButton}
                        onClick={() => setResultVisible(!result_visible)}>{result_visible ? "隐藏结果" : "显示结果"}</button>
                }

            </div>


        </div>
    );
}

function Intro() {
    return (
        <>
            <h2 className={styles.introTitle}>三、历史现状评估——生态系统服务评估</h2>
            <div className={styles.introContent}>
                <p>生态系统服务，指的是（ecosystem services）是指人类从生态系统获得的所有惠益，包括供给服务（如提供食物和水）、调节服务（如控制洪水和疾病）、文化服务（如精神、娱乐和文化收益）等。</p>
                <p>湖州市南浔区是桑基鱼塘的保护区所在地之一，对其进行生态系统服务评估，可以帮助了解桑基鱼塘生态系统对周边社区和生态环境的影响，评估其在水资源供给、水质净化、生物多样性维护以及文化传承等方面的贡献，为制定保护区的管理政策和可持续利用提供科学依据。</p>
                <div className={styles.introlist} >
                    <p>1. <b>左侧地图：</b>展示湖州市南浔区的生态系统服务分析。
                        <b>服务：</b>供给服务、调节服务、文化服务。</p>
                    <p>2. <b>右侧地图：</b>展示不同主体/利益相关者对于不同生态系统服务的热点分析。
                        <b>主体：</b>农民、企业、游客；</p>
                    <p>3. 展示不同主体/利益相关者对不同生态系统服务的态度。
                        <li>将热点分析视为权重，处理生态系统服务，即可得到：<b>该利益相关者对该服务的态度。共9个结果。</b></li>
                    </p>
                </div>
            </div>
        </>
    );
}
