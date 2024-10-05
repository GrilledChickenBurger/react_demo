import styles from "./Footer.module.css";
function Footer() {

  return (
    <footer className={styles.footer} >
      <hr style = {{borderTop: "1px solid #ccc", width: "100%"}} />
      <p style={{marginTop:0}}>© {new Date().getFullYear()} Geo App. All rights reserved.</p>
    </footer>);
}

export default Footer;
