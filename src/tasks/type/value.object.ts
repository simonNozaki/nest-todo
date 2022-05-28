import { ErrorConst } from '../../application/error.consts';
import { AppValidationException } from '../../application/exception/app.validation.execption';
import { v4 } from 'uuid';

/**
 * 公称型指定
 */
type PreferNominal = never;

/**
 * ステータスEnum
 */
export type TasksStatus = 'UNPROCESSED' | 'IN PROGRESS' | 'DONE' | 'GONE';

/**
 * ステータス日本語Enum、表示変換用
 */
export type TasksStatusJp = '未処理' | '対応中' | '完了' | '削除';

/**
 * 値オブジェクト基底オブジェクト
 */
abstract class ValueObject<T> {
  abstract equals(t: T): boolean;
}

/**
 * ステータス値オブジェクト
 */
export class Status {
  typeStatus: PreferNominal;
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
        throw new Error(ErrorConst.E_SYSTEM_UNEXPECTED_ERROR.value);
    }
  }
}

/**
 * UUIDインターフェース
 */
export interface Uuid extends ValueObject<Uuid> {
  /**
   * ファクトリメソッド
   * @param v
   */
  create(v?: string): Uuid;

  get value(): string;

  equals(uuid: Uuid): boolean;
}

/**
 * UUID値オブジェクト
 */
export class BasicUuid implements Uuid {
  typeBasicUuid: PreferNominal;
  constructor(private readonly _value: string) {
    if (this._value === '') {
      throw new AppValidationException(ErrorConst.E_VALIDATION_ID_BLANK);
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
  equals(uuid: Uuid): boolean {
    return this._value === uuid.value;
  }
}

export class MockUuid implements Uuid {
  constructor(private readonly _value: string) {}
  create(v?: string): MockUuid {
    if (v) {
      return new MockUuid(v);
    }
    return new MockUuid('0000000000');
  }
  get value(): string {
    return this._value;
  }
  equals(uuid: Uuid): boolean {
    return this._value === uuid.value;
  }
}

/**
 * タイトル値オブジェクト
 */
export class Title extends ValueObject<Title> {
  typeTitle: PreferNominal;
  equals(t: Title): boolean {
    return this._title === t.title;
  }
  constructor(private readonly _title: string) {
    super();
    if (this._title.length > 200 || this._title.length === 0) {
      throw new AppValidationException(
        ErrorConst.E_VALIDATION_TITLE_INVALID_LENGTH,
      );
    }
  }

  public get title(): string {
    return this._title;
  }
}

/**
 * 説明値オブジェクト
 */
export class Description extends ValueObject<Description> {
  typeDescription: PreferNominal;
  equals(t: Description): boolean {
    return this._value === t.value;
  }
  constructor(private readonly _value: string) {
    super();
    if (this._value.length > 500) {
      throw new AppValidationException(
        ErrorConst.E_VALIDATION_DESCRIPTION_INVALID_LENGTH,
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

/**
 * 期限 値オブジェクト
 */
export class Deadline extends ValueObject<Deadline> {
  typeDeadline: PreferNominal;
  equals(t: Deadline): boolean {
    return this._value === t.value;
  }
  constructor(private readonly _value: Date) {
    super();
  }
  get value(): Date {
    return this._value;
  }
}
