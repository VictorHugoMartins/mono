import React, { useLayoutEffect, useState } from "react";

import Form from "~/components/ui/Form/Form";
import { Grid } from "~/components/ui/Layout/Grid";
import PageHead from "~/components/ui/PageHead";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";

import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

import formService from "~/services/form.service";

interface ConfigurationFormPageProps {
  title: string;
  preparePath?: string;
}

const ConfigurationFormPage: React.FC<ConfigurationFormPageProps> = ({
  title,
  preparePath,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userAdmins, setUserAdmins] = useState([]);

  useLayoutEffect(() => {
    _buildForm();
  }, []);

  async function _buildForm() {
    let response = await formService.build("/Management/Build");

    if (response.find((x) => x.name === "stateId").options)
      setStates(response.find((x) => x.name === "stateId").options);
    if (response.find((x) => x.name === "cityId").options)
      setCities(response.find((x) => x.name === "cityId").options);
    if (response.find((x) => x.name === "userAdminId").options)
      setUserAdmins(response.find((x) => x.name === "userAdminId").options);
  }

  return (
    <>
      <PageHead returnUrl={"/adm/gerencias/lista"} title={title} />
      <Form
        postUrl="/Management/Save"
        getUrl={preparePath}
        onSuccess={() => {
          Toast.success("Salvo com sucesso!");
          RedirectTo("/adm/gerencias/lista");
        }}
      >
        <Grid container spacing={"g"} spacingResponsive={{ sm: "m" }}>
          <Grid>
            <TextInputForm name="name" required label="Nome" />
          </Grid>
          <Grid>
            <TextInputForm name="alias" required label="Apelido" />
          </Grid>
          <Grid>
            <TextInputForm name="branch" required label="Ramo" />
          </Grid>
          <Grid>
            <TextInputForm name="cnpjCpf" required label="Cnpj/Cpf" />
          </Grid>
          <Grid>
            <SelectForm
              name="stateId"
              label="Estado"
              required
              options={states}
            />
          </Grid>
          <Grid>
            <SelectForm
              name="cityId"
              label="Cidade"
              required
              options={cities}
              listenId="stateId"
            />
          </Grid>
          <Grid>
            <SelectForm
              name="userAdminId"
              label="Usuário Administrador"
              required
              options={userAdmins}
            />
          </Grid>
          <Grid container>
            <SubmitButton color="primary" text="Salvar" />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ConfigurationFormPage;
