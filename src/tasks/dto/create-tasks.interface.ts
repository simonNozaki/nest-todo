import { TasksStatus } from '../type/value.object';

/**
 * タスク生成リクエストDTOクラス
 */
export class CaptureTasks {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly status: TasksStatus,
    readonly deadline: Date,
  ) {}
}
