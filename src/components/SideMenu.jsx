import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { addr } from '../router';
import styles from './SideMenu.module.css';



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


export default function SideMenu() {
  let dropdownItem1 = addr.map((item, _) => (
    <NavLink key={item.value} to={item.href}
      className={({ isActive }) => isActive ? styles.dropdownItemActive : styles.dropdownItem}>{item.label}</NavLink>
  ));
  const items = [
    getItem(<NavLink to="/">主页</NavLink>, '0', <PieChartOutlined />),
    getItem('基于景观可持续的地理设计', 'sub1', <AppstoreOutlined />,
      dropdownItem1.map((item, index) => (
        getItem(item, index, null, null, 'item')
      )),
    ),
    getItem('联系我们', 'sub2', <MailOutlined />, null, ),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [expandMenuWidth, setExpandMenuWidth] = useState(0); // 状态变量保存菜单宽度
  const user_toggleCollapsed = () => {
    // 切换用户控制的折叠状态
    setCollapsed(prev => !prev);
  };
  useEffect(() => { 
    const handleResize = () => {
      const sideMenu = document.getElementById('sideMenu');

      if (sideMenu) {
        const sideMenuWidth = sideMenu.offsetWidth;
        const windowWidth = window.innerWidth;
        if (sideMenuWidth > expandMenuWidth) {
          setExpandMenuWidth(sideMenuWidth);
        }

        console.log(sideMenuWidth / windowWidth,expandMenuWidth/windowWidth, sideMenuWidth, windowWidth, expandMenuWidth);
        if (expandMenuWidth / windowWidth > 1 / 4 && !collapsed) {
          setCollapsed(true);
        }
        else if (expandMenuWidth / windowWidth < 1 / 4 && collapsed) {
          setCollapsed(false);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [expandMenuWidth])

  
  return (<>
        <div className={styles.sideMenu} id='sideMenu'>
      <Button
        type="primary"
        onClick={user_toggleCollapsed}
        className={styles.collapseButton}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  </>
  );
};