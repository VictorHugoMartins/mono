import { Task } from "gantt-task-react";
import { useEffect, useState } from "react";
import useTheme from "~/hooks/useTheme";
import PopupLoading from "../Loading/PopupLoading/PopupLoading";

import styles from './gantt.module.scss';

interface TaskListTableProps {
  rowHeight: number; rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  level: boolean;
}

export const TaskListTable: React.FC<TaskListTableProps> = ({ rowHeight, rowWidth, fontFamily, fontSize, locale, tasks, selectedTaskId, setSelectedTask, onExpanderClick, level }) => {
  const { theme } = useTheme();
  
  function isUser(task: Task) {
    return (!task.id.includes("Project")) && (!task.id.includes("Sprint"));
  }

  function _getClassNameFromTaskType(task: Task) {
    if (task.id.includes("ProjectItem")) return isUser(tasks[0]) ? `${styles.task} ${styles.dashboard}` : styles.task;
    else if (task.id.includes("Project")) return isUser(tasks[0]) ? `${styles.project} ${styles.dashboard}` : styles.project;
    else if (task.id.includes("SprintCollection")) return isUser(tasks[0]) ? `${styles.sprintCollection} ${styles.dashboard}` : styles.sprintCollection;
    else if (task.id.includes("Sprint")) return isUser(tasks[0]) ? `${styles.sprint} ${styles.dashboard}` : styles.sprint;
    else return styles.user;
  }

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map((t) => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true || (t.dependencies && t.dependencies.includes("root"))) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={`${styles.taskListTableRow} ${_getClassNameFromTaskType(t)} ${styles[`theme${"light"}`]}`}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={`${styles.taskListCell}`}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div className={styles.textName}>{t.name}</div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{t.start.toLocaleDateString('pt-br')}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{t.end.toLocaleDateString('pt-br')}
            </div>
          </div>

        );
      })}
    </div>
  )
}

export default TaskListTable;