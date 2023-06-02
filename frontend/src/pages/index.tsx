import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Table from "~/components/local/table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { useUserContext } from "~/context/global/UserContext";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { JSONtoCSV, downloadCSV } from "~/utils/JsonFile";
import Toast from "~/utils/Toast/Toast";

interface TableButtonProps {
  rowData?: any;
}

export default function MySuperSurveys() {
  const { user } = useUserContext();
  const { userId, userName } = parseCookies();

  function MySuperSurveysButtons({ rowData }: TableButtonProps) {
    const update = (data: any) => {
      const apiUrl = 'http://localhost:5000/update'; // url da API Flask
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
          if (data.success) Toast.success("Status da pesquisa atualizado com sucesso!")
          else Toast.error("Erro ao atualizar status da pesquisa!")
        })
        .catch(error => Toast.error(error));

      return resp;
    };

    function updateStatus(id: string | number, newStatus: string | number) {
      update({ id: rowData.room_id, newStatus: newStatus })
    }

    const downloadData = (obj: any) => {
      const apiUrl = 'http://localhost:5000/super_survey/export'; // url da API Flask
      const requestData = { ss_id: obj.ss_id }; // dados de login a serem enviados na requisição

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
            let csvFile = JSONtoCSV(data.object.rows);
            downloadCSV(csvFile, obj.ss_id)
          } else Toast.error("Erro ao baixar dados!")
        })
        .catch(error => Toast.error(error));

      return resp;
    };

    const tryAgain = (ss_id: string) => {
      const apiUrl = 'http://localhost:5000/super_survey/continue'; // url da API Flask
      const requestData = { ss_id }; // dados de login a serem enviados na requisição

      console.log(requestData);

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
            Toast.success(data.message)
          } else Toast.error(data.message)
        })
        .catch(error => Toast.error(error));

      return resp;
    };

    return (
      <>
        {rowData.status !== 200 &&
          <DataTableButton icon="FaCheck" title="Finalizar" onClick={() => updateStatus(rowData.ss_id, 200)} />
        }
        {rowData.status <= 1 &&
          <DataTableButton icon="FaPlay" title="Tentar novamente" onClick={() => tryAgain(rowData.ss_id)} />
        }
        {(rowData.status > 0) && (rowData.status !== 1) &&
          <DataTableButton icon="FaUpload" title="Baixar dados" onClick={() => downloadData({ ss_id: rowData.ss_id })} />
        }
        <DataTableButton icon="FaInfo" title="Ver detalhes" onClick={() => window.location.assign(`/detalhes?survey=${rowData.ss_id}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = (userId: string | number) => {
    const apiUrl = 'http://localhost:5000/super_survey/getall'; // url da API Flask
    const requestData = { user_id: userId }; // dados de login a serem enviados na requisição

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
          setTableData(data.object);
          // setLoading(false);
        } else if (data.status === 401) {
          Toast.error(data.message)
          window.location.assign("/login")
        }
      })
      .catch(error => Toast.error(error));

    return resp;
  };

  useEffect(() => {
    loadTableData(userId);
  }, [userId])
  return (
    <PrivatePageStructure title={"Minhas pesquisas"}>
      <Flexbox justify="flex-end" width={"100%"} >
        <div style={{ maxWidth: "250px", padding: "8px" }}>
          <Button color="primary" text={"Iniciar nova pesquisa"} onClick={() => window.location.assign("/novapesquisa")} />
        </div>
      </Flexbox>
      {_tableData && <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
        buttons={<MySuperSurveysButtons />}
      />}
    </PrivatePageStructure>
  )
}