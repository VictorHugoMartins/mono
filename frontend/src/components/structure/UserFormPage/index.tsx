import React, { useLayoutEffect, useState } from "react";

//Import components
import Button from "~/components/ui/Button/Button";
import Form from "~/components/ui/Form/Form";
import HideInput from "~/components/ui/Form/HideInput";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import CheckboxGroupForm from "~/components/ui/FormInputs/CheckboxGroupForm";
import FileInputForm from "~/components/ui/FormInputs/FileInputForm";
import HiddenInputForm from "~/components/ui/FormInputs/HiddenInputForm";
import InputMaskForm from "~/components/ui/FormInputs/InputMaskForm";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

//Import config
import { API_USER } from "~/config/apiRoutes/user";

//Import services
import formService from "~/services/form.service";
import userService from "~/services/user.service";

//Import types
import { CreateUserType, FormUserType } from "~/types/api/UserTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";

//Import utils
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

import { CreateUserValidation, UserValidation } from "./user.validation";

interface UserFormPageProps {
  title: string;
  token?: string;
}

type OptionsUserForm = {
  managements: SelectObjectType[];
  organizations: SelectObjectType[];
  roles: SelectObjectType[];
};

const UserFormPage: React.FC<UserFormPageProps> = ({ title, token }) => {
  const [initialState, setInitialState] = useState<
    CreateUserType | FormUserType
  >();
  const [_loading, setLoading] = useState<boolean>(true);
  const [_options, setOptions] = useState<OptionsUserForm>({
    managements: [],
    organizations: [],
    roles: [],
  });

  const _validation = token ? UserValidation : CreateUserValidation;
  const _url = token ? API_USER.UPDATE() : API_USER.CREATE();
  const _urlReturn = "/adm/usuarios/lista";

  useLayoutEffect(() => {
    _buildForm();
  }, []);

  async function _buildForm() {
    if (token) {
      let initialData = await userService.prepare(token);

      setInitialState(initialData);
    }

    let initialOptions = await formService.getFormOptions(
      API_USER.FORMOPTIONS()
    );

    setOptions({ ..._options, ...initialOptions });

    setLoading(false);
  }

  function _returnPage() {
    RedirectTo(_urlReturn);
  }

  return (
    <>
      <PopupLoading show={_loading} />
      <Form
        validation={_validation}
        postUrl={_url}
        initialData={initialState}
        isMessageApi={true} 
        onSuccess={(e) => {
          //console.log("valores",e);
          //Toast.success("Salvo com sucesso!");
          RedirectTo("/adm/usuarios/lista");
        }}
      >
        <Grid container spacing={"xg"}>
          <HiddenInputForm name="id" />
          <Grid>
            <FileInputForm
              name="profileImage"
              type="image"
              crop
              label="Imagem de Perfil"
            />
          </Grid>
          <Grid>
            <TextInputForm name="name" required label="Nome" />
          </Grid>
          <Grid>
            <TextInputForm name="lastName" required label="Sobrenome" />
          </Grid>
          <Grid>
            <TextInputForm
              name="email"
              disabled={token ? true : false}
              type="email"
              required
              label="E-mail"
            />
          </Grid>
          <HideInput
            inputName="id"
            validation="empty"
            defaultValue={{ name: "passwordHash", value: null }}
          >
            <Grid>
              <TextInputForm
                name="passwordHash"
                type="password"
                required
                label="Senha"
              />
            </Grid>
          </HideInput>
          <Grid>
            <TextInputForm
              name="workLoad"
              label="Carga Horária"
              type="number"
            />
          </Grid>
          <Grid>
            <TextInputForm
              name="area"
              required
              label="Area"
              defaultValue={""}
            />
          </Grid>
          <Grid>
            <TextInputForm name="alias" required label="Ramo" />
          </Grid>
          <Grid>
            <InputMaskForm
              name="phoneNumber"
              mask="phone"
              required
              label="Telefone"
            />
          </Grid>
          <Grid md={4}>
            <CheckboxGroupForm
              name="roles"
              label="Perfil"
              required
              options={_options.roles}
            />
          </Grid>
          <HideInput
            inputName="roles"
            inputValue={"Mind"}
            validation={"exclude"}
            defaultValue={{ name: "managementsId", value: [] }}
          >
            <Grid md={4}>
              <CheckboxGroupForm
                name="managementsId"
                label="Gerência"
                required
                options={_options.managements}
              />
            </Grid>
          </HideInput>
          <HideInput
            inputName="roles"
            inputValue={"Cliente"}
            validation={"include"}
            defaultValue={{ name: "organizationId", value: 0 }}
          >
            <Grid>
              <SelectForm
                name="organizationId"
                label="Organização"
                required
                options={_options.organizations}
              />
            </Grid>
          </HideInput>
          <Grid container spacing={"xg"}>
            <Grid xs={12} md={6}>
              <Button
                color="danger"
                text={"Cancelar"}
                type="button"
                onClick={_returnPage}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <SubmitButton color="primary" text="Salvar" />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default UserFormPage;
