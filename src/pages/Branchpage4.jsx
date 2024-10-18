import React, { useContext, useState, lazy, Suspense } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage4.module.css';
const Branch4Map = lazy(() => import('../maps/Branch4Map.jsx'));

import { VersionContext } from "../App.jsx";
import { BreadCrumb } from '../components/BreadCrumb.jsx';


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

            <div className={styles.coreContainer}>
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

export function BranchPiece4() {
    const [result, setResult] = useState(null);
    const [res_visible, setResVisible] = useState(false);

    const mapProps = {
        basemap: 'osm',
        center: [120.288, 30.744],
        zoom: 10,
    };
    const viewProps = {
        res_visible: res_visible,
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
                    <Branch4Map mapProps={mapProps} viewProps={viewProps} setResult={setResult} />
                </Suspense>
            </div>
            {/* ======================================================== */}
            <div className={styles.sideSpanContainer}>
                <SideSpan result={result}
                    res_visible={res_visible} setResVisible={setResVisible} />
            </div>
        </div>
    </>)
}

function SideSpan({result, res_visible, setResVisible }) {
    const intro = <>六种服务的定性关系式提取，展示桑基减少、鱼塘面积增加对各服务的影响。<br />
        <b>选择不同选项，筛选土地利用类型。<br />
            单击地图，可查看具体位置的详细数据。</b></>;
    const guide = <b>
        <li>左上：2015年南浔区土地利用；</li>
        <li>左下：2015年南浔区生态系统服务图；</li>
        <li>右上：2019年南浔区土地利用；</li>
        <li>右下：2019年南浔区生态系统服务图。</li></b>

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p>{intro}</p>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前统计结果: 
                <button style={{ marginTop: "15px", backgroundColor: "green", color: "white", borderRadius: "5px", width: "100%" }}
                    onClick={() => setResVisible(!res_visible)}>
                    {res_visible ? "隐藏统计结果" : "查看统计结果"}</button>
                {/* <div className={styles.selectBoxContainer}>
                    <p>展示的土地利用类型：</p>
                    <SelectBox items={option_info} handleSelectChange={(event) => { setCurOption(event.target.value); }} />
                </div> */}
                {res_visible && <div className={styles.resultContainer}>
                    {/* <p>当前统计结果</p> */}
                    <div className={styles.resultContent} dangerouslySetInnerHTML={{ __html: result }} />
                </div>
                    }
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />
        </div>
    );
}

function Intro() {
    return (
        <>
            <h2 className={styles.introTitle}>四、景观格局——生态系统服务关系分析</h2>
            <div className={styles.introContent}>
                <p>生态系统服务，指的是（ecosystem services）是指人类从生态系统获得的所有惠益，包括供给服务（如提供食物和水）、调节服务（如控制洪水和疾病）、文化服务（如精神、娱乐和文化收益）等。</p>
                <p>而土地利用情况、景观格局的改变，会造成生态系统服务也随之改变。</p>
                <p>湖州市南浔区是桑基鱼塘的保护区所在地之一，对比其不同年份的土地利用情况和生态系统服务，可以更加直观地分析桑基鱼塘系统中，桑园减少、鱼塘面积增加等变化对生态系统服务的影响。</p>
                <div className={styles.introlist} >
                    <p>1. <b>左侧地图：</b>展示湖州市南浔区的生态系统服务分析。
                        <b>服务：</b>供给服务、调节服务、文化服务。</p>
                    <p>2. <b>右侧地图：</b>展示不同主体/利益相关者对于不同生态系统服务的热点分析。
                        <b>主体：</b>农民、企业、游客；</p>
                </div>
            </div>
        </>
    );
}