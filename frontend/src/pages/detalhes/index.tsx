'use client'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import DetailsFilter from "~/components/local/Forms/DetailsForm"
import MapRender from "~/components/local/Map/MapRender";
import Table from "~/components/ui/Table"
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import ChartBar from "~/components/ui/Charts/ChartBar";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import comumroute from "~/routes/public.route";
import { ChartDataType } from "~/types/global/ChartTypes";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { InputRenderType } from "~/types/global/InputRenderType";
import { ObjectResponse } from "~/types/global/ObjectResponse";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { JSONtoCSV, downloadCSV } from "~/utils/JsonFile";
import Toast from "~/utils/Toast/Toast";
import { API_NAV } from "~/config/apiRoutes/nav";

type DetailsData = {
  result_columns?: InputRenderType[],
  numeric_columns?: SelectObjectType[],
  str_columns?: SelectObjectType[],
}

interface DetailsProps {
  survey?: string;
}

const DetailsPage: React.FC<DetailsProps> = ({ survey }) => {
  const [searching, setSearching] = useState(false);

  const [_prepareData, setPrepareData] = useState<DetailsData>();
  const [_filteredData, setFilteredData] = useState({ table: null as DataTableRenderType, extra_info: "_avg" });
  const [_chartData, setChartData] = useState<ChartDataType[]>();
  const [_filteredResponseData, setFilteredResponseData] = useState<ObjectResponse>();
  const [_chartResponseData, setChartResponseData] = useState<ObjectResponse>();
  const [_csvFile, setCsvFile] = useState<string>();

  const [_viewForClusters, setViewForClusters] = useState(false);

  const prepare = (data: any) => {
    setSearching(true);
    const apiUrl = API_NAV.PREPARE() // url da API Flask
    const requestData = { ss_id: survey };

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
        setSearching(false);
      })
      .catch(error => { Toast.error(error); setSearching(false) });

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

  const downloadData = (obj: any) => {
    setSearching(true);
    downloadCSV(_csvFile, Number(survey))
    setSearching(false);
  };


  const getData = (data: any) => {
    setSearching(true);
    const apiUrl = API_NAV.GETBYID(); // url da API Flask
    const requestData = {
      ss_id: survey,
      agg_method: data?.agg_method ?? "_avg",
      clusterization_method: data?.clusterization_method ?? "none",
      platform: data?.platform ?? "both",
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
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFilteredData(data.object);
          setCsvFile(JSONtoCSV(data.object.table.rows));
          setSearching(false);
        } else Toast.error(data.message);
      })
      .catch(error => { Toast.error(error); setSearching(false) });

    return resp;
  };

  useEffect(() => {
    if (_prepareData) {
      getData(null);
    }
  }, [_prepareData])

  useEffect(() => {
    if (_chartResponseData)
      setChartData(_chartResponseData.response)
  }, [_chartResponseData])

  return (
    <PrivatePageStructure title="Detalhes da pesquisa " returnPath="/minhaspesquisas">
      <PopupLoading show={searching} />
      <Flexbox justify="flex-end" width={"100%"} >
        <div style={{ maxWidth: "250px", padding: "8px" }}>
          <Button color="primary" text={"Baixar dados filtrados"}
            onClick={() => downloadData({ ss_id: survey, aggregation_method: _filteredData?.extra_info })}
          />
        </div>
        {_filteredData?.table?.rows && _filteredData?.table?.rows[0] && (typeof (_filteredData?.table.rows[0]["cluster"]) !== "undefined") &&
          <div style={{ maxWidth: "250px", padding: "8px" }}>
            <Button color="primary" text={_viewForClusters ? "Visualizar anúncios por origem" : "Visualizar anúncios por grupo"}
              onClick={() => setViewForClusters(!_viewForClusters)}
            />
          </div>
        }
      </Flexbox>
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
          <MapRender data={_filteredData?.table?.rows} viewForClusters={_viewForClusters} />
        </div>
      </Flexbox>
      <div>

        <h2>Gráfico</h2>
        <p>Selecione abaixo as colunas para relacionar dados em um gráfico de barras. Se estiver com dúvidas sobre o que selecionar, clique aqui para obter mais informações</p>

        {_prepareData &&
          <FormPageStructure
            setObjectReturn={setChartResponseData}
            buildPath={'/super_survey/build'}
            submitPath={API_NAV.CHART()}
            buttonSubmitText="Gerar gráfico"
            returnPath="/"
            hiddenInputs={{
              ss_id: survey,
              aggregation_method: _filteredData?.extra_info ?? "_avg"
            }}
            onSuccess={(e) => {
              Toast.success(
                "Gráfico gerado com sucesso!"
              );
            }}
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
          columns={_filteredData?.table?.columns}
          rows={_filteredData?.table?.rows}
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

export default comumroute(DetailsPage);