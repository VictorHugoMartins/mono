import React from "react";
import { GroupListButton } from "~/components/local/GroupListButtons";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import DataTableGroupedRender from "~/components/ui/DataTable/DataTableGroupedRender/DataTableGroupedRender";
import PageHead from "~/components/ui/PageHead";
import { API_OFX } from "~/config/apiRoutes/ofx";
import privateroute from "~/routes/private.route";

const OFXList: React.FC = () => {
  return (
    <PrivatePageStructure title="Controle Financeiro" noPadding>
      <DataTableGroupedRender
        createPath="/controlefinanceiro/adicionar"
        editPath="/controlefinanceiro/editar"
        removeAPIPath={API_OFX.DELETE()}
        param="id"
        getListPath={API_OFX.GETALL()}
        exportPath={API_OFX.EXPORTLISTOFXS()}
        details
        buttons={<GroupListButton />}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(OFXList);
