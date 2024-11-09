import styles from './SideNav.module.css';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaInfoCircle, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";

import { addr } from '../router';

export default function SideNav() {
    const [isDropdownOpen, setDropdownOpen] = useState(true);
    const [isCollapsed, setCollapsed] = useState(false); 

    let dropdownItems = addr;

    const handleCollapse = () => {
        setCollapsed(!isCollapsed);
        console.log("导航栏收缩状态："+isCollapsed);
    }
    useEffect(() => { 
        console.log("切换下拉框。导航栏收缩状态：" + isCollapsed);
        let navtext = document.getElementsByClassName("navbarText");
        console.log(navtext.length);
        
        if (isCollapsed) {
            console.log("导航栏收缩，下拉框收缩");
            Array.from(navtext).forEach(item => {
                // item.style.visibility = 'hidden';
                item.style.display='none';
            });
            setDropdownOpen(false);
        }
        else {
            console.log("导航栏展开，下拉框展开");
            Array.from(navtext).forEach(item => {
                // item.style.visibility = 'visible';
                item.style.display='block';
            });
            setDropdownOpen(true);
        }
    }, [isCollapsed]);

    return (
        <aside className={`${styles.navbarContent} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.navbarItem}>
                <div className={`${styles.navbarIcon} ${styles.headerIcon}`}
                    onClick={handleCollapse}
                >
                    <AiOutlineMenu />
                </div>
                <h1 style={{ fontSize: '1rem' }}>导航栏</h1>
                {/* <span onClick={handleCollapse} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </span> */}
            </div>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />
            
            <nav className={styles.navbar}>
                <div className={styles.navbarItem}>
                    <div className={styles.navbarIcon}>
                        <FaHome />
                    </div>
                    <a href="/" className='navbarText'>主页</a>
                </div>

                <div className={styles.dropdownContainer}>
                    <div className={styles.navbarItem}>
                        <div className={styles.navbarIcon}>
                            <FaChartBar />
                        </div>
                        <a href="#" onClick={() => { setDropdownOpen(!isDropdownOpen) }}
                             className='navbarText'>
                            基于景观可持续的地理设计
                        </a>
                    </div>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            {dropdownItems.map((item, _) => (
                                <NavLink key={item.value} to={item.href}
                                    className={({isActive})=>isActive ? styles.dropdownItemActive : styles.dropdownItem}>{item.label}</NavLink>
                            ))}
                        </div>
                    )}
                </div>

                {/* <div className={styles.navbarItem}>
                    <FaInfoCircle className={ styles.navbarIcon } />
                    <a href="#">关于</a>
                </div> */}

                <div className={styles.navbarItem}>
                    <div className={styles.navbarIcon}>
                        <FaRegMessage />
                    </div>
                    <a href="#"  className='navbarText'>联系我们</a>

                </div>
            </nav>
        </aside>
    );
}

