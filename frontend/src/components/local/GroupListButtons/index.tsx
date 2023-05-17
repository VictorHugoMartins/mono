import React from "react";
import { SprintListRedirectButton } from "~/components/structure/SprintListPage";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableRedirectButton from "~/components/ui/DataTable/DataTableRedirectButton";
import { Modal } from "~/components/ui/Modal/Modal";
import { ChartDetailsModal } from "../ChartDetailsModal";

// tipagem de propriedades recebidas
interface Props {
  rowData?: any;
}

export function GroupListButton({ rowData }: Props) {
  // componente de icons controle financeiro

  return (
    <>
      <SprintListRedirectButton
        rowData={rowData}
        href={"/controlefinanceiro/detalhes?OFXListId="}
        field={"id"}
        title="OFXs"
      />
      {rowData?.chartVisible && (
        <DataTableRedirectButton
          rowData={rowData}
          href={"/controlefinanceiro/graficos?OFXListId="}
          field={"id"}
          title="Graficos"
          icon="FaChartBar"
        />
      )}
    </>
  );
}
