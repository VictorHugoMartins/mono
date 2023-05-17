import React, { useEffect, useState } from "react";

//Import components
import Button from "~/components/ui/Button/Button";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Icon from "~/components/ui/Icon/Icon";
import { Modal } from "~/components/ui/Modal/Modal";
import NavBar from "~/components/ui/Navigation/NavBar/NavBar";
import NavBarMrAuto from "~/components/ui/Navigation/NavBar/NavBarMrAuto";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";

//Import context
import { useUserContext } from "~/context/global/UserContext";

//Import services
import menuService from "~/services/menu.service";

//Import types
import { RenderMenuType } from "~/types/global/RenderMenuType";

//Import utils
import IsLogged from "~/utils/IsLogged/IsLogged";
import Logout from "~/utils/Logout/Logout";

import styles from "./localNavBar.module.scss";
import useTheme from "~/hooks/useTheme";

import { DropdownMenu } from "~/components/ui/DropdownMenu";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import useWindowDimensions from "~/context/global/useWindowDimensions";

import navBarIcon from "~/assets/images/navBarIcon.png";
import ModalSubscribe from "./components/ModalSubscribe";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

interface FuncionalityItemProps {
  icon: IconTypes;
  title: string;
  description: string;
}

const FuncionalityItem: React.FC<FuncionalityItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Flexbox
      align="flex-start"
      justify={"space-around"}
      width={"33%"}
      className={styles.item}
    >
      <Icon className={styles.backButton} type={icon} size={22} />
      <Flexbox flexDirection="column">
        <Typography component={"h4"}>{title}</Typography>
        <Typography component={"p"}>{description}</Typography>
      </Flexbox>
    </Flexbox>
  );
};

interface MenuProps {
  title: string;
  children: React.ReactNode;
  isAnimation?: boolean;
}
const Menu: React.FC<MenuProps> = ({ title, children, isAnimation }) => {
  // const { theme } = useTheme();

  return (
    <DropdownMenu
      clickableComponent={
        <Flexbox align="center">
          <Typography component="p">{title} </Typography>
          <Icon type="FaChevronDown" size={15} />
        </Flexbox>
      }
      align="left"
      fixed
    >
      <Flexbox
        width={"100%"}
        wrap
        className={`${styles.funcionalitiesMenu} ${styles[`theme${"light"}`]} ${isAnimation && styles.isAnimation}`}
      >
        {children}
      </Flexbox>
    </DropdownMenu>
  );
};

interface ModalLogoutButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

interface NavBarHomeButtonsProps {
  isLogged: boolean;
  isDesktop: boolean;
}

const NavBarHomeButtons: React.FC<NavBarHomeButtonsProps> = ({
  isLogged,
  isDesktop,
}) => {
  return (
    <>
      {!isDesktop && <NavBarHomeMenus />}
      {!isLogged && (
        <Flexbox width={!isDesktop && "100%"}>
          <ModalSubscribe />
        </Flexbox>
      )}
      <Flexbox width={!isDesktop && "100%"}>
        {isLogged ? (
          <Button color="primary" href={"/dashboard"}>
            Ir para dashboard
          </Button>
        ) : (
          <Button color="primary" href={"/login"}>
            Login
          </Button>
        )}
      </Flexbox>
    </>
  );
};

const NavBarHomeMenus: React.FC = ({ }) => {
  return (
    <>
      <Menu title={"Por que o SCManager?"} isAnimation>
        <div className={styles.whyMenu}>
          <div className={styles.menuFlexbox}>
            <Flexbox flexDirection="column" width={"30%"} spacing={"m"}>
              <Typography component="h3">Visão Geral</Typography>
              <hr className={styles.titleUnderline}/>
              <div className={ClassJoin([styles.column, styles.one])}>
                <Typography component="h4">O que é o SCManager?</Typography>
                <Typography component="span">
                  Um sistema de gerenciamento de projetos com foco em
                  aumentar a agilidade e produtividade.
                </Typography>
              </div>
              <div className={ClassJoin([styles.column, styles.one])}>
                <Typography component="h4">Aumente a produtividade</Typography>
                <Typography component="span">
                  Crie projetos, atribua tarefas, gerencie sprints e lançamentos de horas de todo o time.
                </Typography>
              </div>
            </Flexbox>
            <hr className={styles.divider}  />
            <Flexbox flexDirection="column" width={"70%"} spacing={"m"}>
              <Typography component="h3">Controle de Processos</Typography>
              <hr className={styles.titleUnderline}/>
              <Flexbox wrap width={"100%"} spacing={"p"}>
                <div className={ClassJoin([styles.column, styles.two])}>
                  <Typography component="h4">Controle de progresso</Typography>
                  <Typography component="span">
                    Verifique os próximos passos, o progresso do trabalho e o prazo disponível.
                  </Typography>
                </div>
                <div className={ClassJoin([styles.column, styles.two])}>
                  <Typography component="h4">Gerenciamento de equipe</Typography>
                  <Typography component="span">
                    Conecte os membros de sua equipe para que todos saibam
                    exatamente o que precisa ser feito e por quais responsáveis.
                  </Typography>
                </div>
                <div className={ClassJoin([styles.column, styles.two])}>
                  <Typography component="h4">Agilidade de desenvolvimento</Typography>
                  <Typography component="span">
                    Promova um desenvolvimento de tarefas
                    mais eficaz, mantendo a equipe integrada e a par de cada
                    etapa no andamento dos projetos.
                  </Typography>
                </div>
                <div className={ClassJoin([styles.column, styles.two])}>
                  <Typography component="h4">Gestão eficaz</Typography>
                  <Typography component="span">
                    Com o SCManager torna-se mais fácil gerir sua empresa, organizar os
                    processos, delegar funções e tomar decisões com base em dados.
                  </Typography>
                </div>
              </Flexbox>
            </Flexbox>
          </div>
        </div>
      </Menu>
      <Menu title={"Funcionalidades"} isAnimation>
        <FuncionalityItem
          title={"Calendário"}
          description={
            "Com o calendário compartilhado você  e sua equipe ficam atualizados a respeito da agenda de trabalho."
          }
          icon={"FaCalendar"}
        />

        <FuncionalityItem
          title={"Formulários"}
          description={
            "Tenha acesso às solicitações de trabalho e gerencie as tarefas associadas a  cada membro da equipe."
          }
          icon={"FaFile"}
        />

        <FuncionalityItem
          title={"Medidores de progresso"}
          description={
            "Veja o andamento dos projetos por gráficos que comparam a expectativa e realidade do trabalho."
          }
          icon={"FaChartLine"}
        />

        <FuncionalityItem
          title={"Cronograma"}
          description={
            "Acompanhe o avanço das etapas do projeto por um gráfico geral."
          }
          icon={"FaClock"}
        />

        <FuncionalityItem
          title={"Artigos e Vídeos"}
          description={
            "Armazene artigos e vídeos para compartilhar conhecimento com todos os membros da equipe."
          }
          icon={"FaTh"}
        />

        <FuncionalityItem
          title={"Aplicativos para dispositivos móveis"}
          description={
            "Baixe o aplicativo do SC Manager e utilize de suas funcionalidades pelos dispositivos móveis."
          }
          icon={"FaMobile"}
        />

        <FuncionalityItem
          title={"Kanban"}
          description={
            "Gerencie e priorize o trabalho de acordo com o andamento dos processos."
          }
          icon={"FaCheckSquare"}
        />

        <FuncionalityItem
          title={"Geração de relatórios"}
          description={
            "Através dos relatórios você pode acompanhar o progresso do fluxo de trabalho a qualquer momento."
          }
          icon={"FaChartBar"}
        />
      </Menu>
    </>
  );
};
interface HomeNavBarProps {
  returnPath?: string;
  title: string;
}

const HomeNavBar: React.FC<HomeNavBarProps> = ({ returnPath, title }) => {
  const { isDesktop } = useWindowDimensions();
  const [showBurger, setShowBurguer] = useState(false);

  const [menuOptions, setMenuOptions] = useState<RenderMenuType[]>(null);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const { user } = useUserContext();

  const { theme } = useTheme();

  let isLogged = IsLogged();

  const handleLogoutModal = (value: boolean) => {
    setOpenLogoutModal(value);
  };

  useEffect(() => {
    getMenuOptions();
  }, []);

  function getMenuOptions() {
    if (IsLogged()) {
      menuService.getUserMenu("HEADER").then((response) => {
        if (response.success) setMenuOptions(response.object);
      });
    }
  }

  function ModalLogoutButtons({ handleClose }: ModalLogoutButtonsProps) {
    return (
      <Grid container spacing="m">
        <Grid xs={12} md={6}>
          <Button color="primary" text="Sair" onClick={Logout} />
        </Grid>
        <Grid xs={12} md={6}>
          <Button
            color="danger"
            text="Cancelar"
            onClick={(e) => {
              handleClose(e);
              handleLogoutModal(false);
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <NavBar inHome>
      <Flexbox flexDirection="column">
        {!isDesktop && <img className={styles.brandImg} src={navBarIcon} />}
        {isDesktop && (
          <Flexbox
            className={`${styles.options}`}
            align="center"
            spacing="m"
          >
            <img className={styles.brandImg} src={navBarIcon} />
            <NavBarHomeMenus />
          </Flexbox>
        )}
        {!isDesktop && showBurger === true && (
          <div style={{ width: "30vw", minWidth: "300px" }}>
            <Flexbox
              className={`${styles.options}`}
              align="flex-start"
              spacing="m"
              width={"30vw"}
            >
              <NavBarHomeButtons isLogged={isLogged} isDesktop={isDesktop} />
            </Flexbox>
          </div>
        )}
      </Flexbox>
      <NavBarMrAuto />
      <Flexbox align="center" spacing="m">
        {isDesktop && <NavBarHomeButtons isLogged={isLogged} isDesktop />}
        {!isDesktop && (
          <div
            className={styles.burgerMenuButton}
            onClick={() => {
              setShowBurguer(!showBurger);
            }}
          >
            <Icon type="FaBars" size={22} className={styles.burgerIcon} />
          </div>
        )}
        <Modal
          title="Deseja sair?"
          openExternal={openLogoutModal}
          hideOpenButton
        >
          <ModalLogoutButtons />
        </Modal>
      </Flexbox>

    </NavBar>
  );
};

export default HomeNavBar;
