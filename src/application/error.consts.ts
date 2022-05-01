/**
 * エラーメッセージ定数 列挙型クラス
 */
export class ErrorConst {
  constructor(private _value: string) {}

  get value(): string {
    return this._value;
  }

  static readonly E_SYSTEM_UNEXPECTED_ERROR = new ErrorConst(
    'e.system.general.general.unexpected_error',
  );

  static readonly E_VALIDATION_ID_BLANK = new ErrorConst(
    'e.validation.tasks.id.blank',
  );

  static readonly E_VALIDATION_TITLE_INVALID_LENGTH = new ErrorConst(
    'e.validation.tasks.title.invalid_length',
  );

  static readonly E_VALIDATION_DESCRIPTION_INVALID_LENGTH = new ErrorConst(
    'e.validation.tasks.description.invalid_length',
  );

  static readonly E_VALIDATION_DEADLINE_IS_PAST = new ErrorConst(
    'e.validation.tasks.deadline.rule_violation',
  );

  static readonly E_VALIDATION_STATUS_NOT_IN_PROGRESS = new ErrorConst(
    'e.validation.tasks.status.not_in_progress',
  );

  static readonly E_VALIDATION_STATUS_CANNOT_UPDATE = new ErrorConst(
    'e.validation.tasks.status.cannot_back',
  );
}
