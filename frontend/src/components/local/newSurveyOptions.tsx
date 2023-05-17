// import Image from 'next/image'

import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../structure/FormPageStructure";
import { InputRenderType } from "~/types/global/InputRenderType";

export default function NewSurveyOptions() {
  const surveyBuild = [
    {
      name: "platform",
      label: "Plataforma",
      required: true,
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
      type: "text",
      max: 100,
      min: 5,
    },
    {
      name: "region",
      label: "Regiões",
      required: false,
      type: "object-list",
      shapeFields: [
        {
          name: "north_latitude",
          label: "Latitude Norte",
          required: false,
          type: "text",
        },
        {
          name: "south_latitude",
          label: "Latitude Sul",
          required: false,
          type: "text",
        },
        {
          name: "east_longitude",
          label: "Longitude Leste",
          required: false,
          type: "text",
        },
        {
          name: "west_longitude",
          label: "Longitude Oeste",
          required: false,
          type: "text",
        },
      ]
    },
    {
      name: "include_locality_search",
      label: "Incluir subpesquisa por bairros?",
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
      type: "checkbox",
      options: [
        { label: "Preço", value: "price" },
        { label: "Latitude", value: "latitude" },
        { label: "Longitude", value: "longitude" },
      ]
    },
    {
      name: "clusterization_method",
      label: "Método de Clusterização",
      required: false,
      type: "radio",
      options: [
        { label: "K-Modes", value: "kmodes" },
      ]
    },
    {
      name: "aggregation_method",
      label: "Método de Agregação para seleção de dados repetidos:",
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
    <>
      <FormPageStructure
        buildObject={surveyBuild}
        buildPath={'/super_survey/build'}
        submitPath={'/super_survey/save'}
        buttonSubmitText="Solicitar pesquisa"
        buttonCancelText="Cancelar"
        returnPath="/"
        hiddenInputs={{ user_id: 1 }}
        onSuccess={(e) => {
          Toast.success(
            "Inscrição realizada com sucesso, em breve entraremos em contato."
          );
        }}
      />
    </>
  )
}