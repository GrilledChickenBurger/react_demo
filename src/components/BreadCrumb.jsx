import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation, useRoutes } from 'react-router-dom';

import styles from "./BreadCrumb.module.css";

const route = [{
    path: '/',
    breadcrumbName: '首页',
}, {
    path:'/analysis',
    breadcrumbName: '数据分析',
},
{
    path: '/analysis/branch1',
    breadcrumbName: '可持续评估',
},
{
    path: '/analysis/branch2',
    breadcrumbName: '景观格局评估',
},
{
    path: '/analysis/branch3',
    breadcrumbName: '生态系统服务分析',
},
{
    path: '/analysis/branch4',
    breadcrumbName: '景观格局-生态服务分析',

},
{
    path: '/analysis/branch5',
    breadcrumbName: '空间优化',
    },
    {
        path: '/analysis/branch5/pre_simulation',
        breadcrumbName: '初始设置-预模拟',
    },
    {
        path: '/analysis/branch5/formal_simulation',
        breadcrumbName: '正式模拟',
    },
];

export function BreadCrumb() {
    const location = useLocation();
    const breadcrumbNameMap = route.reduce((obj, item) => {
        obj[item.path] = item.breadcrumbName;
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