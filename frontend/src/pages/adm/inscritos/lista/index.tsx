import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import CollapseListPageStruture, {
  CollapseListPageStrutureProps,
} from "~/components/structure/CollapseListPageStruture";
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";
import privateroute from "~/routes/private.route";
import UpdatePath from "~/utils/UpdatePath";

import { API_CONTACT_DATA } from "~/config/apiRoutes/contactData";

interface LeadsListProps
  extends CollapseListPageStrutureProps,
  DataTableTabsRenderProps {
  startdate: string | null;
  enddate: string | null;
  management?: string;
  project?: string;
}

const LeadsList: React.FC<LeadsListProps> = ({
  startdate,
  enddate,
  management,
  project,
}) => {

  const [_dates, setDates] = useState({
    startdate: startdate,
    enddate: enddate,
  });

  const pageBase = "/adm/inscritos/lista";
  const router = useRouter();
  const [_url, setUrl] = useState<string>("");

  const [_management] = useState(management);
  const [_project] = useState(project);

  function _setUrlParam(management: number, project: number) {
    UpdatePath(pageBase, { management, project });
    setUrl(`${pageBase}?management=${management}&project=${project}`);
  }

  return (
    <CollapseListPageStruture
      param="id"
      exportPath={API_CONTACT_DATA.EXPORTLIST()}
      initialHeaderTab={_management ? Number(_management) : null}
      initialBodyTab={_project ? Number(_project) : null}
      getListPath={API_CONTACT_DATA.GETALLGROUPED('')}
      optionsPath={API_CONTACT_DATA.MANAGEMENT_OPTIONS}
      onExternalTabChange={(h, b) => _setUrlParam(h, b)}
      tabStyle="1"
      title={"Lista de Inscritos"}
      hideCard
      details
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let startdate = null;
  let enddate = null;

  const { management, project } = ctx.query;

  return {
    props: {
      management: management ?? 0,
      project: project ?? 0,
      startdate: startdate,
      enddate: enddate,
    },
  };
};

export default privateroute(LeadsList);
