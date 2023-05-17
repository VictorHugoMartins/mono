import React from "react";
import Icon from "~/components/ui/Icon/Icon";
import { SideMenuIconProps } from "../sideMenu.interface";
import styles from "../sideMenu.module.scss";

const SideMenuIcon: React.FC<SideMenuIconProps> = ({ icon }) => {
  return (
    <>
      {icon ? (
        <div className={styles.icon}>
          <Icon type={icon} />
        </div>
      ) : (
        <span />
      )}
    </>
  );
};

export default SideMenuIcon;
