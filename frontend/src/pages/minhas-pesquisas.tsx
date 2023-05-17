import { useEffect, useState } from "react";
import Table from "~/components/local/table";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableRender from "~/components/ui/DataTable/DataTableRender/DataTableRender";
import Toast from "~/utils/Toast/Toast";

interface TableButtonProps {
  rowData?: any;
}

export default function MySuperSurveys() {
  function MySuperSurveysButtons({ rowData }: TableButtonProps) {
    console.log(rowData);

    return (
      <>
        {rowData.status > 1 &&
          <DataTableButton icon="FaCheck" title="Finalizar" onClick={() => console.log("a")} />
        }
        {rowData.status < 0 &&
          <DataTableButton icon="FaTelegramPlane" title="Tentar novamente" onClick={() => console.log("b")} />
        }
        {rowData.status > 1 &&
          <DataTableButton icon="FaUpload" title="Baixar dados" onClick={() => console.log("b")} />
        }
        <DataTableButton icon="FaInfo" title="Ver detalhes" onClick={() => window.location.assign("/detalhes")} />
      </>
    );
  }

  const [_tableData, setTableData] = useState([]);

  const loadTableData = (data: any) => {
    const apiUrl = 'http://localhost:5000/super_survey/getall'; // url da API Flask
    const requestData = {}; // dados de login a serem enviados na requisição

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
        setTableData(data.object);
        // setLoading(false);
      })
      .catch(error => Toast.error(error));

    return resp;
  };

  useEffect(() => {
    loadTableData(null);
  }, [])
  return (
    <PrivatePageStructure title={"Minhas pesquisas"}>
      {/* <Button backgroundColor="primary" text={"Iniciar nova pesquisa"} /> */}
      <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
        buttons={<MySuperSurveysButtons />}
      />
      {/* // <ListPageStructure
    //   getListPath='http://localhost:5000/super_survey/getall'
    //   getListisPost
    //   param={"id"}
    //   buttons={<MySuperSurveysButtons />}
    // /> */}
    </PrivatePageStructure>
  )
}
