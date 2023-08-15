import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import DataTableButton from "~/components/local/LocalDataTable/DataTableButton/DataTableButton";
import Table from "~/components/ui/Table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import privateroute from "~/routes/private.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import Toast from "~/utils/Toast/Toast";
import { API_USER } from "~/config/apiRoutes/user";

interface TableButtonProps {
  rowData?: any;
}

function MySuperSurveys() {
  const [searching, setSearching] = useState(false);

  const { userId, permission } = parseCookies();

  useEffect(() => {
    if (userId && permission !== "adm") {
      Toast.error("Você não tem permissão para acessar essa página!")
      setTimeout(() => {
        window.location.assign("/")
      }, 3000);
    } else if (userId && permission === "adm") {
      loadTable(userId);
    }
  }, [userId, permission])

  function TableButtons({ rowData }: TableButtonProps) {
    const acceptUser = (obj: any) => {
      setSearching(true);
      const apiUrl = API_USER.ACCEPT();
      const requestData = { user_id: obj.user_id }; // dados de login a serem enviados na requisição

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
            loadTable(userId);
          } else Toast.error(data.message)
          setSearching(false)
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };
    const deleteUser = (obj: any) => {
      setSearching(true);
      const apiUrl = API_USER.DELETE(); // url da API Flask
      const requestData = { user_id: obj.user_id }; // dados de login a serem enviados na requisição

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
            loadTable(userId);
          } else Toast.error(data.message)
          setSearching(false)
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };

    const switchPermission = (ss_id: string, newPermission: string) => {
      setSearching(true);
      const apiUrl = API_USER.CHANGE_PERMISSION(); // url da API Flask
      const requestData = { user_id: ss_id, permission: newPermission }; // dados de login a serem enviados na requisição

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
            loadTable(userId);
          } else Toast.error(data.message)
          setSearching(false);
        })
        .catch(error => { Toast.error(error), setSearching(false) });

      return resp;
    };

    return (
      <>
        <DataTableButton icon="FaSync" title={`Transformar em ${rowData.permission === "visitante" ? "adm" : "visitante"}`} onClick={() => switchPermission(rowData.user_id, rowData.permission === "visitante" ? "adm" : "visitante")} />
        <DataTableButton icon="FaTrash" title="Deletar usuário" onClick={() => deleteUser({ user_id: rowData.user_id })} />
        {!rowData.password && <DataTableButton icon="FaCheck" title="Aceitar solicitação de acesso" onClick={() => acceptUser({ user_id: rowData.user_id })} />}
      </>
    );
  }

  const [_data, setData] = useState<DataTableRenderType>();

  const loadTable = (userId: string) => {
    setSearching(true);
    const apiUrl = API_USER.LIST(); // url da API Flask
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
          setData(data.object);
          setSearching(false);
        } else if (data.status === 401) {
          Toast.error(data.message)
          window.location.assign("/login")
        }
      })
      .catch(error => { Toast.error(error), setSearching(false) });

    return resp;
  };

  // useEffect(() => {
  //   loadTable(userId);
  // }, [userId])

  return (
    <PrivatePageStructure title={"Lista de Usuários"}>
      <PopupLoading show={searching} />
      {_data && <Table
        columns={_data.columns}
        rows={_data.rows}
        buttons={<TableButtons />}
        hiddenColumns={['password']}
      />}
    </PrivatePageStructure>
  )
}

export default privateroute(MySuperSurveys);