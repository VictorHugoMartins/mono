import React, { useState } from "react";
import Icon from "~/components/ui/Icon/Icon";
import styles from "../navbar.module.scss";

const NavbarCollapse: React.FC = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <button
        className={styles.navbarToggler}
        onClick={() => setCollapse(!collapse)}
      >
        <Icon type="FaBars" />
      </button>
      <div
        className={`${styles.navbarCollapse} ${collapse ? styles.show : ""}`}
      >
        {/* <div className={styles.navbarMrAuto}></div> */}
        <div className={styles.navbarNav}>{children}</div>
      </div>
    </>
  );
};

export default NavbarCollapse;
