import { Uuid } from '../type/value.object';
import { TasksRecord } from './tasks.record';

/**
 * タスクレコードマッパー
 */
export interface TasksMapper {
  /**
   * すべてのレコードを返す
   */
  findAll(): TasksRecord[];

  /**
   * IDでレコードを検索する
   * @param {Uuid} uuid uuid
   */
  findById(uuid: Uuid): TasksRecord | null;

  /**
   * レコードの登録
   * @param {TasksRecord} taskRecord レコード
   */
  capture(taskRecord: TasksRecord): void;
}
