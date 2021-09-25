import { Tasks } from '../model/tasks';
import { Uuid } from '../type/value.object';

/**
 * タスクリポジトリ
 */
export interface TasksRepository {
  /**
   * すべてのタスクを取得する
   */
  findAll(): Tasks[];

  /**
   * IDでタスクを検索する
   */
  findById(uuid: Uuid): Tasks | null;

  /**
   * タスクを一つ追加する
   */
  capture(tasks: Tasks): Tasks;
}
