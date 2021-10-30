/**
 * ドメインルール例外クラス
 */
export class DomainRuleException extends Error {
  constructor(message?: string) {
    super();
    super.message = message;
  }
}
