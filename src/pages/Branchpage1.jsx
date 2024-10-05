import React, { useContext, useState, lazy, Suspense } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import YearSlider from '../widgets/YearSlider.jsx';
import styles from './Branchpage1.module.css';
const Branch1Map = lazy(() => import('../maps/Branch1Map.jsx'));

import { VersionContext } from '../App.jsx';

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
        slideStep: 1,
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
                        <Branch1Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    {/* <div className={styles.sideSpanContent}>
                        <h1 className={styles.sideSpanTitle}>操作台</h1>
                        <p></p>
                        <div className={styles.sideSpan}>当前年份: {year}
                            <YearSlider settings={yearProps} />
                            
                        </div>
                        <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }}/>
                        <div className={styles.sideSpan}>当前选项: {option}
                            <SelectBox items={selectinfo} handleSelectChange={handleSelect} />
                        </div>
                        

                    </div> */}
                    <SideSpan year={year} yearProps={yearProps} option={option} setOption={setOption} />
                </div>
            </div>

            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer version={version} />
        </>
    );
}

function SideSpan({ year, yearProps, option, setOption }) {
    const intro = "1) 展示长三角27个城市的各指标评估结果；"
    const intro2 = "2) 展示湖州市各行政村的人口、游客量、收入、耕地、林地等数据，均与可持续评估结果正相关。"
    const guide = <b><li>调整年份，展示不同年份的数据；</li>
        <li>选择不同选项，展示不同类型的数据;</li>
        <li>单击地图，可查看具体位置、范围的详细数据；</li></b>

    const option_label = option === "landuse_all" ? "湖州市 总体土地利用" :
            option === "landuse_01" ? "湖州市 耕地分布" :
            option === "landuse_03" ? "湖州市 林地分布" :
            option === "landuse_11" ? "湖州市 水体分布" :
            option === "population" ? "湖州市 人口分布" :
            option === "tourist" ? "湖州市 游客数量" :
            option === "income" ? "湖州市 收入情况" :"";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p>{intro}<br />{intro2}</p>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前年份: {year}
                <YearSlider settings={yearProps} />
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} />
            </div>
        </div>

    );
}