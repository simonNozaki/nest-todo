import { Inject } from '@nestjs/common';
import { Description, Status, Title, Uuid } from '../type/value.object';

/**
 * タスクオブジェクトクラス
 */
export class Tasks {
  constructor(
    @Inject('Uuid') readonly id: Uuid,
    readonly title: Title,
    readonly description: Description,
    readonly status: Status,
    readonly deadline: Date,
  ) {}

  /**
   * 完了にする
   * @returns Tasks
   */
  makeStatusDone(): Tasks {
    return new Tasks(
      this.id,
      this.title,
      this.description,
      new Status('DONE'),
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
      new Status('GONE'),
      this.deadline,
    );
  }
}
