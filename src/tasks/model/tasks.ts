import { TasksStatus, Title, Uuid } from '../type/value.object';

/**
 * タスクオブジェクトクラス
 * あとでドメインオブジェクトに
 */
export class Tasks {
  id: Uuid;
  title: Title;
  description: string;
  status: TasksStatus;
  deadline: Date;

  /**
   * ファクトリメソッド
   * @param {string} title タイトル
   * @param {string} description 説明
   * @param {TasksStatus} status ステータス
   * @param {Date} deadline 期限
   * @returns Tasks
   */
  static of(
    title: string,
    description: string,
    status: TasksStatus,
    deadline: Date,
  ): Tasks {
    return {
      id: new Uuid(),
      title: new Title(title),
      description: description,
      status: status,
      deadline: deadline,
    };
  }
}
