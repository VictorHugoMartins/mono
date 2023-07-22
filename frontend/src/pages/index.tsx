import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import DataTableButton from "~/components/local/LocalDataTable/DataTableButton/DataTableButton";
import Table from "~/components/local/table";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import Typography from "~/components/ui/Typography/Typography";
import { BASE_API_URL } from "~/config/apiBase";
import { useUserContext } from "~/context/global/UserContext";
import comumroute from "~/routes/public.route";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import Toast from "~/utils/Toast/Toast";

interface TableButtonProps {
  rowData?: any;
}

function Home() {
  const [searching, setSearching] = useState(false);

  const { user } = useUserContext();
  const { userId, userName } = parseCookies();

  function TableButtons({ rowData }: TableButtonProps) {
    return (
      <>
        <DataTableButton icon="FaInfo" title="Ver pesquisas" onClick={() => window.location.assign(`/pesquisasporcidade?city=${rowData.city}`)} />
      </>
    );
  }

  const [_tableData, setTableData] = useState<DataTableRenderType>();

  const loadTableData = (userId: string) => {
    setSearching(true);
    console.log(BASE_API_URL)
    const apiUrl = `${BASE_API_URL}/super_survey/public_getall`; // url da API Flask
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
    <PrivatePageStructure title={"Seja bem-vindo!"}>
      {/* <Flexbox justify="flex-end" width={"100%"} >
        <div style={{ maxWidth: "250px", padding: "8px" }}>
          <Button color="primary" text={"Iniciar nova pesquisa"} onClick={() => window.location.assign("/novapesquisa")} />
        </div>
      </Flexbox> */}
      <PopupLoading show={searching} />

      <Typography component="p">
        A empresa Airbnb alcançou um valor de mercado de 30 milhões de dólares em meados de 2018. A plataforma, que inicialmente propôs a oferta de colchões de ar pela internet, rapidamente se transformou em um catalisador global de ofertas similares, presente em mais de 81 mil cidades em 191 países, incluindo o Brasil, com mais de 220 mil anúncios que incluem quartos simples, lofts históricos e apartamentos em frente ao mar. No entanto, apesar de seu impacto cultural, o Airbnb é muito mais do que uma mera ferramenta de hospedagem temporária.
      </Typography>
      <Typography component="p">
        Os defensores do Airbnb o veem como um novo modelo de negócios e um movimento social. Em um mundo onde a economia do compartilhamento é cada vez mais presente, o Airbnb é uma forma de cooperar e trocar serviços - com potencial para lucro pessoal - ajudando indivíduos a se tornarem microempresários e, assim, promover uma visão igualitária baseada em relações horizontais entre pessoas (SLEE, 2017, p. 22), em oposição a organizações hierárquicas, tudo graças à conectividade fornecida pela internet. No entanto, a realidade operacional do conceito de "economia do compartilhamento" não é necessariamente tão simplista quanto parece, e encontramos complicações em relação ao Airbnb.
      </Typography>

      <Typography component="p">
        Considerando a complexidade das contradições envolvendo a presença do Airbnb em determinadas comunidades (em muitas delas, onde já havia a presença e atuação de empresas hoteleiras tradicionais), é imprescindível que os órgãos responsáveis pela regulação do mercado imobiliário realizem uma análise quantitativa sobre a dimensão e influência desse serviço nessas localidades específicas. Entretanto, a aquisição e manipulação de dados referentes a esse fenômeno pode ser extremamente desafiador e requer a aplicação de esforços adicionais e efetivos por parte das entidades gerenciadoras.
      </Typography>

      <Typography component="p">
        Portanto, partindo de uma abordagem multidispliciplinar que envolve Turismo e Ciência da Computação, este trabalho promove transparência sobre a atuação das plataformas envolvidas ao propor a implementação de um web scraping e técnicas de ciência de dados para extrair e analisar de forma automatizadas os dados de interesse tanto do Airbnb quanto do Booking.
      </Typography>

      <Typography component="p">
        Ao navegar por esse site, você pode ver ou solicitar dados sobre acomodoções ofertadas por ambas as plataformas em determinado espaço de tempo. Abaixo, por exemplo, são listadas as cidades cujos dados já foram coletados previamente. Dê uma olhada!
      </Typography>

      {_tableData && <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
        buttons={<TableButtons />}
      />}
    </PrivatePageStructure>
  )
}

export default comumroute(Home);