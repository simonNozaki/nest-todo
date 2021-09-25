import { TasksStatus } from '../type/value.object';

/**
 * タスクデータモデル
 */
export interface TasksRecord {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
  deadline: Date;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
