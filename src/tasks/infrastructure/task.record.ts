import { TasksStatus } from '../type/value.object';
import { v4 } from 'uuid';

/**
 * タスクデータモデル
 */
export interface TasksRecord {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
  deadline: Date;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

/**
 * インメモリのタスク一覧を返す
 * @returns Tasks[]
 */
export const getBasicTasks = (): TasksRecord[] => {
  const now = new Date();
  const deadline = addNDate(now, 7);

  return [
    {
      id: v4().toString(),
      title: '相談する',
      description: '',
      status: 'IN PROGRESS',
      deadline: deadline,
      createdAt: now.toString(),
      createdBy: '',
      updatedAt: now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: '共有資料作成',
      description: '',
      status: 'UNPROCESSED',
      deadline: deadline,
      createdAt: now.toString(),
      createdBy: '',
      updatedAt: now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'mtgの日程・アジェンダ調整',
      description: '',
      status: 'UNPROCESSED',
      deadline: deadline,
      createdAt: now.toString(),
      createdBy: '',
      updatedAt: now.toString(),
      updatedBy: '',
    },
    {
      id: v4().toString(),
      title: 'レビュー',
      description: '',
      status: 'UNPROCESSED',
      deadline: deadline,
      createdAt: now.toString(),
      createdBy: '',
      updatedAt: now.toString(),
      updatedBy: '',
    },
  ];
};

/**
 * 基準日から任意日数を加算する
 * @param {Date} base 基準日
 * @param {number} days 加算する日数
 * @returns base
 */
const addNDate = (base: Date, days: number): Date => {
  base.setDate(base.getDate() + days);
  return base;
};
