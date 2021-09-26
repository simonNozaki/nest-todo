import { TasksMapper } from './tasks.mapper';
import { TasksRecord } from './tasks.record';
import { v4 } from 'uuid';
import { Uuid } from '../type/value.object';
import { Injectable } from '@nestjs/common';

/**
 * インメモリオブジェクトタスクマッパー実装クラス
 */
@Injectable()
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
      createdAt: this.now.toISOString(),
      createdBy: '',
      updatedAt: this.now.toISOString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: '共有資料作成',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toISOString(),
      createdBy: '',
      updatedAt: this.now.toISOString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'mtgの日程・アジェンダ調整',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toISOString(),
      createdBy: '',
      updatedAt: this.now.toISOString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'レビュー',
      description: '',
      status: 'UNPROCESSED',
      deadline: this.deadline,
      createdAt: this.now.toISOString(),
      createdBy: '',
      updatedAt: this.now.toISOString(),
      updatedBy: '',
    },
  ];

  async findAll(): Promise<TasksRecord[]> {
    return new Promise((resolve) => {
      resolve(this.taskRecords);
    });
  }

  findById(uuid: Uuid): Promise<TasksRecord | null> {
    return new Promise((resolve) => {
      const recordOrNull = this.taskRecords.find((r) => r.id === uuid.value);
      if (recordOrNull) {
        resolve(recordOrNull);
      }
      resolve(null);
    });
  }

  capture(taskRecord: TasksRecord): Promise<void> {
    return new Promise((resolve) => {
      this.taskRecords.push(taskRecord);
      resolve();
    });
  }
}
