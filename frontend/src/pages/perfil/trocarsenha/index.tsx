import React from "react";

//Import components
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import ErrorForm from "~/components/ui/Form/ErrorForm";
import Form from "~/components/ui/Form/Form";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import Button from "~/components/ui/Button/Button";
import Box from "~/components/ui/Layout/Box/Box";
import Container from "~/components/ui/Layout/Container/Container";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";
import accountService from "~/services/account.service";
import Toast from "~/utils/Toast/Toast";
import Logout from "~/utils/Logout/Logout";

const ResetPassword: React.FC = () => {
  async function submit({ oldPassword, newPassword, newPasswordConfirm }) {
    const response = await accountService
      .resetPasswordSignIn({ newPassword, oldPassword })
      .then((response) => {
        if (!response.success) {
          return { message: response.message, errors: response.errors };
        } else {
          Toast.success(response.message);
          Toast.success("Relogue com a nova senha");
          setTimeout(() => {
            Logout();
          }, 2000);

          return null;
        }
      });

    return response;
  }

  return (
    <PrivatePageStructure title={"Trocar Senha"}>
      <Container>
        <Box align="center" justify="flex-start" maxWidth="xs">
          <Form
            externalSubmit={submit}
            validation={[
              {
                name: "oldPassword",
                required: true,
                type: "password",
                label: "Senha Atual",
                min: null,
                max: null,
              },
              {
                name: "newPassword",
                required: true,
                type: "password",
                label: "Nova Senha",
                min: null,
                max: null,
              },
              {
                name: "newPasswordConfirm",
                required: true,
                type: "password",
                label: "Confirmar Nova Senha",
                min: null,
                max: null,
                confirm: "newPassword",
              },
            ]}
          >
            <Grid container spacing="xg" spacingResponsive={{ sm: "m" }}>
              <Grid xs={8}>
                <Typography component="h1" align="center" color="primary">
                  Trocar Senha
                </Typography>
                <Typography component="h6" align="center" color="primary">
                  Digite sua nova senha abaixo
                </Typography>
              </Grid>
              <Grid xs={8}>
                <TextInputForm
                  name="oldPassword"
                  type="password"
                  label="Senha Atual"
                  required
                />
              </Grid>
              <Grid xs={8}>
                <TextInputForm
                  name="newPassword"
                  type="password"
                  label="Nova Senha"
                  required
                />
              </Grid>
              <Grid xs={8}>
                <TextInputForm
                  name="newPasswordConfirm"
                  type="password"
                  label="Confirmar Nova Senha"
                  required
                />
              </Grid>
              <Grid xs={8}>
                <ErrorForm />
              </Grid>
              <Grid xs={8}>
                <Button color="primary" text="Salvar" type="submit" />
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </PrivatePageStructure>
  );
};

export default ResetPassword;
