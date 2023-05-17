import { Task } from "gantt-task-react";
import { useMemo } from "react";
import useTheme from "~/hooks/useTheme";
import Flexbox from "../Layout/Flexbox/Flexbox";
import Typography from "../Typography/Typography";

import styles from './gantt.module.scss';

interface TooltipContentProps {
  task: Task;
  fontSize: string; fontFamily: string;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ task, fontSize, fontFamily }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.tooltipContent} ${styles[`theme${theme}`]}`}>
      <Flexbox flexDirection="column">
        <Typography component="h5">
          {task.name}
        </Typography>
        {/* <Typography component="caption">
          Duração: {task.end.getDate() - task.start.getDate()} dia(s)
        </Typography> */}
        {task.progress >= 0 ?
          <Typography component="caption">
            Progresso: {task.progress.toFixed(2)}%
          </Typography> : null
        }
      </Flexbox>
    </div>
  )
}

export default TooltipContent;