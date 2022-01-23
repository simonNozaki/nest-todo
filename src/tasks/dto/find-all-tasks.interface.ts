import { TasksStatusJp } from '../type/value.object';

export type FindAllTasks = {
  tasks: FindAllTasksElement[];
  errors: string[];
};

export type FindAllTasksElement = {
  id: string;
  title: string;
  description: string;
  status: TasksStatusJp;
  deadline: Date;
};
