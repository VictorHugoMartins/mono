import { parseCookies } from "nookies";
import { useEffect } from "react";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import privateroute from "~/routes/private.route";
import Toast from "~/utils/Toast/Toast";
import Typography from "~/components/ui/Typography/Typography";
import { API_SYSTEM } from "~/config/apiRoutes/system";

function MySuperSurveys() {
  const { userId, permission } = parseCookies();

  useEffect(() => {
    if (userId && permission !== "adm") {
      Toast.error("Você não tem permissão para acessar essa página!")
      setTimeout(() => {
        window.location.assign("/")
      }, 3000);
    } else if (userId && permission === "adm") {
      updateLocations(userId);
    }
  }, [userId, permission])

  const updateLocations = (userId: string) => {
    const apiUrl = API_SYSTEM.UPDATELOCATIONS(userId);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = { method: 'GET', headers };

    const resp = fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) Toast.success('Pronto! Tudo está ok, pode fechar a página e continuar navegando livremente')
        else Toast.error(data.message)
      })
      .catch(error => { Toast.error(error) });

    return resp;
  };

  return (
    <PrivatePageStructure title={"Manutenção"}>
      <Typography component={"h3"}>Não se preocupe!</Typography>
      <Typography component={"p"}>
        Tudo o que você tem que fazer por enquanto é deixar essa página aberta enquanto algumas rotinas de manutenção são executadas em segundo plano. Se algo der errado (ou, no melhor caso, se tudo der certo), você será notificado!
      </Typography>
    </PrivatePageStructure>
  )
}

export default privateroute(MySuperSurveys);