import { BadRequestException } from '@nestjs/common';
import { v4 } from 'uuid';

/**
 * ステータスEnum
 */
export type TasksStatus = 'UNPROCESSED' | 'IN PROGRESS' | 'DONE' | 'GONE';

/**
 * ステータス日本語Enum、表示変換用
 */
export type TasksStatusJp = '未処理' | '対応中' | '完了' | '削除';

/**
 * UUID値オブジェクト
 */
export class Uuid {
  constructor(private readonly _value: string) {}

  static of(): Uuid {
    return new Uuid(v4().toString());
  }

  get value(): string {
    return this._value;
  }
}

/**
 * タイトル値オブジェクト
 */
export class Title {
  constructor(private readonly _title: string) {
    if (!this._title) {
      throw new BadRequestException('e.validation.tasks.title.blank');
    }

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
  }

  get value(): string {
    return this._value;
  }
}
