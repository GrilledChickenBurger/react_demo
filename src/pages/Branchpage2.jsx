import React, { useContext, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import SelectBoxGroup from '../widgets/SelectBoxGroup.jsx';
import YearSlider from '../widgets/YearSlider.jsx';
import styles from './Branchpage2.module.css';
const Branch2Map = lazy(() => import('../maps/Branch2Map.jsx'));

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const selectinfo = [
    { value: "ALL", label: "南浔区——遥感影像及土地利用情况" },
    { value: "landuse_1-2-3", label: "南浔区——桑基鱼塘分布情况" },
];

const selectinfo_group = [
    {
        title: "1. 湖州市尺度", items: [
            { value: "huzhou_position", label: "湖州市 乡村聚落分布" },
        ]
    },
    {
        title: "2. 南浔区尺度", items: [
            { value: "ALL", label: "南浔区 遥感影像及土地利用" },
            { value: "landuse_1-2-3", label: "南浔区 桑基鱼塘分布" },
        ]
    },
    {
        title: "3. 局部尺度", items: [
            { value: "local_ancient", label: "局部 桑基鱼塘具体形态（待完善）" },
        ]
    },
];


export default function BranchPage2() {
    const [year, setYear] = useState(null);
    const handleYearChange = (value) => {
        // console.log("year value: ", event.target.value);
        setYear(value);
    }
    const [option, setOption] = useState('');

    const [tif_opacity, setTifOpacity] = useState(1);
    const [tif_visible, setTifVisible] = useState(true);

    const [shp_opacity, setShpOpacity] = useState(0.7);
    const [shp_visible, setShpVisible] = useState(true);


    const mapProps = {
        basemap: 'osm',
        center: [120.171, 30.745],
        zoom: 12,
    };
    const viewProps = {
        cur_year: year,
        cur_option: option,
        tif_opacity: tif_opacity,
        tif_visible: tif_visible,
        shp_opacity: shp_opacity,
        shp_visible: shp_visible,
    };

    const yearSliderProps = {
        startYear: 1960,
        endYear: 2025,
        handleYearChange: handleYearChange,
        yearNodes: [1960, 1970, 2000, 2010, 2020, 2025],
        slideStep: 5
    };
    const version = useContext(VersionContext);

    return (
        <>
            {/* ====================================== Header */}
            <Header />
            <div className={styles.introContainer}>
                <Intro />
            </div>

            {/* =============================== Main Content */}

            <div className={styles.coreContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch2Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    {/* <div className={styles.sideSpanContent}>
                        <h1 className={styles.sideSpanTitle}>
                            操作台</h1>
                        <div className={styles.sideSpan}>Current year: {year}
                            <YearSlider settings={yearSliderProps} />
                        </div>
                        <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />
                        <div className={styles.sideSpan}>Current option: {option}
                            <SelectBox items={selectinfo} handleSelectChange={handleSelectChange} />
                        </div>
                        <div className={styles.sideSpan}>TIF opacity: {tif_opacity * 100}%
                            <div className={styles.opacitySliderContainer}>
                                <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={tif_opacity} onChange={handleTifOpacityChange} />
                                <button className={styles.toggleButton} onClick={ToggleTifVisible}>
                                    {tif_visible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>

                        </div>
                        <div className={styles.sideSpan}>SHP opacity: {shp_opacity * 100}%
                            <div className={styles.opacitySliderContainer}>
                                <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={shp_opacity} onChange={handleShpOpacityChange} />
                                <button className={styles.toggleButton} onClick={ToggleShpVisible}>
                                    {shp_visible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>

                        </div>

                    </div> */}
                    <SideSpan year={year} yearSliderProps={yearSliderProps} option={option} setOption={setOption}
                        tif_opacity={tif_opacity} setTifOpacity={setTifOpacity} tif_visible={tif_visible} setTifVisible={setTifVisible}
                        shp_opacity={shp_opacity} setShpOpacity={setShpOpacity} shp_visible={shp_visible} setShpVisible={setShpVisible} />
                </div>
            </div>

            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer version={version} />
        </>
    );
}

export function BranchPiece2() {
    const [year, setYear] = useState(1960);
    const handleYearChange = (value) => {
        // console.log("year value: ", event.target.value);
        setYear(value);
    }
    const [option, setOption] = useState('');

    const [tif_opacity, setTifOpacity] = useState(1);
    const [tif_visible, setTifVisible] = useState(true);

    const [shp_opacity, setShpOpacity] = useState(0.7);
    const [shp_visible, setShpVisible] = useState(true);


    const mapProps = {
        basemap: 'osm',
        center: [120.171, 30.745],
        zoom: 12,
    };
    const viewProps = {
        cur_year: year,
        cur_option: option,
        tif_opacity: tif_opacity,
        tif_visible: tif_visible,
        shp_opacity: shp_opacity,
        shp_visible: shp_visible,
    };

    const yearSliderProps = {
        startYear: 1950,
        endYear: 2025,
        handleYearChange: handleYearChange,
        yearNodes: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025],
        slideStep: 5,
        initYear: 1950
    };

    return (
        <>
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
                        <Branch2Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.sideSpanContainer}>
                    <SideSpan year={year} yearSliderProps={yearSliderProps} option={option} setOption={setOption}
                        tif_opacity={tif_opacity} setTifOpacity={setTifOpacity} tif_visible={tif_visible} setTifVisible={setTifVisible}
                        shp_opacity={shp_opacity} setShpOpacity={setShpOpacity} shp_visible={shp_visible} setShpVisible={setShpVisible} />
                </div>
            </div>
        </>
    );
}

function SideSpan({ year, yearSliderProps, option, setOption,
    tif_opacity, setTifOpacity, tif_visible, setTifVisible,
    shp_opacity, setShpOpacity, shp_visible, setShpVisible
}) {

    const guide = <b><li>调整年份，展示不同年份的数据；</li>
        <li>选择不同选项，展示不同类型的数据;</li>
        <li>调整不同图层的透明度，以便于观察。</li></b>

    const option_label =
        option === "huzhou_position" ? "湖州市 乡村聚落分布" :
            option === "ALL" ? "南浔区 总体土地利用" :
                option === "landuse_1-2-3" ? "南浔区 桑基鱼塘分布" :
                    option === "ancient" ? "局部 桑基鱼塘具体形态" : "";


    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前年份: {year}
                <YearSlider settings={yearSliderProps} />
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                {/* <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} /> */}
                <SelectBoxGroup list={selectinfo_group} handleSelectChange={(event) => setOption(event.target.value)} />
                {option === 'ALL' || option === 'landuse_1-2-3' ?
                    <>
                        <li style={{ margin: "0", fontSize: "large" }}>遥感影像透明度: {tif_opacity * 100}%</li>
                        <div className={styles.opacitySliderContainer}>
                            <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={tif_opacity} onChange={(event) => setTifOpacity(event.target.value)} />
                            <button className={styles.toggleButton} onClick={() => setTifVisible(!tif_visible)}>
                                {tif_visible ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        <li style={{ margin: "0", fontSize: "large" }}>土地利用透明度: {shp_opacity * 100}%</li>
                        <div className={styles.opacitySliderContainer}>
                            <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={shp_opacity} onChange={(event) => setShpOpacity(event.target.value)} />
                            <button className={styles.toggleButton} onClick={() => setShpVisible(!shp_visible)}>
                                {shp_visible ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                    </>
                    : null
                }

            </div>

        </div>
    );
}

function Intro() {
    return (
        <>
            <h2 className={styles.introTitle}>二、历史现状评估——景观格局评估</h2>
            <div className={styles.introContent}>
                <p>景观格局是衡量景观绿化、生态平衡、人文景观、经济景观等综合性能的重要指标。</p>
                <p>湖州市南浔区是桑基鱼塘的保护区所在地之一，对其进行景观格局评估，可以。。。</p>
                <p>遥感影像及土地利用数据为我们提供了一种新型的综合评估手段。通过对遥感影像及土地利用数据的分析，我们可以了解到南浔区桑基鱼塘的分布情况、生态景观等综合信息。</p>
                <div className={styles.introlist}>
                    <p>1. 展示2500年前至今，南浔区的桑基鱼塘整体形态演变。
                        <b>古代地图来源：文献资料；现代地图来源：遥感影像数据、土地利用数据。</b></p>
                    <p>2. 展示现代南浔区桑基鱼塘的具体分布情况及生态景观。<b>土地利用数据：</b>桑园面积、鱼塘面积、水田面积</p>
                    <p>3. 展示现代南浔区桑基鱼塘<b>在多个尺度下</b>的景观格局指数。<b>尺度：</b>湖州尺度、南浔区尺度、局部尺度</p>
                </div>
            </div>
        </>
    );
}