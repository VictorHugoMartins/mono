import React from "react";

import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";

import { DataTableColumnRenderType } from "~/types/global/DataTableColumnRenderType";

import RedirectTo from "~/utils/Redirect/Redirect";
import { IconTypes } from "../../Icon/icon.interface";

interface DataTableRedirectButtonProps {
  rowData?: any;
  href: string;
  field?: string;
  title: string;
  icon?: IconTypes;
}

export default function DataTableRedirectButton({
  rowData,
  href,
  field,
  icon,
  title,
}: DataTableRedirectButtonProps) {
  return (
    <DataTableButton
      icon={icon || "FaExternalLinkAlt"}
      href={`${href}${rowData ? rowData[field] : ""}`}
      title={title}
    />
  );
}
