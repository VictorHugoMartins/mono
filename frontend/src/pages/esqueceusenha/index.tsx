import React, { useState } from "react";

//Import components
import LoginPageStructure from "~/components/structure/LoginPageStructure";
import Form from "~/components/ui/Form/Form";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import Box from "~/components/ui/Layout/Box/Box";
import Container from "~/components/ui/Layout/Container/Container";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";
import accountService from "~/services/account.service";
import loginroute from "~/routes/login.route";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";

const ForgotPassword: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);

  async function submit({ email }) {
    const response = await accountService
      .forgotPassword(email)
      .then((response) => {
        setSuccess(response.success);
        if (!response.success)
          return { message: response.message, errors: response.errors };
        return null;
      });

    return response;
  }

  return (
    <LoginPageStructure>
      <Container>
        <Box align="center" justify="center" maxWidth="xs">
          {success ? (
            <Grid container spacing={"xg"}>
              <Grid xs={12}>
                <Typography component="h1" align="center" color="primary">
                  Email enviado com sucesso.
                </Typography>
                <Typography component="h6" align="center" color="primary">
                  Enviamos um link de alteração de senha para o seu email
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Form
              externalSubmit={submit}
              validation={[
                {
                  name: "email",
                  required: true,
                  type: "email",
                  label: "E-mail",
                  min: null,
                  max: null,
                },
              ]}
            >
              <Grid container spacing={"xg"}>
                <Grid xs={12}>
                  <Typography component="h1" align="center" color="primary">
                    Esqueceu a senha?
                  </Typography>
                  <Typography component="h4" align="center" color="primary">
                    Forneça seu email para criar uma nova:
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <TextInputForm
                    name="email"
                    type="email"
                    label="E-mail"
                    required
                  />
                </Grid>
                <Grid xs={12}>
                  <SubmitButton color="primary" text="Enviar" type="submit" />
                </Grid>
              </Grid>
            </Form>
          )}
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export default loginroute(ForgotPassword);
