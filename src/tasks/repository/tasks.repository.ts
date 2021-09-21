import { Tasks } from '../tasks';

/**
 * タスクリポジトリ
 */
export interface TasksRepository {
  findAll(): Tasks[];
}
