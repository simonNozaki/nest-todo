import { TasksStatusJp } from '../type/value.object';

export type FindAllTasks = {
  tasks: FindAllTasksElement[];
};

export type FindAllTasksElement = {
  id: string;
  title: string;
  description: string;
  status: TasksStatusJp;
  deadline: Date;
};
