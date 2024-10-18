import React, { useContext } from "react";
import { VersionContext } from "../App_nav.jsx";

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import CardCollection from '../widgets/CardCollection.jsx';
import IndexMap from '../maps/index_map.jsx';
import SplitLine from '../widgets/SplitLine.jsx';

import styles from './Frontpage.module.css';
import Img1 from '../assets/1_sustainable.jpg'
import Img2 from '../assets/2_landscape.jpg'
import Img3 from '../assets/3_service.png'
import Img4 from '../assets/4_relationship.png'
import Img5 from '../assets/5_prediction.png'


function FrontPage() {
    const cardsinfo = [
        {
            img: { src: Img1, alt: "Card 1" }, title: "1. 历史现状评估———可持续评估",
            description: ["1) 展示长三角27个城市的各指标评估结果；","2) 展示湖州市各行政村的人口、游客量、收入、耕地、林地等数据，均与可持续评估结果正相关。",],
            address: '/analysis/branch1',
        },
        {
            img: { src: Img2, alt: "Card 2" }, title: "2. 历史现状评估———景观格局",
            description: ["展示从1975年开始，湖州市南浔区的遥感解译数据，以及桑基鱼塘景观的面积、形态、N元素、景观格局指数等。",],
            address: '/analysis/branch2',
        },
        {
            img: { src: Img3, alt: "Card 3" }, title: "3. 历史现状评估———生态系统服务分析",
            description: ["展示湖州市南浔区的生态系统服务分析，以及进一步分析结果（生态系统服务的热点分析、多利益相关者对生态系统服务的态度）。",],
            address: '/analysis/branch3',
        },
        {
            img: { src: Img4, alt: "Card 4" }, title: "4. 景观格局与生态系统服务的关系",
            description: ["展示六种生态系统服务的定性关系式提取，展示桑基减少、鱼塘面积增加对各服务的影响。",],
            address: '/analysis/branch4',
        },
        {
            img: { src: Img5, alt: "Card 5" }, title: "5. 预测———可持续发展路径规划",
            description: ["根据2015、2019年数据，以及可选的主导者等因素，模拟2035年湖州市南浔区土地利用情况。",],
            address: '/analysis/branch5',
        },
    ];

    const version = useContext(VersionContext);

    return (
        <div className={styles.FrontPage}>
            <Header />
            <IndexMap />
            <SplitLine title="数据分析"/>
            <CardCollection items={cardsinfo} />
            
            {/* <MyMapViewer /> */}
            <Footer version={version}/>
        </div>
    )
}

export default FrontPage;