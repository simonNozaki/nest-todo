import { Resultt } from 'resultt';
import { ErrorConst } from '../../application/error.consts';
import {
  Deadline,
  Description,
  MockUuid,
  Status,
  Title,
} from '../type/value.object';
import { Tasks } from './tasks';

describe('Tasks', () => {
  it('モデルを生成できる', () => {
    const tasks = getTasks();

    expect(tasks).not.toBeNull();
    expect(tasks).toBeInstanceOf(Tasks);
  });

  it('ステータスを遷移できる', () => {
    const tasks = getTasks().updateStatus(new Status('DONE'));

    expect(tasks.status.value).toBe('DONE');
  });

  it('タスクは1方向にしか遷移しない', () => {
    const result: Error = Resultt.runCatching(() => {
      return getTasks().updateStatus(new Status('UNPROCESSED'));
    }).fold(
      () => new Error(),
      (it) => it,
    );

    // 指定の例外がスローされていること
    console.log(`処理した例外 =>`, result);
    expect(result.message).toBe(
      ErrorConst.E_VALIDATION_STATUS_CANNOT_UPDATE.value,
    );
  });
});

const getTasks = (): Tasks => {
  jest.spyOn(MockUuid.prototype, 'create').mockImplementation(() => {
    return new MockUuid('1000000000');
  });

  const uuid = new MockUuid('1000000000');

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  return Tasks.add(
    uuid,
    new Title('テストタスク'),
    new Description('説明はありません'),
    new Status('UNPROCESSED'),
    new Deadline(deadline),
  );
};
