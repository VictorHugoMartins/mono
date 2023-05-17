import React from "react";
import { NavbarBrandProps } from "../navBar.interface";
import styles from "../navbar.module.scss";

const NavbarBrand: React.FC<NavbarBrandProps> = ({
  alt,
  children,
  imageUrl,
  href,
}) => {
  return (
    <a href={href} className={styles.navbarBrand}>
      {imageUrl && <img src={imageUrl} alt={alt} />}
      {children}
    </a>
  );
};

export default NavbarBrand;
