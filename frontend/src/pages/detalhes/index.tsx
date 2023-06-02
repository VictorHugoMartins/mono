'use client'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import DetailsFilter from "~/components/local/DetailsFilter"
import MapRender from "~/components/local/renderMap";
import Table from "~/components/local/table"
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import ChartBar from "~/components/ui/Charts/ChartBar";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { ChartDataType } from "~/types/global/ChartTypes";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { InputRenderType } from "~/types/global/InputRenderType";
import { ObjectResponse } from "~/types/global/ObjectResponse";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import Toast from "~/utils/Toast/Toast";

type DetailsData = {
  result_columns?: InputRenderType[],
  numeric_columns?: SelectObjectType[],
  str_columns?: SelectObjectType[],
}

interface DetailsProps {
  survey?: string;
}

const DetailsPage: React.FC<DetailsProps> = ({ survey }) => {
  const [_prepareData, setPrepareData] = useState<DetailsData>();
  const [_filteredData, setFilteredData] = useState<DataTableRenderType>();
  const [_chartData, setChartData] = useState<ChartDataType[]>();
  const [_filteredResponseData, setFilteredResponseData] = useState<ObjectResponse>();
  const [_chartResponseData, setChartResponseData] = useState<ObjectResponse>();


  const prepare = (data: any) => {
    const apiUrl = 'http://localhost:5000/details/prepare'; // url da API Flask
    const requestData = { ss_id: survey }; // dados de login a serem enviados na requisição

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
      .then(res => res.json())
      .then(data => {
        setPrepareData(data.object);
        // setLoading(false);
      })
      .catch(error => Toast.error(error));

    return resp;
  };

  useEffect(() => {
    if (survey)
      prepare(null);
  }, [survey])

  useEffect(() => {
    if (_filteredResponseData?.response)
      setFilteredData(_filteredResponseData.response)
  }, [_filteredResponseData])

  const getData = (data: any) => {
    const apiUrl = 'http://localhost:5000/details/getbyid'; // url da API Flask
    const requestData = { ss_id: survey }; // dados de login a serem enviados na requisição

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
      .then(res => res.json())
      .then(data => {
        setFilteredData(data.object);
        // setLoading(false);
      })
      .catch(error => Toast.error(error));

    return resp;
  };

  useEffect(() => {
    if (_prepareData) {
      getData(null);
      // getChartData(null);
    }
  }, [_prepareData])

  useEffect(() => {
    if (_chartResponseData)
      setChartData(_chartResponseData.response)
  }, [_chartResponseData])

  return (
    <PrivatePageStructure title="Detalhes da pesquisa " returnPath="/minhaspesquisas">
      <Flexbox width={"100%"} justify="space-between">
        <div style={{ width: "30vw", maxHeight: "80vh", overflow: "hidden", overflowY: "scroll" }}>
          <DetailsFilter
            data={_prepareData}
            setResultData={setFilteredResponseData}
            filterFunction={getData}
            survey={survey}
          />
        </div>
        <div>
          <MapRender data={_filteredData?.rows} />
        </div>
      </Flexbox>
      <div>

        <h2>Gráfico</h2>
        <p>Selecione abaixo as colunas para relacionar dados em um gráfico de barras. Se estiver com dúvidas sobre o que selecionar, clique aqui para obter mais informações</p>

        {_prepareData &&
          <FormPageStructure
            // buildObject={data.result_columns as InputRenderType[]}
            setObjectReturn={setChartResponseData}
            buildPath={'/super_survey/build'}
            submitPath={'http://localhost:5000/details/chart'}
            buttonSubmitText="Gerar gráfico"
            // buttonCancelText="Cancelar"
            returnPath="/"
            hiddenInputs={{ ss_id: survey }}
            // setObjectReturn={setResultData}
            onSuccess={(e) => {
              Toast.success(
                "Gráfico gerado com sucesso!"
              );
            }}
            // onCancel={() => filterFunction()}
            buildObject={[
              {
                label: "Informação a se obter",
                name: "agg_method",
                type: "radio",
                required: true,
                options: [
                  { label: "Contagem", value: "count" },
                  { label: "Média", value: "avg" },
                  { label: "Maior valor", value: "max" },
                  { label: "Menor valor", value: "min" },
                ]
              },
              {
                label: "Campo categórico",
                name: "str_column",
                type: "radio",
                required: true,
                options: _prepareData.str_columns
              },
              {
                label: "Campo númerico",
                name: "number_column",
                type: "radio",
                required: true,
                options: _prepareData.numeric_columns
              }
            ] as InputRenderType[]}
          />
        }
        <div>
          {_chartData && <ChartBar data={_chartData} />}
        </div>
        <h2>Dados filtrados</h2>
        <Table
          columns={_filteredData?.columns}
          rows={_filteredData?.rows}
        />
      </div>
    </PrivatePageStructure >
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { survey } = ctx.query;

  return {
    props: {
      survey
    }
  };
};

export default DetailsPage;