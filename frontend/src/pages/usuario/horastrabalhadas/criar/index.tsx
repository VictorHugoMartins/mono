import React from "react";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import WorkingHoursFormPage from "~/components/structure/WorkingHoursFormPage";

import privateroute from "~/routes/private.route";

interface WorkingHoursMindAddProps {}

const WorkingHoursMindAdd: React.FC<WorkingHoursMindAddProps> = () => {
  return (
    <PrivatePageStructure
      title="Cadastre aqui um novo lançamento!"
      returnPath="/usuario/horastrabalhadas"
    >
      <WorkingHoursFormPage urlReturn="/usuario/horastrabalhadas" />
    </PrivatePageStructure>
  );
};

export default privateroute(WorkingHoursMindAdd);
