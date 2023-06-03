import { useUserContext } from "~/context/global/UserContext";
import LoginPageStructure from "../../components/structure/LoginPageStructure";
import ErrorForm from "../../components/ui/Form/ErrorForm";
import Form from "../../components/ui/Form/Form";
import SubmitButton from "../../components/ui/Form/SubmitButton/SubmitButton";
import TextInputForm from "../../components/ui/FormInputs/TextInputForm";
import Box from "../../components/ui/Layout/Box/Box";
import Container from "../../components/ui/Layout/Container/Container";
import Flexbox from "../../components/ui/Layout/Flexbox/Flexbox";
import { Grid } from "../../components/ui/Layout/Grid";
import Typography from "../../components/ui/Typography/Typography";
import Toast from "../../utils/Toast/Toast";
import React from "react";
import { setCookie } from "nookies";
import loginroute from "~/routes/login.route";
import { Link } from "@material-ui/core";
import { BASE_API_URL } from "~/config/apiBase";
// import loginroute from "~/routes/login.route";

const Login: React.FC = () => {
  const { setUser } = useUserContext();

  // const { requesting, signIn } = useAuthContext();
  const signIn = (data: any) => {
    const apiUrl = `${BASE_API_URL}/api/login`; // url da API Flask
    const requestData = {
      username: data.username,
      password: data.password
    }; // dados de login a serem enviados na requisição

    // Configuração do cabeçalho da requisição
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    };

    // Realiza a requisição para a API Flask
    const resp = fetch(apiUrl, requestOptions)
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // setUser(data.object);
          setCookie(undefined, 'userId', data.object.user_id, {
            maxAge: 60 * 60 * 24, //24 hours
            path: "/",
          });
          setCookie(undefined, 'userName', data.object.name, {
            maxAge: 60 * 60 * 24, //24 hours
            path: "/",
          });
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
            externalSubmit={signIn}
            validation={[
              {
                name: "username",
                required: true,
                type: "username",
                label: "Nome de usuário:",
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
                <Typography component="h1" align="center" color="primary">
                  Login
                </Typography>
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="username"
                  type="text"
                  label="Nome de usuário"
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="password"
                  type="password"
                  label="Senha"
                  required
                />
              </Grid>
              <Grid>
                <ErrorForm />
              </Grid>
              <Grid xs={12}>
                <SubmitButton color="primary" text="Entrar" type="submit" />
                {/* loading={requesting} /> */}
              </Grid>
              <Grid xs={12}>
                <Flexbox justify="space-between">
                  <Link href={"/cadastro"}>Quero me cadastrar</Link>
                  <Link href={"/esqueceusenha"}>Esqueceu a senha?</Link>
                </Flexbox>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export default loginroute(Login);
