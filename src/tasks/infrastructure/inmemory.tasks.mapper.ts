import { TasksMapper } from './tasks.mapper';
import { TasksRecord } from './tasks.record';
import { v4 } from 'uuid';
import { Uuid } from '../type/value.object';

/**
 * インメモリオブジェクトタスクマッパー実装クラス
 */
export class InMemoryTasksMapper implements TasksMapper {
  /**
   * 基準日から任意日数を加算する
   * @param {Date} base 基準日
   * @param {number} days 加算する日数
   * @returns base
   */
  private addNDate = (base: Date, days: number): Date => {
    base.setDate(base.getDate() + days);
    return base;
  };

  private now = new Date();
  private deadline = this.addNDate(this.now, 7);

  private taskRecords: TasksRecord[] = [
    {
      id: v4().toString(),
      title: '相談する',
      description: '',
      status: 'IN PROGRESS',
      deadline: this.deadline,
      createdAt: this.now.toString(),
      createdBy: '',
      updatedAt: this.now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: '共有資料作成',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toString(),
      createdBy: '',
      updatedAt: this.now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'mtgの日程・アジェンダ調整',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toString(),
      createdBy: '',
      updatedAt: this.now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'レビュー',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toString(),
      createdBy: '',
      updatedAt: this.now.toString(),
      updatedBy: '',
    },
  ];

  findAll(): TasksRecord[] {
    return this.taskRecords;
  }

  findById(uuid: Uuid): TasksRecord | null {
    const recordOrNull = this.taskRecords.find((r) => r.id === uuid.value);
    if (recordOrNull) {
      return recordOrNull;
    }
    return null;
  }

  capture(taskRecord: TasksRecord): void {
    this.taskRecords.push(taskRecord);
  }
}
