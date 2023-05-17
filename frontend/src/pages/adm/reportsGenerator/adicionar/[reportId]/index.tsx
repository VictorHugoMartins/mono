import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_REPORTGENERATOR } from "~/config/apiRoutes/reportGenerator";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";
import { CHART_DOCUMENTATION } from "~/config/links";
import Typography from "~/components/ui/Typography/Typography";

interface ReportsGeneratorAddProps {
  reportId: string;
  returnUrl?: string;
}

const PdfLink: React.FC = () => {
  return (
    <Typography component="p" margin={{ bottom: "xg" }} themed>
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

const ReportsGeneratorAdd: React.FC<ReportsGeneratorAddProps> = ({
  reportId,
  returnUrl,
}) => {
  return (
    <PrivatePageStructure
      title="Gerar Relatorio"
      returnPath={`/adm/${returnUrl || "reportsGenerator"}/lista`}
    >
      <FormPageStructure
        buildPath={API_REPORTGENERATOR.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={`/adm/${returnUrl || "reportsGenerator"}/lista`}
        submitPath={API_REPORTGENERATOR.SAVE()}
        hiddenInputs={{ reportId }}
        onSuccess={FormSuccess}
        subtitleComponent={<PdfLink />}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { returnUrl, reportId } = ctx.query;

  return { props: { reportId: reportId, returnUrl: returnUrl || null } };
};

export default privateroute(ReportsGeneratorAdd);
