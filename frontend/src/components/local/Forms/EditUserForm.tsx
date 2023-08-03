import Toast from "~/utils/Toast/Toast";
import Form from "../../ui/Form/Form";
import TextInputForm from "../../ui/FormInputs/TextInputForm";
import { Grid } from "../../ui/Layout/Grid";
import ErrorForm from "../../ui/Form/ErrorForm";
import SubmitButton from "../../ui/Form/SubmitButton/SubmitButton";
import { parseCookies } from "nookies";
import { API_AUTH } from "~/config/apiRoutes/auth";

export default function EditUserForm() {
  const { userId } = parseCookies();

  const edit_user = (data: any) => {
    const apiUrl = API_AUTH.EDIT_USER(); // url da API Flask
    const requestData = {
      email: data.email,
      name: data.name,
      userId: userId,
    };

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
    <>
      <Form externalSubmit={edit_user} >
        <Grid container spacing={"g"} >
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
            <SubmitButton color="primary" text="Atualizar dados" type="submit" />
            {/* loading={requesting} /> */}
          </Grid>
        </Grid>
      </Form>
    </>
  )
}