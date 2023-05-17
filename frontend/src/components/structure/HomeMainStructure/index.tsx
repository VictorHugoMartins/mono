import React, { useEffect, useState } from "react";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import styles from "./homeInitialStructure.module.scss";
import Typography from "~/components/ui/Typography/Typography";
import dashBoards from "~/assets/images/dashboards2.png";
import projects from "~/assets/images/HomeNewBackGround.png";
import Footer from "~/components/ui/Footer";

const HomeMainStructure: React.FC = () => {
  const [windowIsLoaded, setWindowIsLoaded] = useState<number>(0);

  useEffect(() => {
    if (typeof window) {
      setTimeout(() => {
        setWindowIsLoaded(window.innerWidth);
      }, 500);
    }
  }, []);
  return (
    <>
      <section className={styles.homeBanner} style={{ width: "100%" }}>
        <div className={styles.centerImage} />
      </section>
      <section className={styles.homeSectionProjects}>
        <Flexbox className={styles.projectDescriptionContainer}>
          <Typography component="h2">Gerenciamento de Projetos</Typography>
          <Typography component="p">
            Utilize as funcionalidades do SC Manager para planejar, executar,
            monitorar e controlar o desenvolvimento de projetos com organização
            e eficiência.
          </Typography>
        </Flexbox>
        <Flexbox className={styles.projectsDashBoardsContainer}>
          <img className={styles.imageDashBoards} src={dashBoards} />
        </Flexbox>
      </section>
      <section className={styles.manageWorkflowContainer}>
        <Flexbox className={styles.worflowImagesContainer}>
          <img className={styles.projectsImage} src={projects} />
        </Flexbox>
        <Flexbox
          align={"flex-end"}
          className={styles.projectDescriptionContainer}
        >
          <Typography align="end" component="h2">
            Gestão de Fluxo de Trabalho
          </Typography>
          <Typography align="end" component="p">
            Coordene o progresso do trabalho de suas equipes de maneira
            atualizada e automatizada e, através dos relatórios você pode
            acompanhar o progresso do fluxo de trabalho a qualquer momento.
          </Typography>
        </Flexbox>
      </section>
      <Footer />
    </>
  );
};

export default HomeMainStructure;
