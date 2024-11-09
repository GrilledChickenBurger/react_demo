import React, { useContext } from "react";
import { VersionContext } from "../App_nav.jsx";
import { Divider, Button } from "antd";
import { SwapRightOutlined } from '@ant-design/icons';

import { addr } from "../router.jsx";
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import CardGroup, { CardItems, CardItemSlider } from '../widgets/CardGroup.jsx';
import ImgSlider from "../widgets/ImgSlider.jsx";
// import CardCollection from '../to_improve/CardCollection.jsx';
import IndexMap from '../maps/index_map.jsx';

import styles from './Frontpage.module.css';
import Img1 from '../assets/1_sustainable.jpg'
import Img2 from '../assets/2_landscape.jpg'
import Img3 from '../assets/3_service.png'
import Img4 from '../assets/4_relationship.png'
import Img5 from '../assets/5_prediction.png'
import { NavLink } from "react-router-dom";


function FrontPage() {
    const cardsinfo = [
        {
            img: { src: Img1, alt: "Card 1" }, title: addr[0].label,
            description: ["1) 长三角27个城市的可持续评估；", "2) 湖州乡村的可持续评估",],
            address: addr[0].href,
        },
        {
            img: { src: Img2, alt: "Card 2" }, title: addr[1].label,
            description: ["1) 湖州乡村聚落演变", "2) 湖州南浔区景观格局演变", "3) 湖州桑基鱼塘景观格局演变",],
            address: addr[1].href,
        },
        {
            img: { src: Img3, alt: "Card 3" }, title: addr[2].label,
            description: ["1) 湖州乡村地区生态系统服务", "2) 湖州南浔桑基鱼塘景观生态系统服务",],
            address: addr[2].href,
        },
        {
            img: { src: Img3, alt: "Card 4" }, title: addr[3].label,
            description: ["展示...",],
            address: addr[3].href,
        },
        {
            img: { src: Img4, alt: "Card 5" }, title: addr[4].label,
            description: ["展示湖州南浔桑基鱼塘景观的格局-服务-福祉关系",],
            address: addr[4].href,
        },
        {
            img: { src: Img5, alt: "Card 6" }, title: addr[5].label,
            description: ["1) 情景分析", "2) 基于生态系统服务的可持续评估",],
            address: addr[5].href,
        },
    ];

    const version = useContext(VersionContext);

    return (<>
        <div className={styles.FrontPage}>
            <Header />
            {/* <ImgSlider /> */}
            <div className={styles.mapContainer}>
            <IndexMap />
            </div>
            <div className={`${styles.partContainer} ${styles.part1Image}`}>
                <h1 className={styles.title}>基于景观可持续的地理设计</h1>
                <div className={styles.partContent}>
                    <div className={styles.partDescription}>
                        <p>本平台希望在景观可持续(Landscape Sustainability Science)理论支撑下，开展地理设计在城乡景观中的实践，
                            并结合GIS、三维建模、3D打印、人工智能等技术，建立一个与学科紧密度高的地理设计平台，从而推动地理设计领域进一步发展。</p>
                        <Button className={styles.partMoreButton} size="large"
                            icon={<SwapRightOutlined />}>
                            <NavLink to='/analysis' >了解更多</NavLink>
                        </Button>
                    </div>

                    <div className={styles.cardGroupContainer}>
                        <CardItemSlider cardinfos={cardsinfo} idx={[0, 1, 2, 3, 4, 5]}
                            slidesPerView={3} />
                        {/* <CardGroup cardinfos={cardsinfo} cols={2} /> */}
                        {/* <CardItems cardinfos={cardsinfo} idx={[0,1,2] } /> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.partContainer} ${styles.part2Image}`}  >
                <h1 className={styles.title}>地理设计术语解释</h1>
                <div className={styles.partContent}>
                    <div className={styles.partDescription}>
                        <p>地理设计(GeoDesign)是近年来由规划设计及自然科学领域学者共同提出的一个新的概念，
                            主张在规划设计中充分考虑项目所处地理环境的自然和社会问题，强调将所知的环境与社会系统运行机制通过有效的工具结合到设计过程中。（占位用）</p>
                        <p>这一理念有助于人们更科学地解决社会快速发展带来的环境问题，对实现可持续发展有着重要意义。</p>
                        <Button className={styles.partMoreButton} size="large" href="#"
                            icon={<SwapRightOutlined />}>了解更多</Button>
                    </div>
                </div>
            </div>
            <div className={`${styles.partContainer} ${styles.part3Image}`}  >
                <h1 className={styles.title}>关于我们</h1>
                <div className={styles.partContent}>
                    <div className={styles.partDescription}>
                        <p>人体中大部分是水。世界卫生组织《水中的营养素》，指出人体必须从饮用水中摄取一定量的矿物质和微量元素。
                            水中的矿物元素可以部分补充人群膳食矿物元素的摄入，尤其是钙和镁，并且可能在心血管疾病方面对人体健康存在一定保护。</p>
                        <p>农夫山泉一直与果园和种植者合作。在新疆伊犁、江西赣州等优质原产地建设了苹果、胡萝卜、脐橙等原料种植基地。
                            通过持续不断的技术革新和严格的质量把控，探索农业现代化的前沿。（占位用）</p>
                        <Button className={styles.partMoreButton} size="large" href="#"
                            icon={<SwapRightOutlined />}>了解更多</Button>
                    </div>
                </div>
            </div>

            {/* <MyMapViewer /> */}
            <Footer version={version} />
        </div>
    </>)
}

export default FrontPage;