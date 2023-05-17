import { GetServerSideProps } from "next";
import React, { useState } from "react";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import WorkingHoursListPage from "~/components/structure/WorkingHoursListPage";
import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";

import privateroute from "~/routes/private.route";

interface WorkingHoursList {
  startdate: string;
  enddate: string;
}

const WorkingHoursList: React.FC<WorkingHoursList> = ({
  startdate,
  enddate,
}) => {
  const [_dates, setDates] = useState({ startdate: startdate, enddate: enddate });

  return (
    <PrivatePageStructure title="Lançamento de Horas" noPadding>
      <WorkingHoursListPage
        param="id"
        createPath={[
          { value: "/usuario/horastrabalhadas/criar", label: "Individual" },
          {
            value: "/usuario/horastrabalhadas/criarmultiplos",
            label: "Em massa",
          },
        ]}
        exportPath={API_WORKINGHOURS.EXPORTLIST(_dates.startdate, _dates.enddate)}
        editPath="/usuario/horastrabalhadas/editar"
        filterPath={API_WORKINGHOURS.GETALL}
        getListPath={API_WORKINGHOURS.GETALL(_dates.startdate, _dates.enddate)}
        getListisPost
        removeAPIPath={API_WORKINGHOURS.DELETE()}
        enddate={_dates.enddate}
        startdate={_dates.startdate}
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
    new Date().getDate() - 15
  );
  let enddate = new Date();

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
    },
  };
};

export default privateroute(WorkingHoursList);
