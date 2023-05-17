import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";
import { API_REPORTGENERATOR } from "~/config/apiRoutes/reportGenerator";
import { CHART_DOCUMENTATION } from "~/config/links";
import Typography from "~/components/ui/Typography/Typography";

interface ReportsEditProps {
  token: string;
  returnUrl?: string;
}

const PdfLink: React.FC = () => {
  return (
    <Typography component="p">
      Está com dúvidas? Clique{" "}
      <strong>
        <a target="_blank" href={CHART_DOCUMENTATION}>
          aqui
        </a>
      </strong>{" "}
      para entender como criar um gráfico.
    </Typography>
  );
};

const ReportsEdit: React.FC<ReportsEditProps> = ({ returnUrl, token }) => {
  return (
    <PrivatePageStructure
      title="Editar Relatorio Gerado"
      returnPath={`/adm/${returnUrl || "reportsGenerator"}/lista`}
    >
      <FormPageStructure
        buildPath={API_REPORTGENERATOR.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={`/adm/${returnUrl || "reportsGenerator"}/lista`}
        submitPath={API_REPORTGENERATOR.SAVE()}
        preparePath={API_REPORTGENERATOR.PREPARE(token)}
        onSuccess={FormSuccess}
        subtitleComponent={<PdfLink />}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { returnUrl, token } = ctx.query;

  return { props: { token: token, returnUrl: returnUrl || null } };
};

export default privateroute(ReportsEdit);
