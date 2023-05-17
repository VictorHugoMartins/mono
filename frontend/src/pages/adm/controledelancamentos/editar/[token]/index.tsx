import React from "react";
import { GetServerSideProps } from "next";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import WorkingHoursFormPage from "~/components/structure/WorkingHoursFormPage";

import privateroute from "~/routes/private.route";

interface WorkingHoursMindEditProps {
  token: string;
}

const WorkingHoursMindEdit: React.FC<WorkingHoursMindEditProps> = ({
  token,
}) => {
  return (
    <PrivatePageStructure
      title="Editar lançamento"
      returnPath="/adm/controledelancamentos"
    >
      <WorkingHoursFormPage
        adm
        urlReturn="/adm/controledelancamentos"
        token={token}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(WorkingHoursMindEdit);
