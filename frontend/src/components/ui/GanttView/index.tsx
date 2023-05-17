import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useEffect, useState } from "react";
import { GanttDataType } from "~/types/global/GanttTypes";
import ganttService, { GanttRequestType } from "~/services/gantt.service";
import { HandleStatusStyles } from "~/utils/HandleStatuStyles";
import { getStartEndDateForProject } from "./helpers";
import { TaskListHeader } from "./TaskListHeader";
import TaskListTable from "./TaskListTable";
import TooltipContent from "./TooltipContent";
import { ViewSwitcher } from "./ViewSwitcher";

interface GantViewProps {
  data: GanttDataType;
  getChildrenPath?: string;
  filtersData?: object;
  externalViewSwitcher?: boolean;
  externalIsChecked?: boolean;
  externalView?: ViewMode;
}

const GanttView: React.FC<GantViewProps> = ({
  data,
  getChildrenPath,
  filtersData,
  externalViewSwitcher,
  externalIsChecked,
  externalView
}) => {
  const [view, setView] = useState<ViewMode>(ViewMode.Year);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 180;
  if (view === ViewMode.Month) {
    columnWidth = 100;
  } else if (view === ViewMode.Week) {
    columnWidth = 100;
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      let array = [];
      for (let i = 0; i < data?.data.length; i++) {
        let item = data.data[i];
        array[i] = {
          id: item.id,
          type: item.type.toLowerCase(),
          name: item.name,
          progress: item.progress,
          project: item.project,
          styles: HandleStatusStyles(item.progress?.toString(), item.status),
          start: getChildrenPath
            ? new Date(new Date().getFullYear() - 1, 0, 1)
            : new Date(item.start),
          end: getChildrenPath
            ? new Date(new Date().getFullYear(), 11, 31)
            : new Date(item.end),
          hideChildren: true,
          dependencies: !item.project ? ["root"] : [],
        };
      }
      setTasks(array);
      setLoaded(true);
    }
  }, [data?.data]);

  const handleTaskChange = (task: Task) => {
    // console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    // console.log("On progress change Id:" + task.id);
  };

  async function _getDataAsync(task: Task) {
    let _filterData = { ...filtersData, users: [task.id] } as GanttRequestType;
    let response = await ganttService.getData(getChildrenPath, _filterData);

    if (response.success) {
      let selectedTask = task; // testar isso aqui na linha 128 quando remover task teste
      selectedTask.dependencies = ["-"];

      // if (response.object.data.length === 0) return;
      let childrenTasks =
        response.object.data.length > 0 ? response.object.data : [];
      // setTasks([] as Task[]);

      let newArray = [selectedTask];

      for (let i = 1; i <= childrenTasks.length; i++) {
        newArray.push(childrenTasks[i - 1]);
        newArray[i].project = newArray[i].project ?? task.id;
      }

      let k = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === task.id) {
          k = i;
          break;
        }
      }

      let x = tasks.slice(0, k);
      x = x.concat(newArray).concat(tasks.slice(k + 1, tasks.length));

      let y = getFormattedGanntData(x);
      // setTasks(y);

      setTasks(y.map((t) => (t.id === task.id ? task : t)));
    }
  }

  // useEffect(() => {
  //   // console.log("tasks exibidas: ", tasks);
  // }, [tasks]);

  function getFormattedGanntData(ganttData: any) {
    let returnedArray = [];
    for (let i = 0; i < ganttData.length; i++) {
      let item = ganttData[i];
      returnedArray[i] = {
        id: item.id,
        type: item.type.toLowerCase(),
        name: item.name,
        progress: item.progress,
        project: item.project === item.id ? null : item.project,
        styles: HandleStatusStyles(item.progress?.toString(), item.status),
        start: new Date(item.start),
        end: new Date(item.end),
        hideChildren: true,
        dependencies:
          !item.project && !item.dependencies.includes("-")
            ? ["root"]
            : item.dependencies?.includes("-")
              ? ["-"]
              : [],
      };
    }
    return returnedArray;
  }

  const handleExpanderClick = (task: Task) => {
    if (task.dependencies.includes("root") && getChildrenPath) {
      _getDataAsync(task);
    } else setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    // console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleDblClick = (task: Task) => {
    // console.log("double click");
  };

  if (tasks.length === 0 || !loaded) return <></>;
  return (
    <>
      {!externalViewSwitcher &&
        <ViewSwitcher
          onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
      }

      <Gantt
        tasks={tasks}
        viewMode={externalView ?? view}
        listCellWidth={externalIsChecked === true ? "155px" : externalIsChecked === false ? "" : isChecked ? "155px" : ""}
        // ganttHeight={500}
        columnWidth={columnWidth}
        TooltipContent={TooltipContent}
        TaskListTable={TaskListTable}
        TaskListHeader={TaskListHeader}
        onExpanderClick={handleExpanderClick}
        // onDateChange={handleTaskChange}
        // onDelete={handleTaskDelete}
        // onProgressChange={handleProgressChange}
        // onDoubleClick={handleDblClick}
        // onSelect={handleSelect}
        locale={"por"}
      />
    </>
  );
};

export default GanttView;
