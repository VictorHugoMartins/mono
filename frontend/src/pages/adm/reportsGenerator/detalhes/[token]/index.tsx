import React, { useState } from "react";
import { GetServerSideProps } from "next";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import privateroute from "~/routes/private.route";
import ReportGeneratorRender from "~/components/ui/Report/ReportGeneratorRender";
import { API_REPORTGENERATOR } from "~/config/apiRoutes/reportGenerator";

interface ReportsGeneratorProps {
  token: string;
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ token }) => {
  const [_title, setTitle] = useState<string>("");

  return (
    <PrivatePageStructure
      title={`Relatório ${_title}`}
      returnPath="/adm/reportsGenerator/lista"
    >
      <ReportGeneratorRender
        exportPath={API_REPORTGENERATOR.EXPORTLISTREPORT(token)}
        token={token}
        returnUrl="/adm/reportsGenerator/lista"
        setTitle={setTitle}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(ReportsGenerator);
