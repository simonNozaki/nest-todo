/**
 * アプリケーションバリデーション例外クラス
 */
export class AppValidationException extends Error {
  constructor(message?: string) {
    super();
    super.message = message;
  }
}
