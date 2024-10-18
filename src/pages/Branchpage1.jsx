import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import SelectBoxGroup from '../widgets/SelectBoxGroup.jsx';
import YearSlider from '../widgets/YearSlider.jsx';
import styles from './Branchpage1.module.css';
const Branch1Map = lazy(() => import('../maps/Branch1Map.jsx'));

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const selectinfo = [
    { value: "csj27", label: "长三角27个城市评估结果（待补充）" },
    { value: "landuse_all", label: "湖州市各行政村——土地利用情况" },
    { value: "landuse_01", label: "湖州市各行政村——耕地分布情况" },
    { value: "landuse_03", label: "湖州市各行政村——林地分布情况" },
    { value: "landuse_11", label: "湖州市各行政村——水体分布情况" },
    { value: "population", label: "湖州市各行政村——人口数量" },
    { value: "tourist", label: "湖州市各行政村——游客数量" },
    { value: "income", label: "湖州市各行政村——收入情况" },
];

const selectinfo_group = [
    {
        title: "长三角可持续评估结果", items: [
            { value: "csj0", label: "长三角27个城市评估结果" },
        ]
    },
    {
        title: "1. 经济维度", items: [
            { value: "csj27_GPI", label: "长三角 人均真实发展指数" },
            { value: "csj27_GDP", label: "长三角 人均GDP" },
        ]
    },
    {
        title: "2. 生态维度", items: [
            { value: "csj27_EF", label: "长三角 人均环境足迹" },
            { value: "csj27_ECC", label: "长三角 人均生物承载力" },
        ]
    },
    {
        title: "湖州市各行政村可持续评估结果", items: [
            { value: "total", label: "湖州市总体评估结果" },
    ] },

    {
        title: "1. 环境维度", items: [
            { value: "landuse_all", label: "湖州市 总体土地利用" },
            { value: "landuse_01", label: "湖州市 耕地分布" },
            { value: "landuse_03", label: "湖州市 林地分布" },
            { value: "landuse_11", label: "湖州市 水体分布" },
        ]
    },
    {
        title: "2. 经济维度", items: [
            { value: "tourist", label: "湖州市 游客量" },
            { value: "income", label: "湖州市 收入情况" },
        ]
    },
    {
        title: "3. 社会维度", items: [
            { value: "population", label: "湖州市 人口数量" },
            { value: "population_density", label: "湖州市 人口密度（待补充）" },
            { value: "population_growth", label: "湖州市 人口增长率（待补充）" },
        ]
    }

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
        initYear: null,
    };
    const version = useContext(VersionContext);

    return (
        <>
            {/* ====================================== Header */}
            <Header />
            <BreadCrumb />
            {/* ====================================== Intro */}
            <div className={styles.introContainer}>
                <Intro />
            </div>

            {/* =============================== Main Content */}

            <div className={styles.coreContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch1Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                <div className={styles.divider}></div>
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

export function BranchPiece1() {
    // year: 调用handleYearChange设置，只会根据用户操作改变
    //       选项改变initYear从而造成的节点值变化不会被反映到year上
    const [year, setYear] = useState(2000);
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
        endYear: 2025,
        handleYearChange: handleYearChange,
        yearNodes: [2000, 2010, 2020, 2025],
        slideStep: 1,
        initYear: null,
    };
    return (
        <>
            {/* ============================================== BreadCrumb */}
            <BreadCrumb />
            {/* ============================================== Intro */}
            <div className={styles.introContainer}>
                <Intro />
            </div>

            {/* ============================================== CORE CONTENT */}
            <div className={styles.coreContainer}>
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch1Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                <div className={styles.divider}></div>

                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <SideSpan year={year} yearProps={yearProps} option={option} setOption={setOption} />
                </div>
            </div>

        </>
    );
}


function SideSpan({ year, yearProps, option, setOption }) {
    const guide = <b><li>调整年份，展示不同年份的数据；</li>
        <li>选择不同选项，展示不同类型的数据;</li>
        <li>单击地图，可查看具体位置、范围的详细数据；</li></b>

    const option_label =
        option === "csj0" ? "长三角省市位置" :
            option === "csj27_GPI" ? "长三角 人均真实发展指数" :
            option === "csj27_GDP" ? "长三角 人均GDP" :
            option === "csj27_EF" ? "长三角 人均环境足迹" :
            option === "csj27_ECC" ? "长三角 人均生物承载力" :

        option === "total" ? "湖州市总体评估结果" :
            option === "landuse_all" ? "湖州市 总体土地利用" :
            option === "landuse_01" ? "湖州市 耕地分布" :
            option === "landuse_03" ? "湖州市 林地分布" :
            option === "landuse_11" ? "湖州市 水体分布" :
                            
            option === "population" ? "湖州市 人口数量" :
            option === "population_density" ? "湖州市 人口密度" :
            option === "population_growth" ? "湖州市 人口增长率" :

            option === "tourist" ? "湖州市 游客数量" :
            option === "income" ? "湖州市 收入情况" : "";

    const init_year =
        option === "csj0" ? 2020 :
            (option === "csj27_GPI" || option === "csj27_GDP") ? 2000 :
            ( option === "csj27_EF" || option === "csj27_ECC") ? 2005 :

        option === "total" ? 2020 :
            option.includes("landuse") ? 2019 :
                option.includes("population") ? 2020 :
                    option === "tourist" ? 2022 :
                        option === "income" ? 2019 : new Date().getFullYear();

    // showyear: year改变，以及initYear改变，都会触发showyear的更新
    const [showyear, setShowyear] = useState(null);
    // 第一个 useEffect 用于处理 year 的变化
    useEffect(() => {
        setShowyear(year);
        console.log("year changed to", year);
    }, [year]);

    // 第二个 useEffect 用于处理 init_year 的变化
    useEffect(() => {

        setShowyear(init_year);
        console.log("init_year changed to", init_year);
    }, [option]);

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>
            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前年份: {showyear}
                <YearSlider settings={{ ...yearProps, initYear: init_year }} />
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                {/* <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} /> */}
                <SelectBoxGroup list={selectinfo_group} handleSelectChange={(event) => setOption(event.target.value)} />
            </div>
        </div>

    );
}

function Intro() {
    return (
        <>
            <h2 className={styles.introTitle}>一、历史现状评估——可持续评估</h2>
            <div className={styles.introContent}>
                <p>可持续发展评估是衡量发展成效的重要指标之一。</p>
                <div className={styles.introlist}>
                    <p>1. 展示长三角27个城市的可持续发展的评估结果。指标：<ul>
                        <li><b>生物承载力(Biocapacity)：</b>生物承载力是提供可再生资源的土地面积与能吸收二氧化碳能力的土地面积之和</li>
                        <li><b>生态足迹(Ecological Footprint)：</b>生态足迹是一种评估生物承载力能力大小的方法</li>
                        <li><b>国内生产总值(Gross Domestic Product)：</b>国内生产总值是按市场价格计算的一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。</li>
                        <li><b>真实发展指数(Genuine Progress Index)：</b>真实发展指标由国际发展重新定义组织（Redefining Progress）Cobb等人于1995年提出，以衡量一个国家或地区的真实经济福利。GPI指数是对GDP的调整。</li></ul>
                        </p>
                    <p>2. 展示湖州市的可持续发展评估结果，具体到每个行政村。指标：<ul>
                        <li><b>环境维度：</b>耕地面积(Arable areas)、林地面积(Forest areas)、水体面积(Water bodies)</li>
                        <li><b>经济维度：</b>年游客数量(Tourism)、总收入水平(Total Income)</li>
                        <li><b>社会维度：</b>人口密度(Population Density)、人口增长率(Population Growth Rate)</li></ul>
                        {/* 上述指标均与可持续评估结果正相关。 */}
                    </p>
                </div>
            </div>
        </>
    );
}