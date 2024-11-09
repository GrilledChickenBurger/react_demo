import React, { useContext, useState, lazy, Suspense, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card, BackTop, Divider } from 'antd';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBoxGroup from '../to_improve/SelectBoxGroup.jsx';
import SelectGroup from '../widgets/SelectGroup.jsx';
import YearSlider from '../to_improve/YearSlider.jsx';
import TimeSlider from '../widgets/TimeSlider.jsx';
import styles from './Branchpage2.module.css';
const Branch2Map = lazy(() => import('../maps/Branch2Map.jsx'));

import { huzhou_labels, huzhou_labelidx } from '../data/branch2_huzhou.jsx';
import { nanxun_ids, nanxun_labelidx } from '../data/branch2_nanxun_shp.jsx';
import { local_labels } from '../data/branch2_local_tif.jsx';

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const yearinfo = {
    'huzhou': {
        startYear: 0, endYear: huzhou_labels.length - 1,
        yearNodes: huzhou_labelidx,
        yearLabels: huzhou_labelidx.map((labelidx) => {
            return huzhou_labels[labelidx];
        }),
        slideStep: 1,
        initYear: 0
    },
    'nanxun_landuse': {
        startYear: 0, endYear: nanxun_ids.length - 1,
        yearNodes: nanxun_labelidx,
        yearLabels: nanxun_labelidx.map((labelidx) => {
            return nanxun_ids[labelidx];
        }),
        slideStep: 1,
        initYear: 0
    },
    'local': {
        startYear: 0, endYear: local_labels.length - 1,
        yearLabels: local_labels, slideStep: -1,
        initYear: 0
    },
}

const selectinfo_group = [
    {
        title: "1. 湖州市尺度", items: [
            { value: "huzhou_position", label: "湖州市 乡村聚落演变（新石器时代至今）" },
        ]
    },
    {
        title: "2. 南浔区尺度", items: [
            { value: "ALL", label: "南浔区 景观格局演变（春秋战国时期至今）" },
            // { value: "landuse_1-2-3", label: "南浔区 桑基鱼塘分布" },
        ]
    },
    {
        title: "3. 局地尺度", items: [
            { value: "local_ancient", label: "湖州桑基鱼塘景观 格局演变（春秋战国时期至今）" },
        ]
    },
];
const selectinfo = [
    {
        title: <b>1. 湖州市尺度</b>, selectable: false, children: [
            { value: "huzhou", title: "湖州市 乡村聚落演变（新石器时代至今）" },
        ]
    },
    {
        title: <b>2. 南浔区尺度</b>, selectable: false, children: [
            { value: "nanxun_landuse", title: "南浔区 景观格局演变（春秋战国时期至今）" },
            // { value: "landuse_1-2-3", label: "南浔区 桑基鱼塘分布" },
        ]
    },
    {
        title: <b>3. 局地尺度</b>, selectable: false, children: [
            { value: "local", title: "湖州桑基鱼塘景观 格局演变（春秋战国时期至今）" },
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
                             </h1>
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
        center: [119.83, 30.71],
        zoom: 10,
    };
    const viewProps = {
        cur_year: year,
        cur_option: option,
        tif_opacity: tif_opacity,
        tif_visible: tif_visible,
        shp_opacity: shp_opacity,
        shp_visible: shp_visible,
    };

    const SliderProps = {
        handleYearChange: handleYearChange,
        slideStep: 1,
        // yearLabels: [1910, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025]
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

                <div className={styles.sideSpanContainer}>
                    <SideSpan
                        year={year} SliderProps={SliderProps}
                        option={option} setOption={setOption}
                        tif_opacity={tif_opacity} setTifOpacity={setTifOpacity} tif_visible={tif_visible} setTifVisible={setTifVisible}
                        shp_opacity={shp_opacity} setShpOpacity={setShpOpacity} shp_visible={shp_visible} setShpVisible={setShpVisible} />
                </div>
            </div>
        </>
    );
}

function SideSpan({ year, SliderProps, option, setOption,
    tif_opacity, setTifOpacity, tif_visible, setTifVisible,
    shp_opacity, setShpOpacity, shp_visible, setShpVisible
}) {

    const guide = <><li>调整年份，展示不同年份的数据；</li>
        <li>选择不同选项，展示不同类型的数据;</li>
        <li>调整不同图层的透明度，以便于观察。</li></>
    const guideCard =
        <Card title="操作说明" className={styles.guideCard}
        headStyle={{
            backgroundColor:'#cbebff',
            borderBottom: '1px solid skyblue',
          }}>
            {guide}
        </Card>;

    const option_label =
        option === "huzhou" ? "湖州市 乡村聚落演变" :
            option === "nanxun_landuse" ? "南浔区 景观格局演变" :
                option === "local" ? "局部 桑基鱼塘格局演变" : "";

    const slider_settings = yearinfo[option];


    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>景观格局演变分析</h1>
            {guideCard}
            <Divider />

            {/* <div className={styles.sideSpan}>当前年份:
                {time_label}
                {slider}
            </div> */}
            <Card title={`当前选项：${option_label}`}>
                <SelectGroup selectinfo={selectinfo} handleSelectChange={setOption} />
            </Card>

            <Divider />
            {option.length > 0 && <>
            <Card title={
                `当前年份：${option === 'huzhou' ? huzhou_labels[year] :
                    option === 'local' ? local_labels[year] :
                        nanxun_ids[year]}`}>
                <TimeSlider
                    settings={{ ...SliderProps, ...slider_settings, option }} />
            </Card>
            <Divider />
            </>}

            {option.startsWith('nanxun') ?
                <>
                    <Card title={`遥感影像透明度: ${tif_opacity * 100}%`}>
                        <div className={styles.opacitySliderContainer}>
                            <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={tif_opacity} onChange={(event) => setTifOpacity(event.target.value)} />
                            <button className={styles.toggleButton} onClick={() => setTifVisible(!tif_visible)}>
                                {tif_visible ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </Card>
                    <Card title={`土地利用透明度: ${shp_opacity * 100}%`}>
                        <div className={styles.opacitySliderContainer}>
                            <input className={styles.opacitySlider} type="range" min="0" max="1" step="0.05" value={shp_opacity} onChange={(event) => setShpOpacity(event.target.value)} />
                            <button className={styles.toggleButton} onClick={() => setShpVisible(!shp_visible)}>
                                {shp_visible ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </Card>
                </>
                : null
            }


            {/* <div className={styles.sideSpan}>当前选项: {option_label}
                <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} />
                <SelectBoxGroup list={selectinfo_group} handleSelectChange={(event) => setOption(event.target.value)} />
                <SelectGroup selectinfo={selectinfo} handleSelectChange={setOption} />
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

            </div> */}

        </div>
    );
}

function Intro() {
    return (
        <>
            <h1 className={styles.introTitle}>景观格局演变分析</h1>
            <div className={styles.introContent}>
                <p>景观格局分析是景观可持续研究的重要基础，能够为我们提供长时间尺度下景观演变的整体动态视角。本研究在三个空间尺度上分析湖州乡村的景观格局，以揭示其时空演变规律。</p>

                <div className={styles.introlist}>
                    <p>1. 湖州乡村聚落演变（新石器时代至今）。</p>
                    <p>2. 湖州南浔区景观格局演变（春秋战国时期至今）</p>
                    <p>3. 湖州桑基鱼塘景观格局演变（春秋战国时期至今）</p>
                </div>
            </div>
        </>
    );
}