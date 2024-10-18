import styles from './SideNav.module.css';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaInfoCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

export default function SideNav() {
    const [isDropdownOpen, setDropdownOpen] = useState(true);

    let dropdownItems = [
        { value: "s1", label: "可持续评估", href: "/analysis/branch1" },
        { value: "s2", label: "景观格局", href: "/analysis/branch2" },
        { value: "s3", label: "生态系统服务", href: "/analysis/branch3" },
        { value: "s4", label: "格局-服务关系分析", href: "/analysis/branch4" },
        { value: "s5", label: "空间优化", href: "/analysis/branch5" },
    ];

    return (
        <aside className={styles.navbarContent}>
            <h1 style={{ fontSize: '1rem' }}>导航栏</h1>
            <hr style={{ width: "100%", height: "1px", backgroundColor: "gray" }} />
            
            <nav className={styles.navbar}>
                <div className={styles.navbarItem}>
                    <FaHome className={ styles.navbarIcon } />
                    <a href="/">主页</a>
                </div>

                <div className={styles.dropdownContainer}>
                    <div className={styles.navbarItem}>
                        <FaChartBar className={styles.navbarIcon} />
                        <a href="#" onClick={() => { setDropdownOpen(!isDropdownOpen) }}
                            className={styles.dropdownToggle}>
                        数据分析</a>
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
                    <FaRegMessage className={ styles.navbarIcon } />
                    <a href="#">联系我们</a>

                </div>
            </nav>
        </aside>
    );
}

