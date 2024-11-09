import React, {
    useContext, useState,
    lazy, Suspense,
    useEffect, useRef
} from 'react';
import { Card, Divider, Modal, Button } from 'antd';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import styles from './Branchpage4.module.css';
const Branch4Map = lazy(() => import('../maps/Branch4Map.jsx'));

import { VersionContext } from "../App.jsx";
import { BreadCrumb } from '../components/BreadCrumb.jsx';
import GroupColumnChart from '../widgets/GroupColumnChart.jsx';
import {generateRandomString} from '../utils/utils.jsx';

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

    const otherProps = {
        setResult: setResult,
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
                    <Branch4Map mapProps={mapProps} viewProps={viewProps} otherProps={otherProps} />
                </Suspense>
            </div>
            {/* ======================================================== */}
            <div className={styles.sideSpanContainer}>
                <SideSpan result={result}
                    res_visible={res_visible} setResVisible={setResVisible}
                    />
            </div>
        </div>
    </>)
}

function SideSpan({result, res_visible, setResVisible }) {    
    const intro = <>
        <b>选择不同选项，展示不同服务。<br />
            单击地图，可查看具体位置的详细数据。</b>
    </>;
    const guide = <>
        <li><b>左上：</b>2015年南浔区景观格局；</li>
        <li><b>左下：</b>2015年南浔区生态系统服务；</li>
        <li><b>右上：</b>2019年南浔区景观格局；</li>
        <li><b>右下：</b>2019年南浔区生态系统服务。</li></>
    const guideCard = 
        <Card title="操作说明" className={styles.guideCard}
            headStyle={{
                backgroundColor:'#cbebff',
                borderBottom: '1px solid skyblue',
              }}>
            
            {guide}
        </Card>;
    
    const [chart, setChart] = useState(null);    
    const [loading, setLoading] = useState(false); // 用于管理加载状态
    const [failed, setFailed] = useState(false); // 是否加载失败
    const [count, setCount] = useState(-1);

    const [btn, setBtn] = useState(null); 
    const [modal, setModal] = useState(null);  

    const resultRef = useRef(result);
    const intervalRef = useRef(null);
    useEffect(() => {
        resultRef.current = result; // 每次 result 更新时更新 ref 的值
    }, [result]);

    useEffect(() => { 
        return () => {
            clearInterval(intervalRef.current);
        }
    }, []);
    
    useEffect(() => {
        if (count == 0) {
            console.log('count = 0, start new interval');
            resultRef.current = null;
            setChart(null);
            setFailed(false);
            setResVisible(generateRandomString(20));
            intervalRef.current = setInterval(() => {
                setCount(precount => precount + 1);
            }, 1000);
        }

        if (resultRef.current && resultRef.current.x_data &&
            resultRef.current.x_data.data.length > 0) {
            console.log("Analysis Success");
            setChart(<>
                <GroupColumnChart settings={resultRef.current} />
            </>);
            setLoading(false);
            setFailed(false);
            clearInterval(intervalRef.current);
            
        }
        else if (count >= 15) {
            console.log("Analysis Failed");
            setLoading(false);
            setFailed(true);
            setResVisible(false);
            clearInterval(intervalRef.current);
        }
        else if (count >= 0) {
            setLoading(true);
            console.log(`Analysis ${count}s ...`);
        }

    }, [count]);

    const Analysis = () => {
        console.log("Analysis Start");
        setLoading(false);
        
        // 发送请求
        setLoading(true);
        setCount(0);
    };

    useEffect(() => { 
        if (failed) {
            setModal(null);
            setBtn(<Button type="primary"
                onClick={Analysis}
                className={styles.failedBtn}
                loading={loading}>分析失败，请重试</Button>);
        }
        else if (chart && !failed) {
            setModal(<>
                <div className={styles.cardContent}>
                    <ChartModal chart_lu={chart} chart2={null} result={result} />
                </div>
            </>);
            setBtn(<Button type="primary"
                onClick={Analysis}
                className={styles.successBtn}
                loading={loading}>已完成，重新分析</Button>);  
        }
        else {
            setModal(null);
            setBtn(<Button type="primary"
                onClick={Analysis}
                className={styles.initBtn}
                loading={loading}>开始分析</Button>);
        }

    }, [loading, failed, chart]);

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>格局-服务-福祉的关系分析</h1>
            <p>{guideCard}</p>
            <Divider />

            <div className={styles.sideSpan}>
                <Card title="关系分析" className={styles.card}>
                    <div className={styles.cardContent}>
                        {btn}
                    </div>

                    {modal}
                </Card>
                {/* {res_visible && <div className={styles.resultContainer}>
                    {chart}
                </div>} */}
            </div>
            <Divider />
        </div>
    );
}

function ChartModal({chart_lu, chart2, result}) {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    const result_info = useRef(result);
    useEffect(() => { 
        result_info.current = result;
    }, [result]);

    function getLUChange(){ 
        if (!result_info.current || !result_info.current.x_data.data.length > 0) return;
        let data15 = result_info.current.y_data.data.filter((item) => item.name == '2015').map((item) => item.data).flat();
        let data19 = result_info.current.y_data.data.filter((item) => item.name == '2019').map((item) => item.data).flat();
        // console.log(data15, data19);
        let lu_change = result_info.current.x_data.data.map((item, index) => {
            let lu15 = data15[index];
            let lu19 = data19[index];
            return {
                name: item, change: lu19 - lu15,
                lu15: lu15, lu19: lu19,
                isincrease: lu19 > lu15
            };
        });
        return lu_change;
    }


    const lu_intro = <>
        <h2>15-19年LU的变化趋势</h2>
        <li>面积增加的土地利用类型：{getLUChange() && getLUChange().filter((item) => item.change > 0).map((item) => item.name).join('、')}</li>
        <li>面积减少的土地利用类型：{getLUChange() && getLUChange().filter((item) => item.change < 0).map((item) => item.name).join('、')}</li>
    </>
    return (
        <>
        <Button type="primary" onClick={showModal}>查看统计结果</Button>
        <Modal
            title="格局-服务-福祉关系分析"
            open={visible}
            closable={false}
                footer={null}
                width={"50%"}
        >
                {lu_intro}
                {chart_lu}
            <div className={styles.infoConfirmContainer}>
                <button className={styles.infoConfirmButton} onClick={closeModal}>
                    确认
                </button>
            </div>
        </Modal>
        </>);
}

function Intro() {
    return (
        <>
            <h1 className={styles.introTitle}>格局-服务-福祉的关系分析</h1>
            <div className={styles.introContent}>
                <p>景观格局的改变会导致生态系统服务的变化，并通过这些变化进一步影响城乡居民的福祉。</p>
                <p>在桑基鱼塘景观中，近年来随着桑园面积的减少和鱼塘面积的增加，供给、调节等生态系统服务也发生了相应的变化，从而影响了当地及周边城乡居民的福祉。</p>
                <div className={styles.introlist} >
                    <p>1. <b>上图：</b>湖州南浔桑基鱼塘景观的空间格局</p>
                    <p>2. <b>下图：</b>湖州南浔桑基鱼塘景观的生态系统服务</p>
                </div>
            </div>
        </>
    );
}