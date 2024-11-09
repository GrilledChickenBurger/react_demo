import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { Card, BackTop, Divider } from 'antd';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBoxGroup from '../to_improve/SelectBoxGroup.jsx';
import SelectGroup from '../widgets/SelectGroup.jsx';
import YearSlider from '../to_improve/YearSlider.jsx';
import TimeSlider from '../widgets/TimeSlider.jsx';
import styles from './Branchpage1.module.css';
const Branch1Map = lazy(() => import('../maps/Branch1Map.jsx'));

import { VersionContext } from '../App.jsx';
import { BreadCrumb } from '../components/BreadCrumb.jsx';

const selectinfo_group = [
    {
        title: "长三角可持续评估结果", items: [
            { value: "csj27_GPI", label: "长三角 真实发展指数（人均）" },
            { value: "csj27_GDP", label: "长三角 GDP（人均）" },
            { value: "csj27_EF", label: "长三角 生态足迹（人均）" },
            { value: "csj27_ECC", label: "长三角 生物承载力（人均）" },
        ]
    },
    {
        title: "湖州市各行政村可持续评估结果", items: [
            { value: "total", label: "湖州乡村总体评估结果" },
    ] },

    {
        title: "1. 环境维度", items: [
            { value: "total1", label: "湖州乡村 环境维度评估结果" },
            { value: "landuse_all", label: "湖州乡村 土地利用" },
            { value: "landuse_01", label: "湖州乡村 耕地分布" },
            { value: "landuse_03", label: "湖州乡村 林地分布" },
            { value: "landuse_11", label: "湖州乡村 水体分布" },
        ]
    },
    {
        title: "2. 经济维度", items: [
            { value: "total2", label: "湖州乡村 经济维度评估结果" },
            { value: "tourist", label: "湖州乡村 游客量" },
            { value: "income", label: "湖州乡村 收入情况" },
        ]
    },
    {
        title: "3. 社会维度", items: [
            { value: "total3", label: "湖州乡村 社会维度评估结果" },
            { value: "population_density", label: "湖州乡村 人口密度（待补充）" },
            { value: "population_growth", label: "湖州乡村 人口增长率（待补充）" },
        ]
    }

];

const selectinfo = [
    {
        title: "长三角可持续评估结果", selectable:false, children: [
            { value: "csj27_GPI", title: "长三角 真实发展指数（人均）" },
            { value: "csj27_GDP", title: "长三角 GDP（人均）" },
            { value: "csj27_EF", title: "长三角 生态足迹（人均）" },
            { value: "csj27_ECC", title: "长三角 生物承载力（人均）" },
        ]
    },
    {
        title: "湖州乡村可持续评估结果", selectable:false, children: [
            { value: "total", title: "湖州乡村总体评估结果" },
            {
                title: "1. 环境维度", selectable:false, children: [
                    { value: "total1", title: "湖州乡村 环境维度评估结果" },
                    { value: "landuse_all", title: "湖州乡村 土地利用" },
                    { value: "landuse_01", title: "湖州乡村 耕地分布" },
                    { value: "landuse_03", title: "湖州乡村 林地分布" },
                    { value: "landuse_11", title: "湖州乡村 水体分布" },
                ]
            },
            {
                title: "2. 经济维度", selectable:false, children: [
                    { value: "total2", title: "湖州乡村 经济维度评估结果" },
                    { value: "tourist", title: "湖州乡村 游客量" },
                    { value: "income", title: "湖州乡村 收入情况" },
                ]
            },
            {
                title: "3. 社会维度", selectable:false, children: [
                    { value: "total3", title: "湖州乡村 社会维度评估结果" },
                    { value: "population_人口密", title: "湖州乡村 人口密度" },
                    { value: "population_人口增", title: "湖州乡村 人口增长率" },
                ]
            }
    ] },
];

const yearinfo = {
    'csj27_GPI': { startYear: 2000, endYear: 2018, yearNodes: [2000, 2005, 2010, 2015, 2018] },
    'csj27_GDP': { startYear: 2000, endYear: 2018, yearNodes: [2000, 2005, 2010, 2015, 2018] },
    'csj27_EF': { startYear: 2005, endYear: 2018, yearNodes: [2005, 2010, 2015, 2018] },
    'csj27_ECC': { startYear: 2005, endYear: 2018, yearNodes: [2005, 2010, 2015, 2018] },
    'total': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'total1': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'total2': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'total3': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'population_人口密': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'population_人口增': { startYear: 2020, endYear: 2020, yearNodes: [2020,] },
    'landuse_all': { startYear: 2019, endYear: 2020, yearNodes: [2019, 2020] },
    'landuse_01': { startYear: 2019, endYear: 2020, yearNodes: [2019, 2020] },
    'landuse_03': { startYear: 2019, endYear: 2020, yearNodes: [2019, 2020] },
    'landuse_11': { startYear: 2019, endYear: 2020, yearNodes: [2019, 2020] },
    'tourist': { startYear: 2022, endYear: 2023, yearNodes: [2022, 2023] },
    'income': { startYear: 2019, endYear: 2020, yearNodes: [2019, 2020] },
};


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
                        <h1 className={styles.sideSpanTitle}> </h1>
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
                {/* <div className={styles.divider}></div> */}

                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <SideSpan year={year} yearProps={yearProps} option={option} setOption={setOption} />
                </div>
            </div>

        </>
    );
}


function SideSpan({ year, yearProps, option, setOption }) {
    const guide = <>
        <li>选择“选项”，展示不同类型的数据;</li>
        <li>选择“年份”，展示不同年份的数据；</li>
        <li>单击地图，可查看具体位置、范围的详细数据。</li></>
    const guideCard = 
        <Card title="操作说明" className={styles.guideCard}
        headStyle={{
            backgroundColor:'#cbebff',
            borderBottom: '1px solid skyblue',
          }}>
        {guide}
        </Card>;
    
    const option_label =
        option === "csj0" ? "长三角省市位置" :
            option === "csj27_GPI" ? "长三角 人均真实发展指数" :
            option === "csj27_GDP" ? "长三角 人均GDP" :
            option === "csj27_EF" ? "长三角 人均环境足迹" :
            option === "csj27_ECC" ? "长三角 人均生物承载力" :

        option === "total" ? "湖州市总体评估结果" :
            option === "total1" ? "湖州市 环境维度评估结果" :
            option === "total2" ? "湖州市 经济维度评估结果" :
            option === "total3" ? "湖州市 社会维度评估结果" :

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

        option.includes("total") ? 2020 :
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
    const [slider_settings, setSliderSettings] = useState(null);
    useEffect(() => {
        if (!option) return;
        let default_inityear = yearinfo[option].startYear;
        setSliderSettings({...yearinfo[option], initYear: default_inityear});
        setShowyear(init_year);
        console.log("init_year changed to", init_year);
    }, [option]);

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>可持续评估</h1>
            {guideCard}
            <Divider />
            <div className={styles.sideSpan}>当前信息: {option_label} {showyear}年
            {/* <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} /> */}
                
            </div>

            <Card title={`当前选项：${option_label}`}>
                <SelectGroup selectinfo={selectinfo} handleSelectChange={setOption} />

            </Card>
            <Divider />
            {option.length > 0 && <>
                <Card title={`当前年份：${showyear}`}>
                {/* <YearSlider settings={{
                    ...yearProps,
                    startYear: startYear,
                    endYear: endYear,
                    yearNodes: yearNodes,
                    initYear: init_year
                }} /> */}
                <TimeSlider settings={{...yearProps,
                    ...slider_settings, option}} />

            </Card> 
            </>}

            {/* <div className={styles.sideSpan}>当前选项: {option_label}
                <SelectBox items={selectinfo} handleSelectChange={(event) => setOption(event.target.value)} />
                <SelectBoxGroup list={selectinfo_group} handleSelectChange={(event) => setOption(event.target.value)} />
                <SelectGroup selectinfo={selectinfo} handleSelectChange={setOption} />
            </div> */}

            <BackTop />
        </div>

    );
}

function Intro() {
    return (
        <>
            <h1 className={styles.introTitle}>可持续评估</h1>
            <div className={styles.introContent}>
                <p>可持续评估是地理设计的基础。</p>
                <div className={styles.introlist}>
                    <p>1. 长三角27个城市的可持续评估结果<ul>
                        <li><b>生态足迹(Ecological Footprint)：</b>衡量资源消耗和废物处理对环境造成的压力。</li>
                        <li><b>生物承载力(Biocapacity)：</b>衡量能够承受这一环境压力的生物生产性土地和海洋面积。</li>
                        <li><b>国内生产总值(Gross Domestic Product)：</b>按市场价格计算的一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。</li>
                        <li><b>真实发展指数(Genuine Progress Index)：</b>衡量经济活动所带来的经济福利，实质上是在 GDP 的基础上加入被忽略的正向因素，并扣除负向因素。</li></ul>
                        </p>
                    <p>2. 湖州乡村的可持续评估结果<ul>
                        <li><b>环境维度：</b>耕地面积(Arable areas)、林地面积(Forest areas)、水域面积(Water areas)</li>
                        <li><b>经济维度：</b>游客量(Tourism)、总收入(Total Income)</li>
                        <li><b>社会维度：</b>人口密度(Population Density)、人口增长率(Population Growth Rate)</li></ul>
                        {/* 上述指标均与可持续评估结果正相关。 */}
                    </p>
                </div>
            </div>
        </>
    );
}