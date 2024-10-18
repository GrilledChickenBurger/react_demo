import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaInfoCircle } from "react-icons/fa";

import notfoundImg from '../assets/notfound1.jpg';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const location = useLocation();
  return (
    <>
      <div className={styles.allContainer}>
        <h1 className={styles.title}>404 - 页面未找到</h1>
        <p>抱歉，我们找不到您请求的页面。</p>
        <div className={styles.linkContainer}>
          <div className={styles.linkItem}>
            <p>您可以尝试以下链接：</p>
          </div>
          <div className={styles.linkItem}>
            <FaHome />
            <Link to="/" className={styles.linkText}>首页</Link>
          </div>
          <div className={styles.linkItem}>
            <FaChartBar />
            <Link to="/analysis" className={styles.returnLink}>数据评估</Link>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img src={notfoundImg} className={styles.img} alt="404" />
        </div>
      </div>
    </>

  );
}

