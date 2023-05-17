import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CustomColumnsForCrudTable } from "~/components/ui/DataTable/AdmTable/CustomColumnsForCrudTable";
import ListDateHeaderFilters from "~/components/local/ListDateHeaderFilters";
import {
  ChildrenTable,
  BuildProjectModalContent,
} from "~/components/local/ProjectControlPage/ChildrenTable";
import CollapseListPageStruture from "~/components/structure/CollapseListPageStruture";
import { ProjectListButtons } from "~/components/structure/ProjectsListPage";
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";
import { API_PROJECT } from "~/config/apiRoutes/project";
import privateroute from "~/routes/private.route";
import UpdatePath from "~/utils/UpdatePath";

interface PageStructureProps {
  noPadding?: boolean;
  returnPath?: string;
  title?: string;
}

interface ProjectItemProps
  extends PageStructureProps,
    DataTableTabsRenderProps {
  startdate: string | null;
  enddate: string | null;
  management?: string;
  status?: string;
}

const Index: React.FC<ProjectItemProps> = ({
  startdate,
  enddate,
  management,
  status,
}) => {
  const [_dates, setDates] = useState({
    startdate: startdate,
    enddate: enddate,
  });

  const pageBase = "/adm/controledeprojetos/lista";
  const router = useRouter();
  const [_url, setUrl] = useState<string>("");

  const [_management, setManagement] = useState(management);
  const [_status, setStatus] = useState(status);

  function _setUrlParam(management: number, status: number) {
    UpdatePath(pageBase, { management, status });
    setUrl(`${pageBase}?management=${management}%26status=${status}`);
  }

  // useEffect(() => {
  //   addEventListener("popstate", (event) => {
  //     return handlePopState(document, event, pageBase, updateFiltersFromURL);
  //   });
  // }, []);

  // function handlePopState(
  //   document: Document,
  //   event: PopStateEvent,
  //   pathBase: string,
  //   updateFiltersFromURL: { (url: string): void; (arg0: any): void }
  // ) {
  //   let _pathname = document.location.toString();
  //   if (!_pathname.includes("view=") && _pathname.includes(pathBase)) {
  //     Router.back();

  //     return true;
  //   }
  //   if (document.location !== event?.state?.url) {
  //     updateFiltersFromURL(event?.state?.url);
  //   }
  //   return true;
  // }

  // function updateFiltersFromURL(url: string) {
  //   if (!url) return;
  //   setView(url.split("view=")[1]);
  // }

  // router.beforePopState(({ url, as, options }) => {
  //   if (!as.includes(pageBase)) {
  //     window.location.assign(as);
  //     return false;
  //   }

  //   return true;
  // });

  return (
    <CollapseListPageStruture
      param="id"
      exportPath={API_PROJECT.EXPORTLISTCOMPLETE(
        _dates.startdate,
        _dates.enddate
      )}
      initialHeaderTab={_management ? Number(_management) : null}
      initialBodyTab={_status ? Number(_status) : null}
      removeAPIPath={API_PROJECT.DELETE()}
      getListPath={API_PROJECT.GETALLGROUPEDBYSTATUSATMANAGEMENT(
        _dates.startdate,
        _dates.enddate
      )}
      getListisPost
      optionsPath={API_PROJECT.MANAGEMENT_OPTIONS()}
      onExternalTabChange={(h, b) => _setUrlParam(h, b)}
      externalHeaderRender={
        <ListDateHeaderFilters
          enddate={_dates.enddate}
          startdate={_dates.startdate}
          filterPath={API_PROJECT.GETALLGROUPEDBYSTATUSATMANAGEMENT}
          setDates={setDates}
        />
      }
      modalPostLabel={"Adicionar Projeto"}
      modalPostEditLabel={"Editar Projeto"}
      tabStyle="1"
      title={"Controle de Projetos"}
      customizedBodyColumns={<CustomColumnsForCrudTable />}
      buttons={<ProjectListButtons />}
      editComponent={<BuildProjectModalContent />}
      children={ChildrenTable}
      allowEdit
      hideCard
      noOptions
      details
      expander
      collapseAllButton
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let startdate = null;
  let enddate = null;

  const { management, status } = ctx.query;

  return {
    props: {
      management: management ?? 0,
      status: status ?? 0,
      startdate: startdate,
      enddate: enddate,
    },
  };
};

export default privateroute(Index);
