import React from "react";
import Link from 'next/link';
import { NavbarLinkProps } from '../navBar.interface';
import styles from '../navbar.module.scss';

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <a className={styles.navbarLink}>{label}</a>
    </Link>
  )
}

export default NavbarLink