import React, { useEffect, useState } from "react";

//Import components
import { DropdownLogoutOption } from "~/components/ui/Dropdown";
import Button from "~/components/ui/Button/Button";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Icon from "~/components/ui/Icon/Icon";
import Link from "~/components/ui/Link/Link";
import { Modal } from "~/components/ui/Modal/Modal";
import NavBar, {
  NavbarDropdown,
  NavbarDropdownItem,
} from "~/components/ui/Navigation/NavBar/NavBar";
import NavBarMrAuto from "~/components/ui/Navigation/NavBar/NavBarMrAuto";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";

//Import utils
import Logout from "~/utils/Logout/Logout";

import styles from "./localNavBar.module.scss";
import { parseCookies } from "nookies";
import RedirectTo from "~/utils/Redirect/Redirect";
import NavbarVersion from "~/components/ui/Navigation/NavBar/Navbarversion";

interface ModalLogoutButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

interface LocalNavBarProps {
  returnPath?: string;
  title: string;
  publicPage?: boolean;
  hideLoginButton?: boolean;
}

const LocalNavBar: React.FC<LocalNavBarProps> = ({ hideLoginButton, returnPath, title, publicPage }) => {
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const { userId, userName, permission } = parseCookies();

  let isLogged = userId && userName // isLogged();

  const handleLogoutModal = (value: boolean) => {
    setOpenLogoutModal(value);
  };

  useEffect(() => {
    getMenuOptions();
  }, []);

  function getMenuOptions() {
    // if (IsLogged()) {
    //   menuService.getUserMenu("HEADER").then((response) => {
    //     if (response.success) setMenuOptions(response.object);
    //   });
    // }
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
    <NavBar noFixed publicPage={publicPage}>
      <Flexbox flexDirection="column">
        <Flexbox
          className={`${styles[`theme${'light'}`]} ${styles.title}`}
          align="center"
          spacing="m"
        >
          {returnPath && (
            <Link to={returnPath}>
              <Icon
                className={styles.backButton}
                type="FaAngleLeft"
                size={22}
              />
            </Link>
          )}
          <Typography component={"h2"}>{title}</Typography>
        </Flexbox>
      </Flexbox>
      <NavBarMrAuto />
      <Flexbox align="center" spacing="xg">
        {isLogged ? (
          <>
            {<NavbarDropdown
              buttonContent={
                <>
                  <div
                    style={{
                      height: 30, width: 30, borderRadius: "100%", backgroundColor: "#fff", color: "black", fontSize: "20px",
                      textTransform: "uppercase", textAlign: "center", verticalAlign: "middle", lineHeight: "30px"
                    }}>
                    {userName ? userName[0] : "-"}
                  </div>
                  {/* <Avatar alt={user?.name} image={user?.profileImage.file} /> */}
                </>
              }
            >
              <NavbarDropdownItem
                href="/minhaspesquisas"
                label="Minhas Pesquisas"
              />
              <NavbarDropdownItem
                href="/novapesquisa"
                label="Iniciar Nova Pesquisa"
              />
              {permission === "adm" &&
                <NavbarDropdownItem
                  href="/adm/usuarios/lista"
                  label="Gerenciar usuários"
                />
              }
              <NavbarDropdownItem
                href="/usuario/editar"
                label="Editar Usuário"
              />
              <NavbarDropdownItem
                href="/usuario/trocarsenha"
                label="Trocar Senha"
              />
              {/* <ThemeSetter /> */}
              <DropdownLogoutOption
                href="#"
                text="Sair"
                onClick={() => handleLogoutModal(true)}
              />
              <NavbarVersion />
            </NavbarDropdown>}
          </>
        ) :
          !hideLoginButton &&
          <Button color="primary" text="Login ou Cadastro" onClick={() => RedirectTo("/login")} />
        }
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

export default LocalNavBar;
