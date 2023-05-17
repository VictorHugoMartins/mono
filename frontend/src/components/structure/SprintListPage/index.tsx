import React from "react";

import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";

import { DataTableColumnRenderType } from "~/types/global/DataTableColumnRenderType";

import RedirectTo from "~/utils/Redirect/Redirect";

export function SprintListRedirectButton({
  rowData,
  href,
  field,
  title,
  params,
}: DataTableColumnRenderType) {
  return (
    <DataTableButton
      icon="FaExternalLinkAlt"
      title={title}
      href={`${href}${rowData ? rowData[field] : ""}${params || ""}`}
    />
  );
}
