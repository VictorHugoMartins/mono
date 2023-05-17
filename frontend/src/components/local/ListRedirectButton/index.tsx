import React from "react";

import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";

import RedirectTo from "~/utils/Redirect/Redirect";

interface ListRedirectButtonProps {
  rowData?: any;
  href: string;
  field?: string;
  title: string;
}

export function ListRedirectButton({
  rowData,
  href,
  field,
  title,
}: ListRedirectButtonProps) {
  return (
    <DataTableButton
      icon="FaExternalLinkAlt"
      href={`${href}${rowData ? rowData[field] : ""}`}
      title={title}
    />
  );
}
