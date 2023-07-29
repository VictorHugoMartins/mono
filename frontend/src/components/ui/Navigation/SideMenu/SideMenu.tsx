import React, { createContext, useContext } from "react";

import styles from "./sideMenu.module.scss";
import { SideMenuProps } from "./sideMenu.interface";

import IconRounded from '~/assets/images/iconRounded.png'

import SideMenuCollapseButton from "./SideMenuCollapseButton";

type SideMenuContextType = {
  open: boolean;
  handleOpen: (value: boolean) => void;
};

//------------- Criando Context ---------------//
const SideMenuContext = createContext({} as SideMenuContextType);

//------------- Expotando UseContext ---------------//
export const useSideMenuContext = () => useContext(SideMenuContext);

const SideMenu: React.FC<SideMenuProps> = ({
  openAside,
  setOpenAside,
  children,
}) => {
  return (
    <>
      <aside
        className={`${styles.sideMenu} ${openAside ? styles.open : styles.close}
        ${styles[`theme${'light'}`]}`}
      >
        <SideMenuCollapseButton open={openAside} handleOpen={setOpenAside} />
        <div className={styles.options}>
          <SideMenuContext.Provider
            value={{ open: openAside, handleOpen: setOpenAside }}
          >
            {children}
          </SideMenuContext.Provider>
        </div>
        <button className={styles.iconRounded} onClick={() => setOpenAside(!openAside)}>
          <img src={IconRounded} />
        </button>
      </aside>
    </>
  );
};

export { SideMenu };
