import { v4 } from 'uuid';

export type TasksStatus = 'UNPROCESSED' | 'IN PROGRESS' | 'DONE' | 'GONE';

/**
 * タスクオブジェクトクラス
 * あとでドメインオブジェクトに
 */
export class Tasks {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
  deadline: Date;
  // TODO こっから下はインフラ用項目なので後で移し替え
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;

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
    const now = new Date();
    return {
      id: v4().toString(),
      title: title,
      description: description,
      status: status,
      deadline: deadline,
      createdAt: now.toString(),
      createdBy: '',
      updatedAt: now.toString(),
      updatedBy: '',
    };
  }
}

/**
 * インメモリのタスク一覧を返す
 * @returns Tasks[]
 */
export const getBasicTasks = (): Tasks[] => {
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
