export type GanttTask = {
  id: string; // id do projeto ou pessoa (no caso de visão dashboard)
  type: "task" | "milestone" | "project"; // "project" para projeto/pessoa e "task" para demais;
  name: string; // nome do projeto ou pessoa, valor que será exibido no front
  start: Date; // data inicial
  end: Date; // data final
  progress: number; // entre 0 e 100, corresponde à % do que já foi concluído na tarefa
  status?: number; // entre 0 e 100, corresponde à % do que já foi concluído na tarefa
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
  };
  isDisabled?: boolean; // default false para TUDO, propriedade talvez possa ser usada no futuro
  project?: string; // id do projeto a que a tarefa está vinculada
  dependencies: string[]; // array c/ os ids das tarefas "predecessoras" da tarefa atual, talvez não faça sentido manter
};

export type GanttDataType = {
  startDate: Date;
  endDate: Date;
  users: string[]; // string com os ids dos usuários
  data: GanttTask[];
}