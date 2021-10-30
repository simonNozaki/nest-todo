import { BadRequestException } from '@nestjs/common';
import { AppValidationException } from 'src/application/exception/app.validation.execption';
import { v4 } from 'uuid';

/**
 * ステータスEnum
 */
export type TasksStatus = 'UNPROCESSED' | 'IN PROGRESS' | 'DONE' | 'GONE';

/**
 * ステータス日本語Enum、表示変換用
 */
export type TasksStatusJp = '未処理' | '対応中' | '完了' | '削除';

export class Status {
  constructor(private _tasksStatus: TasksStatus) {}

  get value(): TasksStatus {
    return this._tasksStatus;
  }

  /**
   * コンストラクタのステータスを日本語表記にする
   * @returns
   */
  convertToJp(): TasksStatusJp {
    switch (this._tasksStatus) {
      case 'UNPROCESSED':
        return '未処理';
      case 'IN PROGRESS':
        return '対応中';
      case 'DONE':
        return '完了';
      case 'GONE':
        return '削除';
      default:
        throw new Error('e.system.general.general.unexpected_error');
    }
  }
}

/**
 * UUIDインターフェース
 */
export interface Uuid {
  /**
   * ファクトリメソッド
   * @param v
   */
  create(v?: string): Uuid;

  get value(): string;
}

/**
 * UUID値オブジェクト
 */
export class BasicUuid implements Uuid {
  constructor(private readonly _value: string) {
    if (this._value === '') {
      throw new AppValidationException('e.validation.tasks.id.blank');
    }
  }
  get value(): string {
    return this._value;
  }
  create(v?: string): Uuid {
    if (v) {
      return new BasicUuid(v);
    }
    return new BasicUuid(v4().toString());
  }
}

/**
 * タイトル値オブジェクト
 */
export class Title {
  constructor(private readonly _title: string) {
    if (this._title.length > 200 || this._title.length === 0) {
      throw new BadRequestException('e.validation.tasks.title.invalid_length');
    }
  }

  public get title(): string {
    return this._title;
  }
}

/**
 * 説明値オブジェクト
 */
export class Description {
  constructor(private readonly _value: string) {
    if (this._value.length > 500) {
      throw new BadRequestException(
        'e.validation.tasks.description.invalid_length',
      );
    }
    // デフォルト値の設定
    if (this._value === '') {
      this._value = '説明はありません';
    }
  }

  get value(): string {
    return this._value;
  }
}
