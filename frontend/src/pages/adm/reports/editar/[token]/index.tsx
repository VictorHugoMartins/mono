import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";
import { API_REPORT } from "~/config/apiRoutes/report";

interface ReportsEditProps {
  token: string;
}

const ReportsEdit: React.FC<ReportsEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Estrutura de Relatorio"
      returnPath="/adm/reports/lista"
    >
      <FormPageStructure
        buildPath={API_REPORT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/reports/lista"
        submitPath={API_REPORT.SAVE()}
        preparePath={API_REPORT.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(ReportsEdit);
