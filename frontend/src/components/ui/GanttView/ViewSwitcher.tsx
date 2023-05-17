import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import Typography from "../Typography/Typography";
import Flexbox from "../Layout/Flexbox/Flexbox";

import styles from "./gantt.module.scss";
import useTheme from "~/hooks/useTheme";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
  activeView?: string;
};

type ViewSwitcherButtonProps = {
  label: string;
  viewMode: ViewMode;
  onClick: (viewMode: ViewMode) => void;
};



export const ViewSwitcher: React.SFC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  activeView
}) => {
  const { theme } = useTheme();

  function ViewSwitcherButton({
    label,
    viewMode,
    onClick,
  }: ViewSwitcherButtonProps) {
    return (
      <button className={`${styles.button} ${activeView === viewMode && styles.active}`} onClick={() => onClick(viewMode)}>
        <Typography component="span">{label}</Typography>
      </button>
    );
  }

  return (
    <div className="ViewContainer">
      <Flexbox
        justify="space-between"
        align="center"
        margin={{ bottom: "m" }}
        wrap
      >
        <div className={`${styles.switch} ${styles[`theme${theme}`]}`}>
          <label className="Switch_Toggle">
            <input
              type="checkbox"
              defaultChecked={isChecked}
              onClick={() => onViewListChange(!isChecked)}
            />
            <span className="Slider" />
          </label>
          <Typography component="span">Mostrar detalhes</Typography>
        </div>


        <Flexbox spacing="m">
          <ViewSwitcherButton
            label="Dia"
            viewMode={ViewMode.Day}
            onClick={onViewModeChange}
          />
          <ViewSwitcherButton
            label="Semana"
            viewMode={ViewMode.Week}
            onClick={onViewModeChange}
          />
          <ViewSwitcherButton
            label="Mês"
            viewMode={ViewMode.Month}
            onClick={onViewModeChange}
          />
          <ViewSwitcherButton
            label="Ano"
            viewMode={ViewMode.Year}
            onClick={onViewModeChange}
          />
        </Flexbox>
      </Flexbox>
    </div>
  );
};
