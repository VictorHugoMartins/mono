import React, { useEffect, useState } from "react";

import chartService, { BurnDownTableType } from "~/services/chart.service";
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

import Toast from "~/utils/Toast/Toast";

import Typography from "~/components/ui/Typography/Typography";
import Button from "~/components/ui/Button/Button";
import DataTable from "~/components/ui/DataTable/DataTable";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

import style from "./sprintDetailsModalModule.module.scss";

import ColumnContent from "~/components/ui/Layout/ColumnContent/ColumnContent";
import RowWithValue from "~/components/ui/Layout/RowWithValuue/RowWithValue";

interface SprintDetailsModalProps {
  preparePath: string;
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const SprintDetailsModal: React.FC<SprintDetailsModalProps> = ({
  preparePath,
  handleClose,
}) => {
  const [_prepareData, setPrepareData] = useState<BurnDownTableType>(null);

  useEffect(() => {
    _preparePage();
  }, []);

  async function _preparePage() {
    let response = await chartService.getTableList(preparePath);

    if (response.success) {
      setPrepareData(response.object);
    } else {
      setPrepareData(null);
      Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
    }
  }

  return (
    <>
      <PopupLoading show={!_prepareData} />
      {_prepareData && (
        <>
          <Typography component="h4">
            {_prepareData.detailSprint.projectName} -{" "}
            {_prepareData.detailSprint.sprintName}
          </Typography>

          <ColumnContent columnCount={2}>
            <RowWithValue
              title="Início"
              value={_prepareData.detailSprint.startDate}
            />
            <RowWithValue
              title="Fim"
              value={_prepareData.detailSprint.endDate}
            />
          </ColumnContent>

          <ColumnContent columnCount={2}>
            <RowWithValue
              title="Pontos totais"
              value={_prepareData.detailSprint.valueTotal}
            />
            <RowWithValue
              title="Pontos concluídos (%)"
              value={_prepareData.detailSprint.percentConclusion}
            />
            <RowWithValue
              title="Pontos queimados"
              value={_prepareData.detailSprint.burnedValue}
            />
          </ColumnContent>

          <ColumnContent columnCount={2}>
            <RowWithValue
              title="Horas previstas"
              value={_prepareData.detailSprint.previsionHours}
            />
            <RowWithValue
              title="Horas gastas"
              value={_prepareData.detailSprint.concludedHours}
            />
          </ColumnContent>

          <RowWithValue
            title="Indicador de pontos"
            value={_prepareData.detailSprint.pointsIndicator}
          />

          <DataTable
            columns={_prepareData?.dataTable.columns}
            rows={_prepareData?.dataTable.rows}
            paginator
          />

          <div className={style.buttonsArea}>
            <Button color="danger" text="Fechar" onClick={handleClose} />
          </div>
        </>
      )}
    </>
  );
};

export default SprintDetailsModal;
