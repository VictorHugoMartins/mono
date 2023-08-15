import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import DataTableButton from "~/components/local/LocalDataTable/DataTableButton/DataTableButton";
import Table from "~/components/ui/Table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { BASE_API_URL } from "~/config/apiBase";
import comumroute from "~/routes/public.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import Toast from "~/utils/Toast/Toast";
import { API_NAV } from "~/config/apiRoutes/nav";

interface TableButtonProps {
  rowData?: any;
}

interface DetailsProps {
  city?: string;
}

const MySuperSurveys: React.FC<DetailsProps> = ({ city }) => {
  const [searching, setSearching] = useState(false);

  function TableButtons({ rowData }: TableButtonProps) {
    return (
      <>
        <DataTableButton icon="FaInfo" title="Ver detalhes" onClick={() => window.location.assign(`/detalhes?survey=${rowData.ss_id}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = (city: string) => {
    setSearching(true);
    console.log(BASE_API_URL)
    const apiUrl = API_NAV.GETBYCITY(); // url da API Flask
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