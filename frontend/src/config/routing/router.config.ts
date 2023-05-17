import { RoutingsType } from "~/types/global/RoutingType";
import ADM_ROUTING from "./adm_routing/routes/projectRoutes.config";

const ROUTING: RoutingsType = [
  {
    name: "Home",
    path: "/",
  },
  ...ADM_ROUTING,
];

export default ROUTING;
