import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Table from "~/components/local/table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { BASE_API_URL } from "~/config/apiBase";
import { useUserContext } from "~/context/global/UserContext";
import comumroute from "~/routes/public.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { JSONtoCSV, downloadCSV } from "~/utils/JsonFile";
import Toast from "~/utils/Toast/Toast";

interface TableButtonProps {
  rowData?: any;
}

interface DetailsProps {
  city?: string;
}

const MySuperSurveys: React.FC<DetailsProps> = ({ city }) => {
  const [searching, setSearching] = useState(false);

  const { user } = useUserContext();
  const { userId, userName } = parseCookies();

  function TableButtons({ rowData }: TableButtonProps) {
    const update = (data: any) => {
      setSearching(true);
      const apiUrl = `${BASE_API_URL}/update`; // url da API Flask
      const requestData = { ss_id: data.ss_id }; // dados de login a serem enviados na requisição

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
          setSearching(false);
        })
        .catch(error => { Toast.error(error); setSearching(false); });

      return resp;
    };

    function updateStatus(ss_id: string | number, newStatus: number) {
      setSearching(true);
      update({ ss_id, newStatus })
      setSearching(false);
    }

    const downloadData = (obj: any) => {
      setSearching(true);
      const apiUrl = `${BASE_API_URL}/super_survey/export`; // url da API Flask
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
          setSearching(false)
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };

    const tryAgain = (ss_id: string) => {
      setSearching(true);
      const apiUrl = `${BASE_API_URL}/super_survey/continue`; // url da API Flask
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
          setSearching(false);
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };

    return (
      <>
        {/* {rowData.status !== 200 &&
          <DataTableButton icon="FaCheck" title="Finalizar" onClick={() => updateStatus(rowData.ss_id, 200)} />
        } */}
        {/* {rowData.status <= 1 && */}
        {/* <DataTableButton icon="FaPlay" title="Tentar novamente" onClick={() => tryAgain(rowData.ss_id)} /> */}
        {/* } */}
        {(rowData.status > 0) && (rowData.status !== 1) &&
          <DataTableButton icon="FaUpload" title="Baixar dados" onClick={() => downloadData({ ss_id: rowData.ss_id })} />
        }
        <DataTableButton icon="FaInfo" title="Ver detalhes" onClick={() => window.location.assign(`/detalhes?survey=${rowData.ss_id}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = (city: string) => {
    setSearching(true);
    console.log(BASE_API_URL)
    const apiUrl = `${BASE_API_URL}/super_survey/getbycity`; // url da API Flask
    const requestData = { city: city }; // dados de login a serem enviados na requisição

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
          setSearching(false);
        } else if (data.status === 401) {
          Toast.error(data.message)
          window.location.assign("/login")
        }
      })
      .catch(error => { Toast.error(error), setSearching(false) });

    return resp;
  };

  useEffect(() => {
    loadTableData(city);
  }, [city])
  return (
    <PrivatePageStructure title={`Pesquisas por ${city}`}>
      {/* <Flexbox justify="flex-end" width={"100%"} >
        <div style={{ maxWidth: "250px", padding: "8px" }}>
          <Button color="primary" text={"Iniciar nova pesquisa"} onClick={() => window.location.assign("/novapesquisa")} />
        </div>
      </Flexbox> */}
      <PopupLoading show={searching} />
      {_tableData && <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
        buttons={<TableButtons />}
      />}
    </PrivatePageStructure>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { city } = ctx.query;

  return {
    props: {
      city
    }
  };
};

export default comumroute(MySuperSurveys);