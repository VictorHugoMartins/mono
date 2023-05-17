'use client'

import { useEffect, useState } from "react";
import DetailsFilter from "~/components/local/DetailsFilter"
import ColumnsOptions from "~/components/local/columnsOptions"
import MapRender from "~/components/local/renderMap";
import Table from "~/components/local/table"
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { InputRenderType } from "~/types/global/InputRenderType";
import Toast from "~/utils/Toast/Toast";

type DetailsData = {
  str_columns?: InputRenderType[],
  number_columns?: InputRenderType[],
  select_columns?: InputRenderType[],
  checkbox_columns?: InputRenderType[],
}

export default function Details() {
  const [_prepareData, setPrepareData] = useState<DetailsData>();
  const [_filteredData, setFilteredData] = useState<DetailsData>();

  const prepare = (data: any) => {
    const apiUrl = 'http://localhost:5000/details/prepare'; // url da API Flask
    const requestData = { ss_id: 50 }; // dados de login a serem enviados na requisição

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
    prepare(null);
  }, [])

  const getData = (data: any) => {
    const apiUrl = 'http://localhost:5000/details/getall'; // url da API Flask
    const requestData = { ss_id: 50 }; // dados de login a serem enviados na requisição

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
    if (_prepareData)
      getData(null);
  }, [_prepareData])

  return (
    <main>
      <Flexbox width={"100%"} wrap>
        <div style={{ width: "30% " }}>
          <DetailsFilter data={_prepareData} setData={setFilteredData} filterFunction={getData} />
        </div>
        <div>
          <MapRender data={_filteredData?.rows} />
        </div>
      </Flexbox>
      <div>

        <h4>gráfico</h4>
        <p>Selecione abaixo as colunas para relacionar no gráfico:</p>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <ColumnsOptions data={_prepareData?.result_columns} renderNumbers={true} />
          </div>
          <div style={{ width: "50%" }}>
            <ColumnsOptions data={_prepareData?.result_columns} />
          </div>
        </div>
        <div>
          <img
            src="https://help.qlik.com/pt-BR/cloud-services/Subsystems/Hub/Content/Resources/Images/ui_gen_BarChart.png"
            width="100%"
          />
        </div>
        <h4>tabela</h4>
        <Table
          columns={_filteredData?.columns}
          rows={_filteredData?.rows}
        />
      </div>
    </main>
  )
}
