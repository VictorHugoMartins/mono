import Toast from "~/utils/Toast/Toast";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import { Grid } from "~/components/ui/Layout/Grid";
import ErrorForm from "~/components/ui/Form/ErrorForm";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import { parseCookies } from "nookies";
import { BASE_API_URL } from "~/config/apiBase";
import Form from "~/components/ui/Form/Form";
import { API_AUTH } from "~/config/apiRoutes/auth";

function ChangePasswordForm() {
  const { userId } = parseCookies();

  const change_password = (data: any) => {
    if (data.password !== data.confirmPassword) {
      Toast.error("As senhas devem ser iguais!")
      return;
    }
    const apiUrl = API_AUTH.CHANGE_PASSWORD(); // url da API Flask
    const requestData = {
      password: data.password,
      userId: userId,
    }; // dados de login a serem enviados na requisição
    console.log(requestData);

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
    <Form
      externalSubmit={change_password}
      validation={[
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
  )
}

export default ChangePasswordForm;