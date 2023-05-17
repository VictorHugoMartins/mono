import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import DataTableTabsRender from "~/components/ui/DataTable/DataTableTabsRender/DataTableTabsRender";
import { OFXDetailsListButtons } from "~/components/structure/OFXDetailsListPage";
import PageHead from "~/components/ui/PageHead";

import { API_OFX } from "~/config/apiRoutes/ofx";

import privateroute from "~/routes/private.route";

import ofxService, { OfxRenderType } from "~/services/ofx.service";

import Toast from "~/utils/Toast/Toast";
import RedirectTo from "~/utils/Redirect/Redirect";
import { ModalManualTransactionForm } from "~/components/local/OFXListModals/ModalManualTransactionForm";

interface OFXListProps {
  ofxListId: string;
}

const OFXDetailsList: React.FC<OFXListProps> = ({ ofxListId }) => {
  const [transactionList, setTransactionList] = useState<OfxRenderType>(null);

  useEffect(() => {
    _getList();
  }, []);

  async function _getList() {
    let response = await ofxService.getList(API_OFX.GETBYTOKEN(ofxListId));

    if (response.success) setTransactionList(response.object);
    else {
      Toast.error("Ofx não encontrada");
      RedirectTo("/controlefinanceiro/lista/");
    }
  }

  return (
    <PrivatePageStructure title="Detalhes Ofx" noPadding>
      <DataTableTabsRender
        buttons={
          <OFXDetailsListButtons
            classificationsEntry={transactionList?.classificationsEntry}
            classificationsExit={transactionList?.classificationsExit}
            getList={_getList}
            ofxId={ofxListId}
          />
        }
        details
        externalData={transactionList?.dataTable}
        externalGetList={_getList}
        exportPath={API_OFX.EXPORTLISTTRANSACTIONS(ofxListId)}
        headerRender={
          <ModalManualTransactionForm getList={_getList} ofxId={ofxListId} />
        }
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { OFXListId } = ctx.query;

  if (!OFXListId) {
    return {
      notFound: true,
    };
  }

  return { props: { ofxListId: OFXListId } };
};

export default privateroute(OFXDetailsList);
