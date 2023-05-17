import React from "react";

import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import ModalLinkUsers from "./components/ModalLinkUsers";

import RedirectTo from "~/utils/Redirect/Redirect";

interface ProjectListButtonsProps {
  rowData?: any;
}

export function ProjectListButtons({ rowData }: ProjectListButtonsProps) {
  return (
    <>
      <ModalLinkUsers projectId={rowData?.id} />
      {/* <DataTableButton
        icon="FaExternalLinkAlt"
        href={`/adm/sprints/lista?ProjectId=${rowData?.id}`}
        title="Sprints"
      /> */}
    </>
  );
}
