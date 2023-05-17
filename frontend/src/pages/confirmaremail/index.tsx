import React from "react";
import { GetServerSideProps } from "next";

import LoginPageStructure from "~/components/structure/LoginPageStructure";
import Button from "~/components/ui/Button/Button";
import Box from "~/components/ui/Layout/Box/Box";
import Container from "~/components/ui/Layout/Container/Container";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";

import accountService from "~/services/account.service";

interface ConfirmarEmailProps {}

const ConfirmarEmail: React.FC<ConfirmarEmailProps> = () => {
  return (
    <LoginPageStructure>
      <Container>
        <Box align="center" justify="center" maxWidth="xs">
          <Grid container spacing={"xg"}>
            <Grid xs={8}>
              <Typography component="h1" align="center" color="primary">
                Parabens, seu email foi confirmado!
              </Typography>
              <Typography component="h6" align="center" color="primary">
                Para continuar realize o login clicando abaixo:
              </Typography>
              <Button href="/login" color="primary">
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Code, UserId } = ctx.query;

  let response = await accountService.confirmEmail(Code, UserId);

  if (!response) {
    return {
      notFound: true,
    };
  }

  return { props: { accept: response } };
};

export default ConfirmarEmail;
