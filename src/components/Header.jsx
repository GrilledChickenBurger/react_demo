import styles from './Header.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";
// import Dropdown from './dropdown';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // 切换下拉列表的状态
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  let dropdownItems = [
    { value: "s1", label: "Service 1", href: "#card-collection" },
    { value: "s2", label: "Service 2", href: "#card-collection" },
    { value: "s3", label: "Service 3", href: "#card-collection" },
    { value: "s4", label: "Service 4", href: "#card-collection" },
  ];

  return (
    <header className={styles.header}>
      <h1>Geo App</h1>
      <nav className={styles.navbar}>
        <a href="/">Home</a>
        <a href="#">About</a>
        <div className={styles.dropdownContainer}>
          <a href="#" onClick={toggleDropdown}>Menu</a>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {dropdownItems.map(item => (
                <a key={item.value} href={item.href} className={styles.dropdownItem} onClick={toggleDropdown}>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="#">Contact</a>
      </nav>
    </header>

  );
}

export default Header;