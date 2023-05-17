import React from "react";
import { GetServerSideProps } from "next";

import LoginPageStructure from "~/components/structure/LoginPageStructure";
import Container from "~/components/ui/Layout/Container/Container";
import Box from "~/components/ui/Layout/Box/Box";
import Form from "~/components/ui/Form/Form";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";

import loginroute from "~/routes/login.route";

import accountService from "~/services/account.service";

import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

interface ResetPasswordProps {
  code: string;
  email: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ code, email }) => {
  async function submit({ password, confirmPassword }) {
    let data = {
      email: email,
      password: password,
      code: code,
    };

    const response = await accountService
      .resetPassword(data)
      .then((response) => {
        if (response.success) {
          Toast.success(
            "Sua senha redefinida com sucesso, realize o login para continuar!"
          );
          RedirectTo("/login");
          return null;
        }
        return { message: response.message, errors: response.errors };
      });

    return response;
  }

  return (
    <LoginPageStructure>
      <Container>
        <Box align="center" justify="center" maxWidth="xs">
          <Form
            externalSubmit={submit}
            validation={[
              {
                name: "password",
                required: true,
                type: "password",
                label: "Senha",
                min: null,
                max: null,
              },
              {
                name: "confirmPassword",
                required: true,
                type: "password",
                label: "Confirmar senha",
                min: null,
                max: null,
                confirm: "password",
              },
            ]}
          >
            <Grid container spacing={"xg"}>
              <Grid xs={8}>
                <Typography component="h2" align="center" color="primary">
                  Forneça seu email e sua nova senha:
                </Typography>
              </Grid>
              <Grid xs={8}>
                <TextInputForm
                  name="password"
                  type="password"
                  label="Senha"
                  required
                />
              </Grid>
              <Grid xs={8}>
                <TextInputForm
                  name="confirmPassword"
                  type="password"
                  label="Confirmar senha"
                  required
                />
              </Grid>
              <Grid xs={8}>
                <SubmitButton color="primary" text="Enviar" type="submit" />
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Code, Email } = ctx.query;

  if (!Code && !Email) {
    return {
      notFound: true,
    };
  }

  return { props: { code: Code, email: Email } };
};

export default loginroute(ResetPassword);
