/**
 * タスク生成リクエストDTOクラス
 */
export class CaptureTasks {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly deadline: Date,
  ) {}
}
