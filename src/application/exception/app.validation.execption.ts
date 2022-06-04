import { ErrorConst } from '../error.consts';

/**
 * アプリケーションバリデーション例外クラス
 */
export class AppValidationException extends Error {
  constructor(_error: ErrorConst) {
    super();
    super.message = _error.value;
  }
  get error(): ErrorConst {
    return this.error;
  }
}
