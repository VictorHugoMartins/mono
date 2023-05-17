import { RoutingsType } from "~/types/global/RoutingType";

const PROJECT_ROUTES: RoutingsType = [
  {
    path: "/adm/projetos",
    routes: [
      {
        name: "Lista de Projetos",
        path: "/adm/projetos/lista",
      },
      {
        name: "Adicionar Projeto",
        path: "/adm/projetos/adicionar",
      },
      {
        name: "Editar Projeto",
        path: "/adm/projetos/editar/**",
      },
    ],
  },
];

export default PROJECT_ROUTES;
