import { RoutingsType } from "~/types/global/RoutingType";

import CONFIGURATION_ROUTES from "./routes/configurationRoutes.config";
import KNOWLEDGEBASE_ROUTES from "./routes/knowledgebaseRoutes.config";
import PROJECT_ROUTES from "./routes/projectRoutes.config";
import WORKINGHOURSMIND_ROUTES from "./routes/workingHoursMindRoutes.config";

const ADM_ROUTES: RoutingsType = [
  {
    path: "/adm",
    routes: [
      ...CONFIGURATION_ROUTES,
      ...KNOWLEDGEBASE_ROUTES,
      ...PROJECT_ROUTES,
      ...WORKINGHOURSMIND_ROUTES,
    ],
  },
];

export default ADM_ROUTES;
