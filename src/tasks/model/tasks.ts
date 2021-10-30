import { Inject } from '@nestjs/common';
import { DomainRuleException } from 'src/application/exception/domain.rule.exception';
import { Description, Status, Title, Uuid } from '../type/value.object';

/**
 * タスクオブジェクトクラス
 */
export class Tasks {
  // 汎用コンストラクタには新規追加のルールは書かない
  constructor(
    @Inject('Uuid') readonly id: Uuid,
    readonly title: Title,
    readonly description: Description,
    readonly status: Status,
    readonly deadline: Date,
  ) {}

  /**
   * 新規のタスクオブジェクトを生成する
   * @param id
   * @param title
   * @param description
   * @param status
   * @param deadline
   */
  static add(
    id: Uuid,
    title: Title,
    description: Description,
    status: Status,
    deadline?: Date,
  ): Tasks {
    // 新規タスクは過去日付ではいけない
    if (deadline && deadline < new Date()) {
      // todo: あとでドメイン層の実行時例外にする
      throw new DomainRuleException(
        'e.validation.tasks.deadline.rule_violation',
      );
    }
    // 新規タスクは完了、未処理ではいけない
    if (status.value === 'DONE' || status.value === 'GONE') {
      throw new DomainRuleException('e.validation.tasks.status.rule_violation');
    }
    return new Tasks(id, title, description, status, deadline);
  }

  /**
   * ステータスを更新する
   * @param status
   * @returns
   */
  updateStatus(status: Status): Tasks {
    // ステータスを更新するときは "未処理" に戻してはいけない
    if (status.value === 'UNPROCESSED') {
      throw new DomainRuleException('e.validation.tasks.status.rule_violation');
    }
    return new Tasks(
      this.id,
      this.title,
      this.description,
      status,
      this.deadline,
    );
  }
}
