import { useEffect, useState } from "react";
import DataTableButton from "~/components/local/LocalDataTable/DataTableButton/DataTableButton";
import Table from "~/components/ui/Table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import comumroute from "~/routes/public.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import Toast from "~/utils/Toast/Toast";
import { API_NAV } from "~/config/apiRoutes/nav";
import Icon from "~/components/ui/Icon/Icon";

interface TableButtonProps {
  rowData?: any;
}

function Home() {
  const [searching, setSearching] = useState(false);

  function TableButtons({ rowData }: TableButtonProps) {
    return (
      <>
        <DataTableButton icon="FaInfo" title="Ver pesquisas" onClick={() => window.location.assign(`/pesquisasporcidade?city=${rowData.city}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = () => {
    setSearching(true);
    const apiUrl = API_NAV.PUBLICGETALL();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = { method: 'POST', headers };

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
    loadTableData();
  }, [])

  return (
    <PrivatePageStructure title={"DashAcomodações"}>
      <PopupLoading show={searching} />

      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className="w3-content">
          <div className="w3-twothird">
            <h1>DashAcomodações</h1>
            <h5 className="w3-padding-32">
              Partindo de uma abordagem multidispliciplinar que envolve Turismo e Ciência da Computação, este trabalho promove transparência sobre a atuação das plataformas envolvidas ao propor a implementação de um web scraping e técnicas de ciência de dados para extrair e analisar de forma automatizadas os dados de interesse tanto do Airbnb quanto do Booking.</h5>
          </div>

          <div className="w3-third w3-center">
            <i className="fa fa-house-damage w3-padding-64 w3-text-red">
              <Icon type="FaHouseDamage" size={200} />
            </i>
          </div>
        </div>
      </div>

      <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
        <div className="w3-content">
          <div className="w3-third w3-center">
            <Icon type="FaLaptopCode" size={200} />
          </div>

          <div className="w3-twothird">
            <h1>A importância do projeto</h1>
            <h5 className="w3-padding-32">Considerando a complexidade das contradições envolvendo a presença do Airbnb em determinadas comunidades (em muitas delas, onde já havia a presença e atuação de empresas hoteleiras tradicionais), é imprescindível que os órgãos responsáveis pela regulação do mercado imobiliário realizem uma análise quantitativa sobre a dimensão e influência desse serviço nessas localidades específicas. Entretanto, a aquisição e manipulação de dados referentes a esse fenômeno pode ser extremamente desafiador e requer a aplicação de esforços adicionais e efetivos por parte das entidades gerenciadoras.</h5>

            <p className="w3-text-grey">Ao navegar por esse site, você pode ver ou solicitar dados sobre acomodoções ofertadas por ambas as plataformas em determinado espaço de tempo. Abaixo, por exemplo, são listadas as cidades cujos dados já foram coletados previamente. Dê uma olhada!</p>
          </div>
        </div>
      </div>

      <div className="w3-container w3-center w3-padding-64">
        {_tableData && <Table
          columns={_tableData.columns}
          rows={_tableData.rows}
          buttons={<TableButtons />}
        />}
      </div>

      <footer className="w3-container w3-center w3-opacity">
        <div className="w3-xlarge w3-padding-32">
          <a href="https://github.com/VictorHugoMartins/mono" target="_blank"><i className="fa fa-github w3-hover-opacity"></i></a>
        </div>
        <p>Por Victor Martins</p>
      </footer>
    </PrivatePageStructure>
  )
}

export default comumroute(Home);