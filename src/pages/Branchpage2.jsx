import React, { useContext, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import YearSlider from '../widgets/YearSlider.jsx';
import styles from './Branchpage2.module.css';
const Branch2Map = lazy(() => import('../maps/Branch2Map.jsx'));

import { VersionContext } from '../App.jsx';

const selectinfo = [
    { value: "ALL", label: "南浔区——遥感影像及土地利用情况" },
    // { value: "landuse_all", label: "南浔区——土地利用情况" },
    { value: "landuse_1-2-3", label: "南浔区——桑基鱼塘分布情况" },
];


export default function BranchPage2() {
    const [year, setYear] = useState(new Date().getFullYear());
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
        endYear: 2020,
        handleYearChange: handleYearChange,
        yearNodes: [1960, 1970, 2000, 2010, 2020],
        slideStep: 5
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

function SideSpan({ year, yearSliderProps, option, setOption,
    tif_opacity, setTifOpacity, tif_visible, setTifVisible,
    shp_opacity, setShpOpacity, shp_visible, setShpVisible
}) {
    const intro = "展示从1975年开始，湖州市南浔区的遥感解译数据，以及桑基鱼塘景观的面积、形态、N元素、景观格局指数等。";
    const guide = <b><li>调整年份，展示不同年份的数据；</li>
        <li>选择不同选项，展示不同类型的数据;</li>
        <li>调整不同图层的透明度，以便于观察。</li></b>

    const option_label = option === "ALL" ? "遥感影像，总体土地利用" :
        option === "landuse_1-2-3" ? "遥感影像，桑基鱼塘分布" : "";
    
    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p>{intro}</p>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前年份: {year}
                <YearSlider settings={yearSliderProps} />
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} />


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


            </div>

        </div>
    );
}