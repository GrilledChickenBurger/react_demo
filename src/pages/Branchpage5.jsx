import React, { useContext, useState, lazy, Suspense, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { Modal, Table } from 'antd';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SelectBox from '../widgets/SelectBox.jsx';
import styles from './Branchpage5.module.css';
const Branch5Map = lazy(() => import('../maps/Branch5Map.jsx'));

import { VersionContext } from "../App.jsx";
import { BreadCrumb } from '../components/BreadCrumb.jsx';


const base_info = [
    { value: "base", label: "基线" },
    { value: "farmer", label: "农民" },
    { value: "enterprise", label: "企业" },
    { value: "tourist", label: "游客" },
];




export default function BranchPage5() {
    const [cur_option, setCurOption] = useState('');

    const mapProps = {
        basemap: 'osm',
        center: [120.288, 30.744],
        zoom: 11,
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
                        <Branch5Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                {/* ======================================================== */}
                <div className={styles.sideSpanContainer}>
                    <SideSpan cur_option={cur_option} setCurOption={setCurOption} />
                </div>
            </div>
            {/* ======================================== Footer */}
            {/* <Card /> */}
            <Footer version={version} />
        </>
    );
}

export function BranchPiece5() {
    const [step, setStep] = useState(1);
    const [cur_option, setCurOption] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingSecond, setLoadingSecond] = useState(false);
    const [issuccess, setIssuccess] = useState(false);

    const startPreRun = () => {
        setIssuccess(false);
        setLoading(true);
        // 执行开始模拟的逻辑
        let countdown = 3;  // 设置倒计时初始值为3
        setLoadingSecond(countdown);
        const timer = setInterval(() => {
            countdown--;
            setLoadingSecond(countdown);

            if (countdown <= 0) {
                clearInterval(timer);
                setIssuccess(true); // 倒计时结束，设置 isSuccess 为 true

                // 在倒计时结束2秒后更新 step 和 loading
                setTimeout(() => {
                    setStep(2);
                    setLoading(false);
                }, 2000);
            }
        }, 1000); //倒计时每秒执行一次
        // setTimeout(() => {
        //     // navigate("/test/branch5/formal_simulation");
        //     setStep(2);
        //     setLoading(false);
        // }, 3000);
    };

    const startFormalRun = () => {
        // 此处无需确认option，因为该函数外面已经确认过一次
        // 在此处确认反而会报错，可能是因为cur_option的初始化是null
        setIssuccess(false);
        setLoading(true);
        // 执行开始模拟的逻辑
        let countdown = 3;  // 设置倒计时初始值为3
        setLoadingSecond(countdown);
        const timer = setInterval(() => {
            countdown--;
            setLoadingSecond(countdown);

            if (countdown <= 0) {
                clearInterval(timer);
                setIssuccess(true); // 倒计时结束，设置 isSuccess 为 true
                        // 在倒计时结束2秒后更新 step 和 loading
                setTimeout(() => {
                    setStep(3);
                    setLoading(false);
                }, 2000);  
            }
        }, 1000); //倒计时每秒执行一次

       
        
    };

    const returnStep2 = () => {
        setIssuccess(false);
        setLoading(true);
        // 执行开始模拟的逻辑
        let countdown = 3;  // 设置倒计时初始值为3
        setLoadingSecond(countdown);
        const timer = setInterval(() => {
            countdown--;
            setLoadingSecond(countdown);

            if (countdown <= 0) {
                clearInterval(timer);
                setIssuccess(true); // 倒计时结束，设置 isSuccess 为 true

                // 在倒计时结束2秒后更新 step 和 loading
                setTimeout(() => {
                    setStep(2);
                    setLoading(false);
                }, 2000);
            }
        }, 1000); //倒计时每秒执行一次
    }

    const [sidespan, setSidespan] = useState(null);
    const [stepbar, setStepbar] = useState(null);
    const [option, setOption] = useState('base');
    const [successInfo, setSuccessInfo] = useState(null);

    useEffect(() => {
        if (step === 1) {
            setSidespan(<SideSpan startPreRun={startPreRun} />);
            setStepbar(<h2>步骤一、预模拟</h2>);
            setOption('base');
            setSuccessInfo(<>
                <p>2019年模拟结果已生成，请查看右侧结果展示。</p>
                <p>精度达到0.85，预模拟成功！请进行正式模拟。</p>
            </>);
        }
        else if (step === 2) {
            setSidespan(<SideSpan2 cur_option={cur_option} setCurOption={setCurOption}
                startFormalRun={startFormalRun} />);
            setStepbar(<h2>步骤二、正式模拟</h2>);
            setOption('base');
            setSuccessInfo(<>
                <p>2035年模拟结果已生成，请查看右侧结果展示。</p>
            </>);
        }
        else if (step === 3) {
            setSidespan(<SideSpan3 cur_option={cur_option} returnStep2={returnStep2} />);
            setStepbar(<h2>步骤三、结果展示</h2>);
            setOption(cur_option);
            setSuccessInfo(<>
                <p>成功回退到正式模拟前，您可以重新选择主体选项。</p>
            </>);
        }
    }, [step]);

    const mapProps = {
        basemap: 'osm',
        center: [120.288, 30.744],
        zoom: 11,
    };
    const viewProps = {
        step: step,
        cur_option: option,
    };

    return (<>
        {/* ============================================== BreadCrumb */}
        <BreadCrumb />
        {/* ============================================== Intro */}
        <div className={styles.introContainer}>
            <Intro />
        </div>
        {/* =============================== Main Content */}
        <div className={styles.coreplusContainer}>
            <div className={styles.stepContainer}>
                {stepbar}
            </div>
            <div className={styles.coreContainer}>
                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.loadingText}>
                            {(issuccess) ?
                                successInfo :
                                `正在模拟，请稍后...${loadingSecond}`}
                        </div>
                    </div>
                )}
                <div className={styles.mapContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Branch5Map mapProps={mapProps} viewProps={viewProps} />
                    </Suspense>
                </div>
                <div className={styles.sideSpanContainer}>
                    {sidespan}
                </div>
            </div>
            {/* <Outlet /> */}
        </div>
    </>);
}


function SideSpan({ startPreRun, }) {
    const [modal_visible, setFinalModal1Visible] = useState(false);
    const handleOk = () => {
        setFinalModal1Visible(false);
        startPreRun();
    };
    const handleCancel = () => {
        setFinalModal1Visible(false);
    };

    const guide = <>
        <b>
            <li>左：2015年南浔区土地利用；</li>
            <li>右：南浔区的生态红线及永农保护片块；</li>
            <li>单击地图，可查看具体位置的详细数据。</li>
        </b></>
    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>

            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前设置:
                <div className={styles.paramSettingContainer}>
                    <div className={styles.checkboxContainer}>
                        <p>生态红线：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <p>永农保护片块：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Neighbor factor：默认</p>
                    <NeighborhoodFactorModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Converting cost：默认</p>
                    <ConvertingCostModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>土地需求量：默认</p>
                    <LandUseModal year='2019' option='base' />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>LU转移矩阵：待计算，预模拟后显示。</p>
                </div>
                <button className={styles.finalButton}
                    onClick={() => { setFinalModal1Visible(true); }}>
                    预模拟，验证参数
                </button>
                <FinalModal1
                    modal_visible={modal_visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel} />
            </div>


        </div>
    );
}

function SideSpan2({ cur_option, setCurOption, startFormalRun }) {
    const [modal_visible, setFinalModal2Visible] = useState(false);
    const handleOk = () => {
        setFinalModal2Visible(false);
        startFormalRun();
    };
    const handleCancel = () => {
        setFinalModal2Visible(false);
    };

    const guide = <>
        <b>
            <li>左：2019年南浔真实土地利用情况；</li>
            <li>右：2019年南浔模拟土地利用结果；</li>
            <li>单击地图，可查看具体位置的详细数据。</li>
        </b></>
    const [tmp_option, setTmpOption] = useState(cur_option);
    const handleSelectChange = (event) => {
        setTmpOption(event.target.value);
        setCurOption(event.target.value);
    };
    useEffect(() => {
        console.log("option changed", tmp_option);
        // setTmpOption(cur_option);
    }, [tmp_option]);

    const option_label =
        tmp_option === "base" ? "基线" :
            tmp_option === "farmer" ? "农民" :
                tmp_option === "enterprise" ? "企业" :
                    tmp_option === "tourist" ? "游客" : "";

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>

            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                <div className={styles.paramSettingContainer}>
                    <p>主导者：</p>
                    <SelectBox items={base_info} handleSelectChange={handleSelectChange} />
                </div>
                <div className={styles.paramSettingContainer}>
                    <div className={styles.checkboxContainer}>
                        <p>生态红线：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <p>永农保护片块：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Neighbor factor：默认</p>
                    <NeighborhoodFactorModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Converting cost：默认</p>
                    <ConvertingCostModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>土地需求量：{option_label} 建议值</p>
                    <LandUseModal year='2035' option={tmp_option} />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>LU转移矩阵：{tmp_option !== "base" ? `基于${option_label} 调整` : "基线"}</p>
                    <TransformationModal option={tmp_option} />
                </div>
                <button style={{ backgroundColor: "green", color: "white", borderRadius: "5px", width: "100%" }}
                    onClick={() => {
                        (tmp_option) ? setFinalModal2Visible(true) : alert("请选择主导者！");
                    }}>
                    开始正式模拟</button>
                <FinalModal2
                    modal_visible={modal_visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    option={tmp_option} />
            </div>
        </div>
    );
}

function SideSpan3({ cur_option, returnStep2 }) {
    const [modal_visible, setFinalModal3Visible] = useState(false);
    const handleOk = () => {
        setFinalModal3Visible(false);
        returnStep2();
    };
    const handleCancel = () => {
        setFinalModal3Visible(false);
    };

    const option_label =
        cur_option === "base" ? "基线" :
            cur_option === "farmer" ? "农民" :
                cur_option === "enterprise" ? "企业" :
                    cur_option === "tourist" ? "游客" : "";
    
    const cur_base_info = [base_info.find(item => item.value === cur_option),];
    
    const guide = <>
        <b>
            <li>左：2019年南浔真实土地利用情况；</li>
            <li>右：2035年南浔模拟土地利用结果：
                {cur_option !== "base" ? `基于${option_label} 调整` : "基线"}。</li>
            <li>单击地图，可查看具体位置的详细数据。</li>
        </b></>

    return (
        <div className={styles.sideSpanContent}>
            <h1 className={styles.sideSpanTitle}>操作台</h1>

            <p style={{ marginTop: "0" }}>{guide}</p>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />

            <div className={styles.sideSpan}>当前选项: {option_label}
                <div className={styles.paramSettingContainer}>
                    <p>主导者：</p>
                    <SelectBox items={cur_base_info} usePlaceholder={false} />
                </div>
                <div className={styles.paramSettingContainer}>
                    <div className={styles.checkboxContainer}>
                        <p>生态红线：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <p>永农保护片块：</p>
                        <input type="checkbox" checked={true} disabled />
                        <label style={{ fontSize: "small", fontWeight: "lighter" }}>设置</label>
                    </div>
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Neighbor factor：默认</p>
                    <NeighborhoodFactorModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>Converting cost：默认</p>
                    <ConvertingCostModal />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>土地需求量：{option_label} 建议值</p>
                    <LandUseModal year='2035' option={cur_option} />
                </div>
                <div className={styles.paramSettingContainer}>
                    <p>LU转移矩阵：{cur_option !== "base" ? `基于${option_label} 调整` : "基线"}</p>
                    <TransformationModal option={cur_option} />
                </div>
                <EnergyModal option = {cur_option} />
                <button style={{ backgroundColor: "green", color: "white", borderRadius: "5px", width: "100%" }}
                    onClick={() => setFinalModal3Visible(true)}>返回正式模拟</button>
                <FinalModal3
                    modal_visible={modal_visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    option={cur_option} />
            </div>


        </div>
    );
}


function FinalModal1({ modal_visible, handleOk, handleCancel, }) {
    const title = "确认预训练参数设置";
    return (<>
        <Modal
            title={title}
            open={modal_visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"60%"}
        >
            <h2 style={{ marginBottom: "20px" }}>请再次确认输入参数：</h2>
            <div className={styles.finalModal}>
                <p className={styles.finalModalItemTitle}><b>生态红线、永农保护片块：</b>默认值，不可修改。</p>
                <hr style={{
                    width: "100%", height: "1px", backgroundColor: "gray",
                    marginTop: "5px" , marginBottom: "20px"
                }} />

                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>Neighbor factor：</b>默认值，不可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <NeighborhoodFactorData />
                    </div>
                    <hr style={{
                        width: "100%", height: "1px", backgroundColor: "gray",
                        margin: "20px 0"
                    }} />
                </div>
                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>Converting cost：</b>默认值，不可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <ConvertingCostData />
                    </div>
                    <hr style={{ width: "100%", height: "1px", backgroundColor: "gray", margin: "20px 0" }} />

                </div>
                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>土地需求量：</b>默认值（基线），不可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <LandUseData year='2019' option='base' />
                    </div>
                    
                </div>
            </div>

        </Modal>
    </>);
}

function FinalModal2({ modal_visible, handleOk, handleCancel, option}) {
    const title = "确认正式训练参数设置";
    const option_label =
    option === "base" ? "基线" :
        option === "farmer" ? "农民" :
            option === "enterprise" ? "企业" :
                option === "tourist" ? "游客" : "";
    return (<>
        <Modal
            title={title}
            open={modal_visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"60%"}
        >
            <h2 style={{ marginBottom: "20px" }}>请再次确认输入参数：</h2>
            <div className={styles.finalModal}>
                <p className={styles.finalModalItemTitle}><b>生态红线、永农保护片块：</b>默认值，不可修改。</p>
                <hr style={{
                    width: "100%", height: "1px", backgroundColor: "gray",
                    marginTop: "5px" , marginBottom: "20px"
                }} />

                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>Neighbor factor：</b>默认值，不可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <NeighborhoodFactorData />
                    </div>
                    <hr style={{
                        width: "100%", height: "1px", backgroundColor: "gray",
                        margin: "20px 0"
                    }} />
                </div>
                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>Converting cost：</b>默认值，不可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <ConvertingCostData />
                    </div>
                    <hr style={{ width: "100%", height: "1px", backgroundColor: "gray", margin: "20px 0" }} />

                </div>
                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>土地需求量：</b>{ option_label }建议值，可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <LandUseData year='2035' option={option} />
                    </div>
                    <hr style={{ width: "100%", height: "1px", backgroundColor: "gray", margin: "20px 0" }} />

                </div>
                <div className={styles.finalModalItem}>
                    <p className={styles.finalModalItemTitle}><b>LU转移矩阵：</b>
                        { option !== "base" ? `基于${option_label} 调整` : "基线"}，可修改。</p>
                    <div className={styles.finalModalItemContent}>
                        <TransformationData option={option} />
                    </div>
                </div>
            </div>
        </Modal>
    </>);
}

function FinalModal3({ modal_visible, handleOk, handleCancel, option }) { 
    const option_label =
    option === "base" ? "基线" :
        option === "farmer" ? "农民" :
            option === "enterprise" ? "企业" :
                    option === "tourist" ? "游客" : "";
    const title = "确认返回";
    return (<>
        <Modal
            title={title}
            open={modal_visible}
            onOk={handleOk}
            onCancel={handleCancel}

        >
            <h2 style={{ marginBottom: "20px" }}>是否返回到上一步？</h2>
            <p>当前选项：{option_label}</p>
        </Modal>
    </>);    

}

function Intro() {
    return (
        <>
            <h2 className={styles.introTitle}>五、空间优化：预测未来的土地利用情况</h2>
            <div className={styles.introContent}>
                <p>给定空间范围和主体，输入 Neighborhood factor 和 Converting cost 等一系列参数，模拟未来基于该主体的土地利用情况。</p>
                <p>湖州市南浔区是桑基鱼塘的保护区所在地之一，对比其不同主体主导的土地利用情况，可以更加直观地分析每类主体对桑基鱼塘系统的影响方向、以及影响程度。</p>
                <div className={styles.introlist} >
                    <p><b>第一步：</b>根据2010、2015年土地利用数据模拟2019年数据，验证输入参数的有效性。
                        <b>与2019年真实值比较，精度达标后，将进入正式模拟。</b></p>
                    <p><b>第二步：</b>确定主体/利益相关者，开始正式模拟。不同的主体对土地利用的需求不同，因此未来的土地利用将根据主体的需求，朝着不同的方向发展。
                        <b>主体：</b>农民、企业、游客；</p>
                    <p><b>第三步：</b>输出模拟结果。若还希望对模拟结果进行调整，可返回第二步重新模拟。</p>
                </div>
            </div>
        </>
    );
}


function NeighborhoodFactorData() {
    const tableData = [
        { LU: "桑园", factor: 1 },
        { LU: "鱼塘", factor: 0.52 },
        { LU: "水田", factor: 0 },
        { LU: "建设用地", factor: 0.75 },
        { LU: "其他农业用地", factor: 0.51 },
        { LU: "未利用土地", factor: 0.56 },
    ];
    const columns = [
        { title: '土地利用类型', dataIndex: 'LU', key: 'LU', },
        { title: '邻近系数', dataIndex: 'factor', key: 'factor', },
    ];

    return (
        <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            size="small"
            width={"50%"}
        />
    );
}

function NeighborhoodFactorModal() {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const intro = <>
        <h2>邻近系数（Neighborhood factor）</h2>
        <p>邻近系数代表了某些土地利用类型向其他土地类型扩展的能力。该因子的范围设置为0-1：
            <b>该值越接近1，该土地利用类型的扩张能力就越强</b>（Liang等人，2021）。</p>
        <p>在前期研究的基础上，结合研究区的特点，鱼塘、桑园、水田、建设土地、其他农业用地、未利用土地的分配值分别为：<b>1、0.52、0、0.75、0.51和0.56</b>（Wang等人，2019）。</p>
        <p><b>具体的邻近系数设置表格如下：</b></p>
    </>

    return (
        <>
            <span className={styles.infoOpenButton} onClick={showModal}>(查看详细设置)</span>
            <Modal
                title="Neighbor factor 详细设置信息"
                open={visible}
                closable={false}
                footer={null}
            >
                {intro}
                <NeighborhoodFactorData />
                <div className={styles.infoConfirmContainer}>
                    <button className={styles.infoConfirmButton} onClick={closeModal}>
                        确认
                    </button>
                </div>
            </Modal>
        </>

    );
}


function ConvertingCostData() {
    const tableData = [
        { LU: "桑园", cost1: null, cost2: 1, cost3: 1, cost4: 1, cost5: 1, cost6: 1 },
        { LU: "鱼塘", cost1: 1, cost2: null, cost3: 1, cost4: 1, cost5: 1, cost6: 1 },
        { LU: "水田", cost1: 1, cost2: 1, cost3: null, cost4: 1, cost5: 1, cost6: 1 },
        { LU: "建设用地", cost1: 0, cost2: 0, cost3: 0, cost4: null, cost5: 0, cost6: 0 },
        { LU: "其他农业用地", cost1: 1, cost2: 1, cost3: 1, cost4: 1, cost5: null, cost6: 1 },
        { LU: "未利用土地", cost1: 1, cost2: 1, cost3: 1, cost4: 1, cost5: 1, cost6: null },
    ];
    const columns = [
        { title: '土地利用类型', dataIndex: 'LU', key: 'LU', },
        { title: '桑园', dataIndex: 'cost1', key: 'cost1', },
        { title: '鱼塘', dataIndex: 'cost2', key: 'cost2', },
        { title: '水田', dataIndex: 'cost3', key: 'cost3', },
        { title: '建设用地', dataIndex: 'cost4', key: 'cost4', },
        { title: '其他农业用地', dataIndex: 'cost5', key: 'cost5', },
        { title: '未利用土地', dataIndex: 'cost6', key: 'cost6', },
    ];

    return (
        <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            size="small"
            style={{ width: "100%" }}
        />
    );
}

function ConvertingCostModal() {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const intro = <>
        <h2>转化成本（Converting cost）</h2>
        <p>转换成本矩阵表示每个区域中的类是否可以相互转换，<b>1表示可以转换，0表示不能转换。</b></p>
        <p>随着社会经济和科学技术的发展，建设用地不太可能转换为其他土地类型。因此，<b>规定建设用地不得转为其他土地类别。</b></p>
        <p>此外，政府提出的<b>永久性基本农田和生态保护红线</b>被设置为限制区，限制区内的土地利用类型不得转为其他类别。</p>
        <p>因此，<b>具体的转换成本矩阵为：</b></p>
    </>

    return (
        <>
            <span className={styles.infoOpenButton} onClick={showModal}>(查看详细设置)</span>
            <Modal
                title="Converting cost 详细设置信息"
                open={visible}
                closable={false}
                footer={null}
                width={"60%"}
            >
                {intro}
                <ConvertingCostData />
                <div className={styles.infoConfirmContainer}>
                    <button className={styles.infoConfirmButton} onClick={closeModal}>
                        确认
                    </button>
                </div>
            </Modal>
        </>

    );
}


function LandUseData({ year, option }) {
    const land_use = {
        '2019base': [16787.34, 8794.8, 15185.07, 16455.96, 4385.43, 8617.05],
        '2035base': [87538, 253754, 87626, 215883, 38265, 97219],
        '2035farmer': [93351, 243528, 96501, 209428, 40141, 97336],
        '2035enterprise': [97830, 228271, 106129, 211981, 39773, 96301],
        '2035tourist': [94759, 225023, 104210, 229494, 39498, 87301],
    };
    const tableData2019_base = [
        { LU: "桑园", factor: land_use['2019base'][0] },
        { LU: "鱼塘", factor: land_use['2019base'][1] },
        { LU: "水田", factor: land_use['2019base'][2] },
        { LU: "建设用地", factor: land_use['2019base'][3] },
        { LU: "其他农业用地", factor: land_use['2019base'][4] },
        { LU: "未利用土地", factor: land_use['2019base'][5] },
    ];

    const tableData2035_base = [
        { LU: "桑园", factor: land_use['2035base'][0] },
        { LU: "鱼塘", factor: land_use['2035base'][1] },
        { LU: "水田", factor: land_use['2035base'][2] },
        { LU: "建设用地", factor: land_use['2035base'][3] },
        { LU: "其他农业用地", factor: land_use['2035base'][4] },
        { LU: "未利用土地", factor: land_use['2035base'][5] },
    ];
    const tableData2035_farmer = [
        { LU: "桑园", factor: land_use['2035farmer'][0] },
        { LU: "鱼塘", factor: land_use['2035farmer'][1] },
        { LU: "水田", factor: land_use['2035farmer'][2] },
        { LU: "建设用地", factor: land_use['2035farmer'][3] },
        { LU: "其他农业用地", factor: land_use['2035farmer'][4] },
        { LU: "未利用土地", factor: land_use['2035farmer'][5] },
    ];
    const tableData2035_enterprise = [
        { LU: "桑园", factor: land_use['2035enterprise'][0] },
        { LU: "鱼塘", factor: land_use['2035enterprise'][1] },
        { LU: "水田", factor: land_use['2035enterprise'][2] },
        { LU: "建设用地", factor: land_use['2035enterprise'][3] },
        { LU: "其他农业用地", factor: land_use['2035enterprise'][4] },
        { LU: "未利用土地", factor: land_use['2035enterprise'][5] },
    ];
    const tableData2035_tourist = [
        { LU: "桑园", factor: land_use['2035tourist'][0] },
        { LU: "鱼塘", factor: land_use['2035tourist'][1] },
        { LU: "水田", factor: land_use['2035tourist'][2] },
        { LU: "建设用地", factor: land_use['2035tourist'][3] },
        { LU: "其他农业用地", factor: land_use['2035tourist'][4] },
        { LU: "未利用土地", factor: land_use['2035tourist'][5] },
    ];

    const columns = [
        { title: '土地利用类型', dataIndex: 'LU', key: 'LU', },
        { title: '土地需求量(单位：万亩)', dataIndex: 'factor', key: 'factor', },
    ];

    let data; let tgt;
    if (year === "2019") {
        data = tableData2019_base;
        tgt = <>根据2015年的数据，预测2019年的<b>基线</b>土地利用情况</>;
    } else if (year === "2035") {
        if (option === "base") {
            data = tableData2035_base;
            tgt = <>根据2019年的数据，预测2035年的<b>基线</b>土地利用情况</>;
        } else if (option === "farmer") {
            data = tableData2035_farmer;
            tgt = <>根据2019年的数据，预测2035年的<b>以农民为主体的</b>土地利用情况</>;
        } else if (option === "enterprise") {
            data = tableData2035_enterprise;
            tgt = <>根据2019年的数据，预测2035年的<b>以企业为主体的</b>土地利用情况</>;
        } else if (option === "tourist") {
            data = tableData2035_tourist;
            tgt = <>根据2019年的数据，预测2035年的<b>以游客为主体的</b>土地利用情况</>;
        }
    }

    return (
        <>
            <p><b>当前目标：</b>{tgt}，具体的土地需求量如下：</p>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                size="small"
                width={"50%"}
            />
        </>

    );

}

function LandUseModal({ year, option }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    const intro = <>
        <h2>土地需求量（Predicted land use）</h2>
        <p>土地需求量代表了某一时期土地利用总量，<b>该值越大，土地利用总量越大。</b></p>
        <p>预测未来的土地利用情况，需要考虑到将来的土地需求量。</p>
    </>

    return (
        <>
            <span className={styles.infoOpenButton} onClick={showModal}>(查看详细设置)</span>
            <Modal
                title="土地需求量 详细设置信息"
                open={visible}
                closable={false}
                footer={null}
            >
                {intro}
                <LandUseData year={year} option={option} />
                <div className={styles.infoConfirmContainer}>
                    <button className={styles.infoConfirmButton} onClick={closeModal}>
                        确认
                    </button>
                </div>
            </Modal>
        </>

    );
}


function TransformationData({ option }) {
    const trans_prob = {
        'base': [0, 0, 0, 0, 0, 0, 0],
        'farmer': [-0.6, -0.4, -0.5, 0.1, 0.01, 0.2, -0.4],
        'enterprise': [-0.1, -0.5, -0.3, 0.5, 0.005, 0.6, -0.6],
        'tourist': [-0.2, -0.3, -0.1, 0.1, 0.01, 0.1, -0.3],
    };
    const tableData2035_base = [
        { type: "鱼塘 -> 建设用地", factor: trans_prob['base'][0] },
        { type: "桑园、水田 -> 建设用地", factor: trans_prob['base'][1] },
        { type: "多种土地 -> 建设用地", factor: trans_prob['base'][2] },
        { type: "未利用地 -> 桑园", factor: trans_prob['base'][3] },
        { type: "鱼塘 -> 桑园", factor: trans_prob['base'][4] },
        { type: "鱼塘 -> 水田、其他农用地", factor: trans_prob['base'][5] },
        { type: "桑园、水田、其他农用地 -> 建设用地", factor: trans_prob['base'][6] },
    ];

    const tableData2035_farmer = [
        { type: "鱼塘 -> 建设用地", factor: trans_prob['farmer'][0] },
        { type: "桑园、水田 -> 建设用地", factor: trans_prob['farmer'][1] },
        { type: "多种土地 -> 建设用地", factor: trans_prob['farmer'][2] },
        { type: "未利用地 -> 桑园", factor: trans_prob['farmer'][3] },
        { type: "鱼塘 -> 桑园", factor: trans_prob['farmer'][4] },
        { type: "鱼塘 -> 水田、其他农用地", factor: trans_prob['farmer'][5] },
        { type: "桑园、水田、其他农用地 -> 建设用地", factor: trans_prob['farmer'][6] },
    ];

    const tableData2035_enterprise = [
        { type: "鱼塘 -> 建设用地", factor: trans_prob['enterprise'][0] },
        { type: "桑园、水田 -> 建设用地", factor: trans_prob['enterprise'][1] },
        { type: "多种土地 -> 建设用地", factor: trans_prob['enterprise'][2] },
        { type: "未利用地 -> 桑园", factor: trans_prob['enterprise'][3] },
        { type: "鱼塘 -> 桑园", factor: trans_prob['enterprise'][4] },
        { type: "鱼塘 -> 水田、其他农用地", factor: trans_prob['enterprise'][5] },
        { type: "桑园、水田、其他农用地 -> 建设用地", factor: trans_prob['enterprise'][6] },
    ];

    const tableData2035_tourist = [
        { type: "鱼塘 -> 建设用地", factor: trans_prob['tourist'][0] },
        { type: "桑园、水田 -> 建设用地", factor: trans_prob['tourist'][1] },
        { type: "多种土地 -> 建设用地", factor: trans_prob['tourist'][2] },
        { type: "未利用地 -> 桑园", factor: trans_prob['tourist'][3] },
        { type: "鱼塘 -> 桑园", factor: trans_prob['tourist'][4] },
        { type: "鱼塘 -> 水田、其他农用地", factor: trans_prob['tourist'][5] },
        { type: "桑园、水田、其他农用地 -> 建设用地", factor: trans_prob['tourist'][6] },
    ];

    let data;
    if (option === "base") {
        data = tableData2035_base;
    } else if (option === "farmer") {
        data = tableData2035_farmer;
    } else if (option === "enterprise") {
        data = tableData2035_enterprise;
    } else if (option === "tourist") {
        data = tableData2035_tourist;
    }
    const columns = [
        { title: '空间转换类型', dataIndex: 'type', key: 'type', },
        { title: '转换概率（以基线为标准）', dataIndex: 'factor', key: 'factor', },
    ];
    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="small"
            width={"50%"}
        />
    );
}

function TransformationModal({ option }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    const intro = <>
        <h2>空间转换（Transformation）</h2>
        <p>空间转换是指土地利用类型之间的相互转化，<b>空间转换的过程会影响土地利用总量。</b></p>
        <p>在模拟过程中，根据输入的邻近系数和转换成本矩阵，计算出每种土地利用类型在未来一段时间内的土地利用总量。</p>
        <p>在预测土地利用总量时，需要考虑到空间转换的影响。</p>
    </>

    return (
        <>
            <span className={styles.infoOpenButton} onClick={showModal}>(查看详细设置)</span>
            <Modal
                title="空间转换矩阵 详细设置信息"
                open={visible}
                closable={false}
                footer={null}
            >
                {intro}
                <TransformationData option={option} />
                <div className={styles.infoConfirmContainer}>
                    <button className={styles.infoConfirmButton} onClick={closeModal}>
                        确认
                    </button>
                </div>
            </Modal>
        </>
    );
}

function EnergyData({ option }) {
    const energy_info = {
        'base': [5.79, 2.87, 2.02],
        'farmer': [7.43, 1.51, 4.89],
        'enterprise': [7.96, 1.29, 6.27],
        'tourist': [6.65, 2.95, 2.26],
    };
    const energy_base = 
        [{ option: 'base', EYR: energy_info['base'][0], ELR: energy_info['base'][1], ESI: energy_info['base'][2] }];
    const energy_farmer = 
        [{ option: 'farmer', EYR: energy_info['farmer'][0], ELR: energy_info['farmer'][1], ESI: energy_info['farmer'][2] }];
    const energy_enterprise = 
        [{ option: 'enterprise', EYR: energy_info['enterprise'][0], ELR: energy_info['enterprise'][1], ESI: energy_info['enterprise'][2] }];
    const energy_tourist = 
        [{ option: 'tourist', EYR: energy_info['tourist'][0], ELR: energy_info['tourist'][1], ESI: energy_info['tourist'][2] }];

    let data = option === 'base' ? energy_base :
        option === 'farmer' ? energy_farmer :
            option === 'enterprise' ? energy_enterprise :
                option === 'tourist' ? energy_tourist : null;
    const columns = [
        { title: '主体', dataIndex: 'option', key: 'option', },
        { title: '能值产出比（EYR）', dataIndex: 'EYR', key: 'EYR', },
        { title: '环境负荷率（ELR）', dataIndex: 'ELR', key: 'ELR', },
        { title: '环境持续性指数（ESI）', dataIndex: 'ESI', key: 'ESI', },
    ];
    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="small"
            width={"50%"}
        />
    );
}

function EnergyModal({ option }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    const intro = <>
        <h2>能值分析（Energy analysis）</h2>
        <p>为了评估未来土地利用情景的可持续性，本研究利用能量分析和能值指标来量化四种情景的生态和经济影响。</p>
        <p>根据相关原始数据，使用固定计算公式、能量转换系数和《农业技术与经济手册》中的能量转换系数，我们开发了一个能量分析表。</p>
            <p>该表计算了系统的主要能量输入和输出，并将研究系统的能量输入分为四类：
        <li><b>可再生环境资源（R）、不可再生环境资源。不可再生的工业辅助能源（F）和可再生的有机能源（T）</b></li></p>
        <p>能量输出分为：
            <li><b>经济输出能量（Y1）和废物输出能量（Y2）。</b></li></p>
        <ul>
            <li>能值产出比（EYR）是系统总输出能值与社会和经济反馈的输入能值之比。它用于衡量农业生产系统利用自然资源的能力及其资源利用效率。能值比越高，农业生产系统对自然资源的依赖性越大，资源利用效率越高。</li>
            <li>环境负荷比（ELR）是系统中不可再生能源输入的总能量值与可再生能源输入总能量值的比值。它用于衡量农业生产的潜在压力，环境负荷率越高，农业生产系统对当地环境的压力就越大，可持续性就越低。 </li>
            <li>环境可持续性指数（ESI）是EYR与ELR的比值。ESI不仅反映了经济增长的强度，也反映了自然生态系统的环境压力。它可以衡量农业生产系统的可持续性。指数值越高，农业生产系统的可持续性就越强。</li>
        </ul>
    </>
    return (<>
        <button style={{ backgroundColor: "skyblue", color: "white", borderRadius: "5px", width: "100%", marginBottom: "10px" }}
            onClick={showModal}>查看模拟结果能值分析</button>
        <Modal
            title="能值分析 详细设置信息"
            open={visible}
            closable={false}
            width={'60%'}
            footer={null}
        >
            {intro}
            <EnergyData option={option} />
            <div className={styles.infoConfirmContainer}>
                <button className={styles.infoConfirmButton} onClick={closeModal}>
                    确认
                </button>
            </div>
        </Modal>
    </>);
}