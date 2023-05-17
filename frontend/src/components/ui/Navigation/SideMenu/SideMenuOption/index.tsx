import React from "react";
import Link from "next/link";
import { SideMenuOptionProps } from "../sideMenu.interface";
import styles from "../sideMenu.module.scss";
import SideMenuIcon from "../SideMenuIcon";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Typography from "~/components/ui/Typography/Typography";

const SideMenuOption: React.FC<SideMenuOptionProps> = ({
  icon,
  text,
  href,
  isSubOption,
}) => {
  return (
    <Link href={href}>
      <a
        className={
          isSubOption ? ClassJoin([styles.href, styles.subOption]) : styles.href
        }
        title={text}
      >
        <div className={styles.option}>
          <SideMenuIcon icon={icon} />
          <p className={styles.sideMenuText}>
            <Typography component="caption">
            {text}
            </Typography>
            </p>
        </div>
      </a>
    </Link>
  );
};

export default SideMenuOption;
