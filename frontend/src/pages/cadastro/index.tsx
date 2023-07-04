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
import loginroute from "~/routes/login.route";
import { BASE_API_URL } from "~/config/apiBase";

const Register: React.FC = () => {
  // const { requesting, register } = useAuthContext();
  const register = (data: any) => {
    if (data.password !== data.confirmPassword) {
      Toast.error("As senhas devem ser iguais!")
      return;
    }
    const apiUrl = `${BASE_API_URL}/api/register` // url da API Flask
    const requestData = {
      email: data.email,
      name: data.name,
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword
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
          window.location.assign(`/quasela?name=${data.object.name}&email=${data.object.email}`);
        } else {
          Toast.error(data.message)
        }

        return data
      })
      .catch(error => Toast.error(error));

    return null;
  };

  return (
    <LoginPageStructure title="Cadastro">
      <Container>
        <Box align="center" justify="center" maxWidth="xs">
          <Form
            externalSubmit={register}
            validation={[
              {
                name: "username",
                required: true,
                type: "string",
                label: "Nome de usuário:",
                min: null,
                max: null,
              },
              {
                name: "email",
                required: true,
                type: "string",
                label: "E-mail",
                min: null,
                max: null,
              },
            ]}
          >
            <Grid container spacing={"g"} >
              <Grid xs={12}>
                <Typography component="h1" align="center" color="primary">
                  Cadastro
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography component="p" align="center" color="primary">
                  Preencha os dados para solicitar permissão para acessar o sistema.
                  Caso sua solicitação for aceita, você receberá um e-mail informando os seus dados de acesso.
                </Typography>
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="name"
                  type="text"
                  label="Nome Completo"
                  required
                />
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
                  name="email"
                  type="email"
                  label="E-mail"
                  required
                />
              </Grid>
              {/* <Grid xs={12}>
                <TextInputForm
                  name="password"
                  type="password"
                  label="Senha"
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextInputForm
                  name="confirmPassword"
                  type="password"
                  label="Confirmar Senha"
                  required
                />
              </Grid> */}
              <Grid>
                <ErrorForm />
              </Grid>
              <Grid xs={12}>
                <SubmitButton color="primary" text="Solicitar Cadastro" type="submit" />
                {/* loading={requesting} /> */}
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </LoginPageStructure>
  );
};

export default loginroute(Register);
