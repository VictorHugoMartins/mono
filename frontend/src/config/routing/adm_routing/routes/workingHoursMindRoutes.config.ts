import { RoutingsType } from "~/types/global/RoutingType";

const WORKINGHOURSMIND_ROUTES: RoutingsType = [
  {
    name: "Controle de Lançamentos",
    path: "/adm/controledelancamentos",
    routes: [
      {
        name: "Novo Lançamento",
        path: "/adm/controledelancamentos/criar",
      },
      {
        name: "Novo Lançamento em massa",
        path: "/adm/controledelancamentos/criarmultiplos",
      },
      {
        name: "Editar Configuração",
        path: "/adm/controledelancamentos/editar/**",
      },
    ],
  },
];

export default WORKINGHOURSMIND_ROUTES;
