// import Image from 'next/image'

import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../../structure/FormPageStructure";
import { InputRenderType } from "~/types/global/InputRenderType";
import { parseCookies } from "nookies";
import { API_SUPER_SURVEY } from "~/config/apiRoutes/super_survey";

export default function NewSurveyOptions() {
  const { userId } = parseCookies();

  const surveyBuild = [
    {
      name: "platform",
      label: "Plataforma",
      required: true,
      disabled: false,
      options: [
        { label: "Airbnb", value: "Airbnb" },
        { label: "Booking", value: "Booking" },
        { label: "Ambas", value: "both" },
      ],
      type: "radio",
    },
    {
      name: "city",
      label: "Cidade",
      required: true,
      disabled: false,
      type: "text",
      max: 100,
      min: 5,
    },
    {
      name: "include_locality_search",
      label: "Incluir subpesquisa por bairros?",
      disabled: false,
      required: false,
      type: "radio",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ]
    },
    {
      name: "include_route_search",
      label: "Incluir subpesquisa por ruas?",
      disabled: false,
      required: false,
      type: "radio",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ]
    },
    {
      name: "columns",
      label: "Dados para coleta",
      required: true,
      disabled: false,
      type: "checkbox-select",
      listen: { id: "platform", getUrl: API_SUPER_SURVEY.GETDATACOLUMNS() },
      description: "Selecione dados opcionais adicionais aos campos de Código Identificador da Acomodação, Código Identificador do Anfitrião (para Airbnb)/do Hotel (para Booking), Nome, Preço, Latitude e Longitude, que são sempre coletados."
    },
    
  ] as InputRenderType[]

  return (
      <FormPageStructure
        buildObject={surveyBuild}
        buildPath={'na'}
        submitPath={API_SUPER_SURVEY.SAVE()}
        buttonSubmitText="Solicitar pesquisa"
        buttonCancelText="Cancelar"
        returnPath="/"
        hiddenInputs={{ user_id: userId }}
        onSuccess={(e) => {
          Toast.success(
            "Pesquisa iniciada com sucesso!"
          );
        }}
      />
  )
}