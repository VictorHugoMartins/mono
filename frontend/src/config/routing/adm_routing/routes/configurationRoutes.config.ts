import { RoutingsType } from "~/types/global/RoutingType";

const CONFIGURATION_ROUTES: RoutingsType = [
  {
    path: "/adm/configuracoes",
    routes: [
      {
        name: "Lista de Configurações",
        path: "/adm/configuracoes/lista",
      },
      {
        name: "Adicionar Configuração",
        path: "/adm/configuracoes/adicionar",
      },
      {
        name: "Editar Configuração",
        path: "/adm/configuracoes/editar/**",
      },
    ],
  },
];

export default CONFIGURATION_ROUTES;
