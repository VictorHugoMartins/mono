import LoginPageStructure from "../../components/structure/LoginPageStructure";
import ErrorForm from "../../components/ui/Form/ErrorForm";
import Form from "../../components/ui/Form/Form";
import SubmitButton from "../../components/ui/Form/SubmitButton/SubmitButton";
import TextInputForm from "../../components/ui/FormInputs/TextInputForm";
import Box from "../../components/ui/Layout/Box/Box";
import Container from "../../components/ui/Layout/Container/Container";
import { Grid } from "../../components/ui/Layout/Grid";
import Toast from "../../utils/Toast/Toast";
import React from "react";
import loginroute from "~/routes/login.route";
import { API_AUTH } from "~/config/apiRoutes/auth";
// import loginroute from "~/routes/login.route";

const ForgotPassword: React.FC = () => {
  const change_password = (data: any) => {
    if (data.password !== data.confirmPassword) {
      Toast.error("As senhas devem ser iguais!")
      return;
    }
    const apiUrl = API_AUTH.CHANGE_PASSWORD(); 
    const requestData = {
      email: data.email,
      password: data.password
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    };

    const resp = fetch(apiUrl, requestOptions)
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // setUser(data.object);
          Toast.success(data.message)
          window.location.assign("/");
        } else {
          Toast.error(data.message)
        }

        return data
      })
      .catch(error => Toast.error(error));

    return null;
  };

  return (
    <LoginPageStructure title="Login">
      <Container>
        <Box align="center" justify="center" maxWidth="xs">
          <Form
            externalSubmit={change_password}
            validation={[
              {
                name: "email",
                required: true,
                type: "email",
                label: "E-mail:",
                min: null,
                max: null,
              },
              {
                name: "password",
                required: true,
                type: "password",
                label: "Senha",
                min: null,
                max: null,
              },
            ]}
          >
            <Grid container spacing={"g"} >
              <Grid xs={12}>
                <TextInputForm
                  name="email"
                  type="email"
                  label="E-mail"
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="password"
                  type="password"
                  label="Nova Senha"
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="confirmPassword"
                  type="password"
                  label="Confirmar Nova Senha"
                  required
                />
              </Grid>
              <Grid>
                <ErrorForm />
              </Grid>
              <Grid xs={12}>
                <SubmitButton color="primary" text="Atualizar senha" type="submit" />
                {/* loading={requesting} /> */}
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export default loginroute(ForgotPassword);    