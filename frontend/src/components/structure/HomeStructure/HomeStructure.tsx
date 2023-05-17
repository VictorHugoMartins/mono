import React, { useLayoutEffect, useState } from "react";

import styles from "./homeStructure.module.scss";
import { useMenuContext } from "~/context/global/MenuContext";
import HeadTitle from "~/components/ui/HeadTitle";
import useTheme from "~/hooks/useTheme";
import HomeNavBar from "~/components/local/HomeNavBar/HomeNavBar";

interface PageStructureProps {
  noPadding?: boolean;
  returnPath?: string;
  children: React.ReactNode;
  title: string;
}

const HomeStructure: React.FC<PageStructureProps> = ({
  children,
  noPadding,
  returnPath,
  title,
}) => {
  const { theme } = useTheme();
  const { getMenuOptions } = useMenuContext();

  useLayoutEffect(() => {
    getMenuOptions();
  }, []);

  return (
    <>
      <HeadTitle title={title} />
      <main
        className={`${styles.pageContent} ${styles.close} ${noPadding ? styles.noPadding : ""} ${styles[`theme${theme}`]}`}
      >
        <div className={`${styles.navBarContent}`}>
          <HomeNavBar title={title} returnPath={returnPath} />
        </div>
        <section
          className={`${styles.content} ${
            noPadding ? styles.noPadding : ""
          }`}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default HomeStructure;
