import { Carousel } from 'antd';
import React from 'react';
import styles from './ImgSlider.module.css';

import img1 from '../assets/notfound1.jpg';
import img2 from '../assets/notfound2.jpg';
import img3 from '../assets/notfound3.jpg';
import img4 from '../assets/notfound4.jpg';

export default function ImgSlider() {
    return (
        <Carousel autoplay>
            <div className={styles.imgSliderItem}>
                <img src={img1} alt='notfound1' className={styles.img} />

            </div>
            <div className={styles.imgSliderItem}>
                <img src={img2} alt='notfound2' className={styles.img} />
            </div>
            <div className={styles.imgSliderItem}>
                <img src={img3} alt='notfound3' className={styles.img} />
            </div>
            <div className={styles.imgSliderItem}>
                <img src={img4} alt='notfound4' className={styles.img} />
            </div>
{/*             
            <div className={styles.imgSliderItem}>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div className={styles.imgSliderItem}>
                <h3 style={contentStyle}>4</h3>
            </div> */}
        </Carousel>
    );

};
