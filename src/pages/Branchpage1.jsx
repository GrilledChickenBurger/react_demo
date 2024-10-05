import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import YearSlider from '../widgets/YearSlider.jsx';

// import SideSpan from '../structures/SideSpan.jsx';

// import CardCollection from '../structures/CardCollection.jsx';
// import Card from '../widgets/Card.jsx';

import styles from './Branchpage1.module.css';

const Branch1Map = lazy(() => import('../maps/Branch1Map.jsx'));


const selectinfo = [
    { value: "landuse_all", label: "湖州市各行政村——土地利用情况" },
    { value: "landuse_01", label: "湖州市各行政村——耕地分布情况" },
    { value: "landuse_03", label: "湖州市各行政村——林地分布情况" },
    { value: "landuse_11", label: "湖州市各行政村——水体分布情况" },
    { value: "population", label: "湖州市各行政村——人口数量" },
    { value: "tourist", label: "湖州市各行政村——游客数量" },
    { value: "income", label: "湖州市各行政村——收入情况" },
];


export default function BranchPage1() {


    const [year, setYear] = useState(new Date().getFullYear());
    const handleYearChange = (value) => {
        // console.log("year value: ", event.target.value);
        setYear(value);
    }

    const [option, setOption] = useState('');
    const handleSelect = (event) => {
        // console.log("select value: ", event.target.value);
        setOption(event.target.value);
    }

    const mapProps = {
        basemap: 'osm',
        center: [120.3, 30.7],
        zoom: 12,
    };
    const viewProps = {
        cur_year: year,
        cur_option: option,
    };
    const yearProps = {
        startYear: 2000,
        endYear: 2020,
        handleYearChange: handleYearChange,
        slideStep:1,
    };

    return (
        <>
            {/* ====================================== Header */}
            <Header />

            {/* =============================== Main Content */}

            <div className={styles.allContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch1Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <div className={styles.sideSpanContent}>
                        <h1 className={styles.sideSpanTitle}>
                            操作台</h1>
                        <div className={styles.sideSpan}>当前年份: {year}
                            <YearSlider settings={yearProps} />
                            
                        </div>
                        <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }}/>
                        <div className={styles.sideSpan}>Current option: {option}
                            <SelectBox items={selectinfo} handleSelectChange={handleSelect} />
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
