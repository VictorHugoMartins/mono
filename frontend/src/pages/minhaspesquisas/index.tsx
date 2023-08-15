import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import DataTableButton from "~/components/local/LocalDataTable/DataTableButton/DataTableButton";
import Table from "~/components/ui/Table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { BASE_API_URL } from "~/config/apiBase";
import privateroute from "~/routes/private.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import Toast from "~/utils/Toast/Toast";
import { API_NAV } from "~/config/apiRoutes/nav";
import { API_SUPER_SURVEY } from "~/config/apiRoutes/super_survey";

interface TableButtonProps {
  rowData?: any;
}

function MySuperSurveys() {
  const [searching, setSearching] = useState(false);

  const { userId } = parseCookies();

  function TableButtons({ rowData }: TableButtonProps) {
    const update = (data: any) => {
      setSearching(true);
      const apiUrl = API_SUPER_SURVEY.UPDATE(); 
      const requestData = data;

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
            Toast.success(data.message)
            loadTableData(userId);
          } else Toast.error(data.message)
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

    const tryAgain = (ss_id: string) => {
      setSearching(true);
      const apiUrl = API_SUPER_SURVEY.CONTINUE(); 
      const requestData = { ss_id };

      console.log(requestData);

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
            Toast.success(data.message)
            loadTableData(userId);
          } else Toast.error(data.message)
          setSearching(false);
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };

    return (
      <>
        {Number(rowData.status) !== 200 &&
          <DataTableButton icon="FaCheck" title="Finalizar" onClick={() => updateStatus(rowData.ss_id, 200)} />
        }
        {Number(rowData.status) === 200 &&
          <DataTableButton icon="FaPlay" title="Reiniciar" onClick={() => tryAgain(rowData.ss_id)} />
        }
        <DataTableButton icon="FaInfo" title="Ver detalhes" onClick={() => window.location.assign(`/detalhes?survey=${rowData.ss_id}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = (userId: string) => {
    setSearching(true);
    console.log(BASE_API_URL)
    const apiUrl = API_NAV.LIST(); 
    const requestData = { user_id: userId };

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
    loadTableData(userId);
  }, [userId])
  
  return (
    <PrivatePageStructure title={"Minhas pesquisas"}>
      <Flexbox justify="flex-end" width={"100%"} >
        <div style={{ maxWidth: "250px", padding: "8px" }}>
          <Button color="primary" text={"Iniciar nova pesquisa"} onClick={() => window.location.assign("/novapesquisa")} />
        </div>
      </Flexbox>
      <PopupLoading show={searching} />
      {_tableData && <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
        buttons={<TableButtons />}
      />}
    </PrivatePageStructure>
  )
}

export default privateroute(MySuperSurveys);

// nos logs, fazer o append e exibir o último
// verificar status dos botões nas tabelas de minhas pesquisas
// garantir q a pesquisa chega ao 200 msm c status prévio de erro