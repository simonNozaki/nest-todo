import { BadRequestException } from '@nestjs/common';
import { v4 } from 'uuid';

/**
 * ステータスEnum
 */
export type TasksStatus = 'UNPROCESSED' | 'IN PROGRESS' | 'DONE' | 'GONE';

/**
 * UUID値オブジェクト
 */
export class Uuid {
  private readonly _value: string = v4().toString();

  public get value(): string {
    return this._value;
  }
}

/**
 * タイトル値オブジェクト
 */
export class Title {
  constructor(private readonly _title: string) {
    if (_title.length > 200) {
      throw new BadRequestException('e.validation.tasks.title.invalid_length');
    }
  }

  public get title(): string {
    return this._title;
  }
}
