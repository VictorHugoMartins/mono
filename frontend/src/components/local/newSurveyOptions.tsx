// import Image from 'next/image'

import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../structure/FormPageStructure";
import { InputRenderType } from "~/types/global/InputRenderType";
import { parseCookies } from "nookies";

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
    // {
    //   name: "region",
    //   label: "Regiões",
    //   required: false,
    //   type: "object-list",
    //   shapeFields: [
    //     {
    //       name: "north_latitude",
    //       label: "Latitude Norte",
    //
    // disabled: false,       required: false,
    //       type: "text",
    //     },
    //     {
    //       name: "south_latitude",
    //       label: "Latitude Sul",
    //
    // disabled: false,       required: false,
    //       type: "text",
    //     },
    //     {
    //       name: "east_longitude",
    //       label: "Longitude Leste",
    //
    // disabled: false,       required: false,
    //       type: "text",
    //     },
    //     {
    //       name: "west_longitude",
    //       label: "Longitude Oeste",
    //
    // disabled: false,       required: false,
    //       type: "text",
    //     },
    //   ]
    // },
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
      listen: { id: "platform", getUrl: "/super_survey/get_data_columns?platform=" },
    },
    {
      name: "clusterization_method",
      label: "Método de Clusterização",
      disabled: false,
      required: false,
      type: "radio",
      options: [
        { label: "K-Modes", value: "kmodes" },
      ]
    },
    {
      name: "aggregation_method",
      label: "Método de Agregação para seleção de dados repetidos:",
      disabled: false,
      required: false,
      type: "radio",
      options: [
        { label: "Média", value: "avg" },
        { label: "Menor valor", value: "min" },
        { label: "Maior valor", value: "max" },
        { label: "Manter duplicatas", value: "keep" },
      ]
    },
  ] as InputRenderType[]

  return (
      <FormPageStructure
        buildObject={surveyBuild}
        buildPath={'/super_survey/build'}
        submitPath={'/super_survey/save'}
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