import React, { useLayoutEffect, useState } from "react";

import styles from "./privatePageStructure.module.scss";
import LocalSideMenu from "~/components/local/LocalSideMenu/LocalSideMenu";
import LocalNavBar from "~/components/local/LocalNavBar/LocalNavBar";
import { useMenuContext } from "~/context/global/MenuContext";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import HeadTitle from "~/components/ui/HeadTitle";
import useTheme from "~/hooks/useTheme";
import { Grid } from "~/components/ui/Layout/Grid";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { SpacingPatternType } from "~/types/global/SpacingType";

interface PageStructureProps {
  noPadding?: boolean;
  returnPath?: string;
  children: React.ReactNode;
  title: string;
  fixedHeader?: boolean;
  headerRender?: GenericComponentType;
  preContentRender?: GenericComponentType;
  cardTop?: boolean,
  padding?: SpacingPatternType;
}

const PrivatePageStructure: React.FC<PageStructureProps> = ({
  children,
  noPadding,
  returnPath,
  title,
  fixedHeader,
  headerRender,
  preContentRender,
  cardTop,
  padding
}) => {
  const { theme } = useTheme();
  const [openAside, setOpenAside] = useState(false);
  const { getMenuOptions } = useMenuContext();

  useLayoutEffect(() => {
    getMenuOptions();
  }, []);

  return (
    <>
      <HeadTitle title={title} />
      <Flexbox flexDirection="row" justify="space-between">
        {/* <LocalSideMenu openAside={openAside} setOpenAside={setOpenAside} /> */}
        <main
          className={`${styles.pageContent} ${openAside ? styles.open : styles.close
            } ${noPadding ? styles.noPadding : ""} ${styles[`theme${theme}`]}`}
        >
          {!fixedHeader && <div className={`${styles.navBarContent}`}>
            <LocalNavBar title={title} returnPath={returnPath} />
          </div>
          }

          <section
            className={`${styles.content} ${openAside ? styles.large : ""} ${noPadding ? styles.noPadding : ""
              }`}
          >
            {fixedHeader ? (
              <div style={{ height: "100vh", maxWidth: "100vw", overflow: "scroll" }}>
                <div className={styles.fixedHeader}>
                  <div className={`${styles.navBarContent}`}>
                    <LocalNavBar title={title} returnPath={returnPath} />
                  </div>
                  <div style={{ width: "100%" }}>
                    {headerRender ?? null}
                  </div>
                  {cardTop && <div className={styles.cardTop} />}
                  <div style={{ paddingRight: 32 }} >
                    {preContentRender ?? null}
                  </div>
                </div>
                <Grid container spacing={padding || "g"} padding={padding || "zero"}>
                  <Grid md={12}>
                    {children}
                  </Grid>
                </Grid>
              </div>
            ) : children}
          </section>
        </main>
      </Flexbox>
    </>
  );
};

export default PrivatePageStructure;
