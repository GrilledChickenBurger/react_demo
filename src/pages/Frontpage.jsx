

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


function FrontPage() {
    const cardsinfo = [
        {
            img: { src: Img1, alt: "Card 1" }, title: "1. Sustainable Assessment",
            description: "Sustainable assessment is a process of identifying and analyzing the environmental, social, and economic factors that contribute to the development of a particular area or region.",
            address: '/branch1',
        },
        {
            img: { src: Img2, alt: "Card 2" }, title: "2. Landscape Pattern",
            description: "Landscape patterns are a type of visual art that use geometric shapes and colors to create a visual image.",
            address: '/branch2',
        },
        {
            img: { src: Img3, alt: "Card 3" }, title: "3. Ecosystem Services",
            description: "Ecosystem services are a set of ecological services that are provided by nature to human beings and the environment.",
            address: '/branch3',
        },
        {
            img: { src: Img4, alt: "Card 4" }, title: "4. Relationships Analysis",
            description: "Relationships analysis is a process of identifying and analyzing the interdependencies between different stakeholders in a particular area or region.",
            address: '/branch4',
        },
    ];

    return (
        <div className={styles.FrontPage}>
            <Header />
            <IndexMap />
            <SplitLine title="数据分析"/>
            <CardCollection items={cardsinfo} />
            
            {/* <MyMapViewer /> */}
            <Footer />
        </div>
    )
}

export default FrontPage;