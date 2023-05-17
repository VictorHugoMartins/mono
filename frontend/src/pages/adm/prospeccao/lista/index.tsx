import React from "react";
import { GetServerSideProps } from "next";

//Import components
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import ProspectionListPageStructure from "~/components/structure/ProspectionListPageStructure";

//Import routes
import privateroute from "~/routes/private.route";

type ProspectionListProps = {
  startdate: string;
  enddate: string;
  management: string;
  status: string;
};

const ProspectionList: React.FC<ProspectionListProps> = ({
  startdate,
  enddate,
  management,
  status,
}) => {
  return (
    <PrivatePageStructure title="Prospecções de Clientes" noPadding>
      <ProspectionListPageStructure
        startdate={startdate}
        enddate={enddate}
        management={management}
        status={status}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const months = 1;
  let startdate = new Date(Date.now() - 24 * 30 * months * 3600 * 1000);
  let enddate = new Date();

  const { management, status } = ctx.query;

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
      management: management??null,
      status: status??null,
    },
  };
};

export default privateroute(ProspectionList);
