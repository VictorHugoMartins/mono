import React from "react";

import styles from "./navbar.module.scss";
import { NavbarProps } from "./navBar.interface";

import NavbarBrand from "./NavbarBrand";
import NavbarCollapse from "./NavbarCollapse";
import NavbarOptionsRender from "./NavbarOptionsRender";
import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import NavbarDropdownOptionsRender from "./NavbarDropdownOptionsRender";
import NavbarLink from "./NavbarLink";

import useTheme from "~/hooks/useTheme";

const NavBar: React.FC<NavbarProps> = ({
  brand,
  brandImg,
  brandHref,
  children,
  noFixed,
  inHome,
  renderButtons,
  publicPage
}) => {
  const { theme } = useTheme();

  return (
    <nav
      className={`${styles.siteNavbar} ${noFixed && styles.noFixed} ${inHome && styles.public}  ${publicPage && styles.notLogged} ${
        styles[`theme${inHome ? "light" : theme}`]
      }`}
    >
      {(brand || brandImg) && (
        <NavbarBrand alt="Navbar Brand" imageUrl={brandImg} href={brandHref}>
          {brand}
        </NavbarBrand>
      )}

      {children}

      {renderButtons && (
        <NavbarCollapse>
          <NavbarOptionsRender options={renderButtons} />
        </NavbarCollapse>
      )}
    </nav>
  );
};

export default NavBar;

export {
  NavbarBrand,
  NavbarCollapse,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarDropdownOptionsRender,
  NavbarLink,
  NavbarOptionsRender,
};

/*
/styles   /abstracts    _functions.scss    _mixins.scss    _variables.scss   /base    _base.scss    _typography.scss   app.scss
*/
