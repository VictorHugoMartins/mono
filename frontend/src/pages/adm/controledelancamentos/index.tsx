import { GetServerSideProps } from "next";
import React, { useState } from "react";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import WorkingHoursListPage from "~/components/structure/WorkingHoursListPage";
import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";

import privateroute from "~/routes/private.route";

interface WorkingHoursMindList {
  startdate: string;
  enddate: string;
}

const WorkingHoursMindList: React.FC<WorkingHoursMindList> = ({
  startdate,
  enddate,
}) => {
  const [_dates, setDates] = useState({ startdate: startdate, enddate: enddate });

  return (
    <PrivatePageStructure title="Controle de Lançamentos" noPadding>
      <WorkingHoursListPage
        param="id"
        createPath={[
          { value: "/adm/controledelancamentos/criar", label: "Individual" },
          {
            value: "/adm/controledelancamentos/criarmultiplos",
            label: "Em massa",
          },
        ]}
        editPath="/adm/controledelancamentos/editar"
        exportPath={API_WORKINGHOURS.EXPORTLISTADM(_dates.startdate, _dates.enddate)}
        filterPath={API_WORKINGHOURS.GETALLADM}
        getListPath={API_WORKINGHOURS.GETALLADM(_dates.startdate, _dates.enddate)}
        getListisPost
        removeAPIPath={API_WORKINGHOURS.DELETE()}
        enddate={enddate}
        startdate={startdate}
        details
        setDates={setDates}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let startdate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  );
  let enddate = new Date();

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
    },
  };
};

export default privateroute(WorkingHoursMindList);
