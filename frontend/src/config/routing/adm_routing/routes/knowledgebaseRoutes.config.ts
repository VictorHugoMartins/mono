import { RoutingsType } from "~/types/global/RoutingType";

const KNOWLEDGEBASE_ROUTES: RoutingsType = [
  {
    path: "/adm/basedeconhecimento",
    routes: [
      {
        path: "/adm/basedeconhecimento/artigos",
        routes: [
          {
            name: "Lista de Artigos",
            path: "/adm/basedeconhecimento/artigos/lista",
          },
          {
            name: "Adicionar Artigo",
            path: "/adm/basedeconhecimento/artigos/adicionar",
          },
          {
            name: "Editar Artigo",
            path: "/adm/basedeconhecimento/artigos/editar/**",
          },
        ],
      },
      {
        path: "/adm/basedeconhecimento/categorias",
        routes: [
          {
            name: "Lista de Categorias de Conteudo",
            path: "/adm/basedeconhecimento/categorias/lista",
          },
          {
            name: "Adicionar Categoria de Conteudo",
            path: "/adm/basedeconhecimento/categorias/adicionar",
          },
          {
            name: "Editar Categoria de Conteudo",
            path: "/adm/basedeconhecimento/categorias/editar/**",
          },
        ],
      },
      {
        path: "/adm/basedeconhecimento/videos",
        routes: [
          {
            name: "Lista de Videos",
            path: "/adm/basedeconhecimento/videos/lista",
          },
          {
            name: "Adicionar Video",
            path: "/adm/basedeconhecimento/videos/adicionar",
          },
          {
            name: "Editar Video",
            path: "/adm/basedeconhecimento/videos/editar/**",
          },
        ],
      },
    ],
  },
];

export default KNOWLEDGEBASE_ROUTES;
