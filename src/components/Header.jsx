import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input } from 'antd';
import { MdMenu, MdClose } from "react-icons/md";
import styles from './Header.module.css'

const { Search } = Input;


function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  // 切换下拉列表的状态
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  let dropdownItems = [
    { value: "s1", label: "可持续评估", href: "/test/branch1" },
    { value: "s2", label: "景观格局评估", href: "/test/branch2" },
    { value: "s3", label: "生态系统服务分析", href: "/test/branch3" },
    { value: "s4", label: "格局-服务-福祉关系分析", href: "/test/branch4" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 style={{ textWrap: 'nowrap', fontSize: '2rem' }}>
          <NavLink to="/">地理设计平台原型</NavLink>
        </h1>
        <nav className={styles.navbar}>
          <div className={styles.navbarBtn} onClick={() => setNavOpen(!isNavOpen)}>
            {(!isNavOpen) ? <MdMenu /> : <MdClose />}
          </div>
          <div className={`${styles.navbarItems} ${isNavOpen ? styles.navbarOpen : ''}`}>
            {/* <div className={styles.dropdownContainer}>
          <a href="#" onClick={toggleDropdown}>数据评估</a>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {dropdownItems.map(item => (
                <Link to={item.href} className={styles.dropdownItem} onClick={toggleDropdown}>{item.label}</Link>
              ))}
            </div>
          )}
        </div> */}
            <a href="#">关于我们</a>
            <a href="#">联系我们</a>
            {/* <Search placeholder="输入搜索内容"
          enterButton="搜索"
          size="large" onSearch={value => console.log(value)} /> */}
          </div>
        </nav>
      </div>

    </header>

  );
}

export default Header;