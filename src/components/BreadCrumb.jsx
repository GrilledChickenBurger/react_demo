import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useRoutes } from 'react-router-dom';

import styles from "./BreadCrumb.module.css";


export function BreadCrumb() {
    const [addrMap, setAddrMap] = useState(null); // 使用状态来存储 addrMap
    const location = useLocation();

    useEffect(() => {
        const loadAddrMap = async () => {
            const module = await import('../router'); // 动态导入
            setAddrMap(module.addrMap); // 将 addrMap 设置到状态中
        };
        loadAddrMap();
    }, []);
    // 等待 addrMap 初始化完成
    if (!addrMap) {
        return null; // 或者可以返回加载中的状态
    }

    const breadcrumbNameMap = addrMap.reduce((obj, item) => {
        obj[item.path] = item.label;
        return obj;
    }, {});

    const pathnames = location.pathname.split('/').filter(i => i);
    const paths = pathnames.map((_, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={path}>
                <Link to={path}>{breadcrumbNameMap[path]}</Link>
            </Breadcrumb.Item>
        );
    });

    // const breadcrumbItems = [
    //     <Breadcrumb.Item key="home">
    //         <Link to="/">Home</Link>
    //     </Breadcrumb.Item>
    // ].concat(paths);

    return (
        <div className={styles.breadCrumbContainer}>
            <Breadcrumb><b>当前位置：</b>
                <Breadcrumb.Item key="home">
                    <Link to="/">主页</Link>
                </Breadcrumb.Item>
                {paths.length > 0 && paths}
            </Breadcrumb>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }}/>
        </div>

    );

}