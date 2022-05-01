import { Inject } from '@nestjs/common';
import { ErrorConst } from '../../application/error.consts';
import { AppValidationException } from '../../application/exception/app.validation.execption';
import {
  Deadline,
  Description,
  Status,
  Title,
  Uuid,
} from '../type/value.object';

/**
 * タスクオブジェクトクラス
 */
export class Tasks {
  // 汎用コンストラクタには新規追加のルールは書かない
  private constructor(
    @Inject('Uuid') readonly id: Uuid,
    readonly title: Title,
    readonly description: Description,
    readonly status: Status,
    readonly deadline: Deadline,
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
    deadline?: Deadline,
  ): Tasks {
    // 新規タスクは過去日付ではいけない
    if (deadline && deadline.value < new Date()) {
      // todo: あとでドメイン層の実行時例外にする
      throw new AppValidationException(
        ErrorConst.E_VALIDATION_DEADLINE_IS_PAST,
      );
    }
    // 新規タスクは完了、未処理ではいけない
    if (status.value === 'DONE' || status.value === 'GONE') {
      throw new AppValidationException(
        ErrorConst.E_VALIDATION_STATUS_NOT_IN_PROGRESS,
      );
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
      throw new AppValidationException(
        ErrorConst.E_VALIDATION_STATUS_CANNOT_UPDATE,
      );
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
