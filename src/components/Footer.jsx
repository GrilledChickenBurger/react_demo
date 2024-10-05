import propTypes from "prop-types";
import styles from "./Footer.module.css";
function Footer(props) {

  const version = props.version;

  return (
    <footer className={styles.footer} >
      <hr style = {{borderTop: "1px solid #ccc", width: "100%"}} />
      <p style={{marginTop:0}}>© {new Date().getFullYear()} Geo App version {version}. All rights reserved.</p>
    </footer>);
}

export default Footer;

Footer.propTypes = {
  version: propTypes.string,
};
Footer.defaultProps = {
  version: "0.0.1",
};