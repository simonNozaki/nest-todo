import { Description, TasksStatus, Title, Uuid } from '../type/value.object';

/**
 * タスクオブジェクトクラス
 */
export class Tasks {
  constructor(
    readonly id: Uuid,
    readonly title: Title,
    readonly description: Description,
    readonly status: TasksStatus,
    readonly deadline: Date,
  ) {}

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
    return new Tasks(
      Uuid.of(),
      new Title(title),
      new Description(description),
      status,
      deadline,
    );
  }

  /**
   * 完了にする
   * @returns Tasks
   */
  makeStatusDone(): Tasks {
    return new Tasks(
      this.id,
      this.title,
      this.description,
      'DONE',
      this.deadline,
    );
  }

  /**
   * タスクを破棄する
   * @returns Tasks
   */
  makeTasksDiscarded(): Tasks {
    return new Tasks(
      this.id,
      this.title,
      this.description,
      'GONE',
      this.deadline,
    );
  }
}
