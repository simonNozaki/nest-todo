import { ErrorConst } from '../error.consts';

/**
 * アプリケーションバリデーション例外クラス
 */
export class AppValidationException extends Error {
  constructor(error: ErrorConst) {
    super();
    super.message = error.value;
  }
}
