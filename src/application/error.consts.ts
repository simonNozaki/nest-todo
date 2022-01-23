class ErrorMessage {
  constructor(private _value: string) {}

  get value(): string {
    return this._value;
  }
}

/**
 * エラーメッセージ定数 列挙型クラス
 */
export class ErrorConst {
  constructor(private _value: string) {}

  static readonly E_SYSTEM_UNEXPECTED_ERROR = new ErrorMessage(
    'e.system.general.general.unexpected_error',
  );

  static readonly E_VALIDATION_ID_BLANK = new ErrorMessage(
    'e.validation.tasks.id.blank',
  );

  static readonly E_VALIDATION_TITLE_INVALID_LENGTH = new ErrorMessage(
    'e.validation.tasks.title.invalid_length',
  );

  static readonly E_VALIDATION_DESCRIPTION_INVALID_LENGTH = new ErrorMessage(
    'e.validation.tasks.description.invalid_length',
  );
}
