import { Outlet } from "react-router-dom";
import { useContext } from "react";

import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import styles from "./Layout.module.css";

import { VersionContext } from '../App_nav.jsx';



export default function Layout() {
    const version = useContext(VersionContext);

    return (<>
        <Header />
        <div className={styles.allContainer}>
            <div className={styles.layoutContainer}>
                <SideNav />
            </div>
            <div className={styles.mainContainer}>
                <Outlet />
            </div>
        </div>

        <Footer version={version}/>

        </>
    );
}