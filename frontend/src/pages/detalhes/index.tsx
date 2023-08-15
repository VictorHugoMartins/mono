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
import { Modal } from "~/components/ui/Modal/Modal";

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

  const [_allLogsData, setAllLogsData] = useState<DetailsData>();
  const [_prepareData, setPrepareData] = useState<DetailsData>();
  const [_preparedData, setPreparedData] = useState<any>();
  const [_filteredData, setFilteredData] = useState({ table: null as DataTableRenderType, extra_info: "_avg" });
  const [_chartData, setChartData] = useState<ChartDataType[]>();
  const [_filteredResponseData, setFilteredResponseData] = useState<ObjectResponse>();
  const [_chartResponseData, setChartResponseData] = useState<ObjectResponse>();
  const [_csvFile, setCsvFile] = useState<string>();

  const [_viewForClusters, setViewForClusters] = useState(false);

  const prepare = (data: any) => {
    setSearching(true);
    const apiUrl = API_NAV.PREPARE()
    const requestData = { ss_id: survey };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    };

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
    const apiUrl = API_NAV.GETBYID();
    const requestData = {
      ss_id: survey,
      aggregation_method: data?.aggregation_method ?? _preparedData?.aggregation_method ?? "_avg",
      clusterization_method: data?.clusterization_method ?? _preparedData?.clusterization_method ?? "none",
      platform: data?.platform ?? _preparedData?.platform ?? "both",
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    };

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

  const getPreparedData = () => {
    setSearching(true);
    const apiUrl = API_NAV.PREPAREFILTER(survey);
    // const requestData = {
    //   ss_id: survey,
    //   aggregation_method: data?.aggregation_method ?? "_avg",
    //   clusterization_method: data?.clusterization_method ?? "none",
    //   platform: data?.platform ?? "both",
    // };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = { method: 'GET', headers };

    const resp = fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPreparedData(data.object);
        } else Toast.error(data.message);
      })
      .catch(error => { Toast.error(error); setSearching(false) });

    return resp;
  };

  const loadAllLogs = () => {
    setSearching(true);
    const apiUrl = API_NAV.GETLOGSDETAILS(survey);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = { method: 'GET', headers };

    const resp = fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) setAllLogsData(data.object);
        else Toast.error(data.message);
        setSearching(false)
      })
      .catch(error => { Toast.error(error); setSearching(false) });

    return resp;
  };


  useEffect(() => {
    if (_prepareData && _preparedData) {
      getData(null);
    }
  }, [_prepareData, _preparedData])

  useEffect(() => {
    getPreparedData()
  }, [])

  useEffect(() => {
    if (_chartResponseData)
      setChartData(_chartResponseData.response)
  }, [_chartResponseData])

  return (
    <PrivatePageStructure title="Detalhes da pesquisa " returnPath="/minhaspesquisas">
      <PopupLoading show={searching} />
      <Flexbox justify="flex-end" width={"100%"} >
        <Modal openButton={
          <div style={{ maxWidth: "300px", padding: "8px" }}>
            <Button color="primary" text={"Ver detalhes da execução"}
              onClick={() => loadAllLogs()}
            />
          </div>}
          title={`Detalhes da execução da pesquisa ${survey}`}
        >
          {_allLogsData ?
            _allLogsData.toString().split('\n').map((item) => (<p> {item} <br /> </p>)) :
            "Sem detalhes para exibir"}
        </Modal>
        <div style={{ maxWidth: "300px", padding: "8px" }}>
          <Button color="primary" text={"Baixar dados filtrados"}
            onClick={() => downloadData({ ss_id: survey, aggregation_method: _filteredData?.extra_info })}
          />
        </div>
        {_filteredData?.table?.rows && _filteredData?.table?.rows[0] && (typeof (_filteredData?.table.rows[0]["cluster"]) !== "undefined") &&
          <div style={{ maxWidth: "300px", padding: "8px" }}>
            <Button color="primary" text={_viewForClusters ? "Visualizar anúncios por origem" : "Visualizar anúncios por grupo"}
              onClick={() => setViewForClusters(!_viewForClusters)}
            />
          </div>
        }
      </Flexbox>
      <Flexbox width={"100%"} justify="space-between">
        <div style={{ maxHeight: "80vh", overflow: "hidden", overflowY: "scroll", marginRight: 16 }}>
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
                name: "aggregation_method",
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
            onCancel={(e) => { console.log("não filtrou") }}
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