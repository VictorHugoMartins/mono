import React, { useEffect, useLayoutEffect, useState } from "react";

//Import components
import Button from "~/components/ui/Button/Button";
import Form from "~/components/ui/Form/Form";
import HideInput from "~/components/ui/Form/HideInput";
import { useHookFormContext } from "~/components/ui/Form/HookForm/HookForm";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import DateInputForm from "~/components/ui/FormInputs/DateInputForm";
import HiddenInputForm from "~/components/ui/FormInputs/HiddenInputForm";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import TextAreaForm from "~/components/ui/FormInputs/TextAreaForm";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import PageHead from "~/components/ui/PageHead";
import Typography from "~/components/ui/Typography/Typography";

//Import config
import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";

//Import services
import formService from "~/services/form.service";
import workingHoursService, {
  RemainingPointsType,
} from "~/services/workinghours.service";

//Import types
import { SelectObjectType } from "~/types/global/SelectObjectType";

//Import utils
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

interface WorkingHoursFormPageProps {
  title?: string;
  token?: string;
  urlReturn: string;
  adm?: boolean;
  multiple?: boolean;
}

type OptionsUserForm = {
  projects: SelectObjectType[];
  users: SelectObjectType[];
  sprints: SelectObjectType[];
  projectItens: SelectObjectType[];
  tickets: SelectObjectType[];
};

const WorkingHoursFormPage: React.FC<WorkingHoursFormPageProps> = ({
  adm,
  multiple,
  title,
  token,
  urlReturn,
}) => {
  const [initialState, setInitialState] = useState<any>();
  const [_loading, setLoading] = useState<boolean>(true);
  const [_options, setOptions] = useState<OptionsUserForm>({
    projects: [],
    users: [],
    sprints: [],
    projectItens: [],
    tickets: [],
  });

  const _minDate = !adm
    ? new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 7
      )
        .toJSON()
        .slice(0, 10)
    : null;

  const _maxDate = !adm ? new Date().toJSON().slice(0, 10) : null;

  const _urlFormOptions = adm
    ? API_WORKINGHOURS.FORMOPTIONSADM()
    : API_WORKINGHOURS.FORMOPTIONS();

  useLayoutEffect(() => {
    _buildForm();
  }, []);

  async function _buildForm() {
    if (token) {
      let initialData = await formService.prepare(
        API_WORKINGHOURS.PREPARE(token)
      );

      setInitialState(initialData);
    }

    let initialOptions = await formService.getFormOptions(_urlFormOptions);

    setOptions({ ..._options, ...initialOptions });
    setLoading(false);
  }

  async function _submitForm(data: any) {
    let response = await workingHoursService.save(data, multiple);

    if (!response.success) {
      return {
        message: response.message,
        errors: response.errors,
      };
    }
    return null;
  }

  function _returnPage() {
    RedirectTo(urlReturn);
  }

  return (
    <>
      <PopupLoading show={_loading} />
      {title && <PageHead title={title} returnUrl={urlReturn} />}
      <Form
        externalSubmit={_submitForm}
        initialData={initialState}
        onSuccess={() => {
          Toast.success("Salvo com sucesso!");
          _returnPage();
        }}
      >
        <Grid container spacing={"xg"}>
          <HiddenInputForm name="id" />
          <Grid md={adm ? 3 : 4}>
            <SelectForm
              name="projectId"
              label="Projeto"
              required
              options={_options.projects}
            />
          </Grid>
          {adm && (
            <Grid md={3}>
              <SelectForm
                name="userAssignmentId"
                label="Usuário"
                required
                options={_options.users}
              />
            </Grid>
          )}
          <Grid md={adm ? 3 : 4}>
            <SelectForm
              name="sprintId"
              label="Sprint"
              required
              listenId="projectId"
              listenGet="/Sprint/GetSprintByProjectId?idProject="
              options={_options.sprints}
            />
          </Grid>
          <Grid md={adm ? 3 : 4}>
            <SelectForm
              name="projectItemId"
              label="Item do Projeto"
              listenId={["sprintId", "projectId"]}
              listenGet={
                token
                  ? "/ProjectItem/GetProjItemEditBySprintId"
                  : "/ProjectItem/GetProjItemBySprintId"
              }
              required
              options={_options.projectItens}
            />
          </Grid>
          <HideInput inputName="projectItemId" externalValidation={-1}>
            <Grid>
            <SelectForm
                name="ticketId"
                label="Ticket"
                listenId={token?["projectId","ticketId"] : "projectId"}
                listenGet={!token?
                  "/Ticket/GetTicketsByProjectId?token=":
                  "/Ticket/GetTicketsByProjectIdEdit"
                }
                required
                options={_options.tickets}
              />
            </Grid>
          </HideInput>
          {multiple ? (
            <>
              <Grid md={6}>
                <DateInputForm
                  name="workDayInitial"
                  required
                  label="Data Inicial"
                  min={_minDate}
                  max={_maxDate}
                />
              </Grid>
              <Grid md={6}>
                <DateInputForm
                  name="workDayFinal"
                  required
                  label="Data Final"
                  min={_minDate}
                  max={_maxDate}
                />
              </Grid>
            </>
          ) : (
            <Grid>
              <DateInputForm
                name="workDay"
                required
                label="Dia de Trabalho"
                min={_minDate}
                max={_maxDate}
              />
            </Grid>
          )}
          <Grid md={6}>
            <DateInputForm
              type="time"
              name="arrivalTime"
              required
              label="Horario de Entrada"
            />
          </Grid>
          <Grid md={6}>
            <DateInputForm
              type="time"
              name="exitTime"
              required
              label="Horario de Saída"
            />
          </Grid>
          {!multiple && (
            <>
              <Grid md={6}>
                <TextInputForm
                  type="number"
                  name="valueBack"
                  label="Pontos Back"
                />
              </Grid>
              <Grid md={6}>
                <TextInputForm
                  type="number"
                  name="valueFront"
                  label="Pontos Front"
                />
              </Grid>
              <WorkingHoursPoints name="projectItemId" />
            </>
          )}
          <Grid>
            <TextAreaForm name="observations" label="Observação" />
          </Grid>

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

interface WorkingHoursPointsProps {
  name: string;
  idValue?: string;
}

const WorkingHoursPoints: React.FC<WorkingHoursPointsProps> = ({ name }) => {
  const [state, setState] = useState<RemainingPointsType[]>([]);
  const { listen } = useHookFormContext();

  useEffect(() => {
    if (listen[name]) {
      getValue(listen[name]);
    } else setState([]);
  }, [listen[name]]);

  async function getValue(data) {
    let response = await workingHoursService.getRemainingPoints(data);
    setState(response);
  }

  return (
    <>
      {state.map((item, i) => {
        return (
          <Grid md={6}>
            <Typography component="p" key={`remaining-${i}`} themed>
              <b>{item.label}:</b>
              {item.remainingPoints}
            </Typography>
          </Grid>
        );
      })}
    </>
  );
};

export default WorkingHoursFormPage;
