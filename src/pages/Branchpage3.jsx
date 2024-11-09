import React, { useContext, useState, lazy, Suspense } from 'react';
import { Card, Divider, Button } from 'antd';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../to_improve/SelectBox.jsx';
import SelectGroup from '../widgets/SelectGroup.jsx';
import styles from './Branchpage3.module.css';
const Branch3Map = lazy(() => import('../maps/Branch3Map.jsx'));

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const service_info = [
    { value: "provision", label: "供给服务" },
    { value: "regulating", label: "调节服务" },
    { value: "culture", label: "文化服务" },
];
const service_info2 = [
    { value: "provision", title: "供给服务" },
    { value: "regulating", title: "调节服务" },
    { value: "culture", title: "文化服务" },
];

const base_info = [
    { value: "farmer", label: "农民" },
    { value: "enterprise", label: "企业" },
    { value: "tourist", label: "游客" },
];
const base_info2 = [
    { value: "farmer", title: "农民" },
    { value: "enterprise", title: "企业" },
    { value: "tourist", title: "游客" },
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
                    <SideSpan2 service_option={service_option} setServiceOption={setServiceOption}
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
                <SideSpan2 service_option={service_option} setServiceOption={setServiceOption}
                    base_option={base_option} setBaseOption={setBaseOption}
                    result_opacity={result_opacity} setResultOpacity={setResultOpacity}
                    result_visible={result_visible} setResultVisible={setResultVisible} />
            </div>
        </div>

    </>);

}

function SideSpan2({ service_option, setServiceOption,
    base_option, setBaseOption,
    result_opacity, setResultOpacity,
    result_visible, setResultVisible }) {

    const guide = <>
        <li><b>左图：</b>各生态系统服务</li>
        <li><b>右图：</b>结合不同利益相关者对生态系统服务的态度所得到的生态系统服务量化结果及热点分析</li>
        点击显示结果，可查看生态系统服务量化结果；点击隐藏结果，可暂时隐藏结果。
    </>
    const guideCard =
        <Card title="操作说明" className={styles.guideCard}
            headStyle={{
                backgroundColor: '#cbebff',
                borderBottom: '1px solid skyblue',
            }}>
            {guide}
        </Card>;

    const base_label = base_option === "farmer" ? "农民" :
        base_option === "enterprise" ? "企业" :
            base_option === "tourist" ? "游客" : "";
    const service_label = service_option === "provision" ? "供给" :
        service_option === "regulating" ? "调节" :
            service_option === "culture" ? "文化" : "";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>生态系统服务分析</h1>
            {guideCard}
            <Divider />

            <div className={styles.sideSpan}>当前选项：
                {base_label && service_label && `${base_label}，${service_label}`}
            </div>
            <Card title={`生态服务（左）：${service_label}`} className={styles.card} >
                <SelectGroup selectinfo={service_info2} handleSelectChange={setServiceOption} />
            </Card>
            <Card title={`主体（右）：${base_label}`} className={styles.card}>
                <SelectGroup selectinfo={base_info2} handleSelectChange={setBaseOption} />
            </Card>

            {base_option && service_option && <>
                <Card style={{ marginTop: "8px" }} className={styles.card}>
                    <b>结果：{base_label} 对于 {service_label} 服务的态度</b> 
                    <Button className={styles.sideSpanButton}
                        onClick={() => setResultVisible(!result_visible)}>{result_visible ? "隐藏结果" : "显示结果"}</Button>
                </Card>


            </>}
            <Divider />

            {/* <p style={{ marginBottom: "8px", fontSize: "medium", fontWeight: "bold" }}>结果透明度: {result_opacity * 100}%</p>
                <div className={styles.opacitySliderContainer}>
                    <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={result_opacity}
                        onChange={(event) => { setResultOpacity(event.target.value); }} />
                    <button className={styles.toggleButton} onClick={() => { setResultVisible(!result_visible); }}>
                        {result_visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div> */}





        </div>
    );
}

function Intro() {
    return (
        <>
            <h1 className={styles.introTitle}>生态系统服务分析</h1>
            <div className={styles.introContent}>
                <p>生态系统服务（ecosystem services）是指人类从生态系统中获得的惠益，包括供给、调节、文化等服务，它们体现了人类社会与自然环境之间的相互依赖关系。</p>
                <p>由于不同利益相关者（如农民、企业、游客）对生态系统服务的需求和看法有所差异，本研究在量化生态系统服务的基础上，也评估了各类利益相关者对生态系统服务的认知与态度。</p>
                <div className={styles.introlist} >
                    <p><b>1. 湖州乡村地区生态系统服务</b>
                        (待补充)
                    </p>
                    <p><b>2. 湖州南浔桑基鱼塘景观生态系统服务</b>
                        <ul>
                            <li><b>左图：</b>展示湖州南浔桑基鱼塘景观的生态系统服务。
                                <b>服务：</b>供给服务、调节服务、文化服务。</li>
                            <li><b>右图：</b>结合不同利益相关者<b>（农民、企业和游客）</b>对生态系统服务的态度所得到的生态系统服务量化结果，并进行了相应的热点分析。</li>
                        </ul>
                    </p>

                </div>
            </div>
        </>
    );
}
