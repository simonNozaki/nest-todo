import { Tasks } from '../model/tasks';

/**
 * タスクリポジトリ
 */
export interface TasksRepository {
  /**
   * すべてのタスクを取得する
   */
  findAll(): Tasks[];

  /**
   * タスクを一つ登録する
   */
  capture(tasks: Tasks): Tasks;
}
