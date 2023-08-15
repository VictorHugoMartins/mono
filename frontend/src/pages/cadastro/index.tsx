import LoginPageStructure from "../../components/structure/LoginPageStructure";
import Box from "../../components/ui/Layout/Box/Box";
import Container from "../../components/ui/Layout/Container/Container";
import { Grid } from "../../components/ui/Layout/Grid";
import Typography from "../../components/ui/Typography/Typography";
import Toast from "../../utils/Toast/Toast";
import React, { useEffect, useState } from "react";
import loginroute from "~/routes/login.route";
import { API_AUTH } from "~/config/apiRoutes/auth";
import FormPageStructure from "~/components/structure/FormPageStructure";
import { InputRenderType } from "~/types/global/InputRenderType";
import { ObjectResponse } from "~/types/global/ObjectResponse";

const Register: React.FC = () => {
  const [_registerResponseData, setRegisterResponseData] = useState<ObjectResponse>();
  const [_responseData, setResponseData] = useState<any>();

  useEffect(() => {
    if (_registerResponseData) {
      console.log(_registerResponseData)
      setResponseData(_registerResponseData.response)
    }
  }, [_registerResponseData])

  useEffect(() => {
    if (_responseData && _responseData.name)
      window.location.assign(`/quasela?name=${_responseData.name}&email=${_responseData.email}`);
  }, [_responseData])

  const register = (data: any) => {
    if (data.password !== data.confirmPassword) {
      Toast.error("As senhas devem ser iguais!");
      return;
    }
    const apiUrl = API_AUTH.REGISTER() 
    const requestData = {
      email: data.email,
      name: data.name,
      password: data.password,
      confirmPassword: data.confirmPassword
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
          window.location.assign(`/quasela?name=${_responseData.name}&email=${_responseData.email}`);
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
              <FormPageStructure
                setObjectReturn={setRegisterResponseData}
                buildPath={'/super_survey/build'}
                submitPath={API_AUTH.REGISTER()}
                buttonSubmitText="Solicitar cadastro"
                onSuccess={(e) => {
                  Toast.success(
                    "Filtros aplicados com sucesso!"
                  );
                }}
                buildObject={[
                  {
                    label: "Nome completo",
                    name: "name",
                    type: "text",
                    required: true
                  },
                  {
                    label: "E-mail",
                    name: "email",
                    type: "text",
                    required: true,
                  }
                ] as InputRenderType[]}
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Form
            externalSubmit={register}
            validation={[
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
                  name="email"
                  type="email"
                  label="E-mail"
                  required
                />
              </Grid>
              <Grid>
                <ErrorForm />
              </Grid>
              <Grid xs={12}>
                <SubmitButton color="primary" text="Solicitar Cadastro" loading={requesting} />
              </Grid>
            </Grid>
          </Form>
        </Box> */}
      </Container>
    </LoginPageStructure>
  );
};

export default loginroute(Register);
