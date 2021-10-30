import { Inject, Injectable } from '@nestjs/common';
import { TasksRecord } from './tasks.record';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksMapper } from './tasks.mapper';
import { Description, Status, Title, Uuid } from '../type/value.object';
import { ServerLocalStorage } from 'src/application/inmemory.storage';

/**
 * インメモリタスクリポジトリ実装クラス
 */
@Injectable()
export class DefaultTasksReposiory implements TasksRepository {
  constructor(
    @Inject('TasksMapper')
    private readonly tasksMapper: TasksMapper,
    @Inject('Uuid')
    private readonly uuid: Uuid,
    @Inject('ServerLocalStorage')
    private readonly serverLocalStorage: ServerLocalStorage<Tasks>,
  ) {}

  async findAll(): Promise<Tasks[]> {
    const tasksRecords = await this.tasksMapper.findAll();
    // 永続化されたレコードからドメインオブジェクトに変換
    return tasksRecords.map(
      (t) =>
        new Tasks(
          this.uuid.create(t.id),
          new Title(t.title),
          new Description(t.description),
          new Status(t.status),
          t.deadline,
        ),
    );
  }

  async findById(uuid: Uuid): Promise<Tasks | null> {
    const recordOrNull = await this.tasksMapper.findById(uuid);
    if (recordOrNull) {
      return new Tasks(
        this.uuid.create(recordOrNull.id),
        new Title(recordOrNull.title),
        new Description(recordOrNull.description),
        new Status(recordOrNull.status),
        recordOrNull.deadline,
      );
    }
    return null;
  }

  async capture(tasks: Tasks): Promise<Tasks> {
    const now = new Date().toString();
    const tasksRecord: TasksRecord = {
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description.value,
      status: tasks.status.value,
      deadline: tasks.deadline,
      createdAt: now,
      createdBy: '',
      updatedAt: now,
      updatedBy: '',
    };
    // 永続化は非同期で放置
    this.tasksMapper.capture(tasksRecord);
    // キャッシュ化
    this.serverLocalStorage.setItem(
      new Tasks(
        tasks.id,
        tasks.title,
        tasks.description,
        tasks.status,
        tasks.deadline,
      ),
    );

    return tasks;
  }
}
