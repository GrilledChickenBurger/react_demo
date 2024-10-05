import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import YearSlider from '../widgets/YearSlider.jsx';

// import SideSpan from '../structures/SideSpan.jsx';

// import CardCollection from '../structures/CardCollection.jsx';
// import Card from '../widgets/Card.jsx';

import styles from './Branchpage2.module.css';

const Branch2Map = lazy(() => import('../maps/Branch2Map.jsx'));


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
    const handleSelectChange = (event) => {
        // console.log("select value: ", event.target.value);
        setOption(event.target.value);
    }

    const [tif_opacity, setTifOpacity] = useState(1);
    const handleTifOpacityChange = (event) => {
        // console.log("tif_opacity value: ", event.target.value);
        setTifOpacity(event.target.value);
    }

    const [tif_visible, setTifVisible] = useState(true);
    const ToggleTifVisible = () => {
        setTifVisible(!tif_visible);
    }

    const [shp_opacity, setShpOpacity] = useState(0.7);
    const handleShpOpacityChange = (event) => {
        // console.log("shp_opacity value: ", event.target.value);  
        setShpOpacity(event.target.value);
    }
    const [shp_visible, setShpVisible] = useState(true);
    const ToggleShpVisible = () => {
        setShpVisible(!shp_visible);
    }

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
        slideStep:5
    };
    // useEffect(() => { 
    //     if(!year ||!option) return;
    //     viewProps = {
    //         cur_year: year,
    //         cur_option: option,
    //     };
    // }, [year, option]);

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
                    <div className={styles.sideSpanContent}>
                        <h1 className={styles.sideSpanTitle}>
                            SideSpan</h1>
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

                    </div>
                </div>
            </div>

            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer />
        </>
    );
}