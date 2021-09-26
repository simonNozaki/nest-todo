import { Inject, Injectable } from '@nestjs/common';
import { TasksRecord } from './tasks.record';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksMapper } from './tasks.mapper';
import { Description, Title, Uuid } from '../type/value.object';

/**
 * インメモリタスクリポジトリ実装クラス
 */
@Injectable()
export class DefaultTasksReposiory implements TasksRepository {
  constructor(
    @Inject('TasksMapper') private readonly tasksMapper: TasksMapper,
  ) {}

  async findAll(): Promise<Tasks[]> {
    const tasksRecords = await this.tasksMapper.findAll();
    return tasksRecords.map((t) =>
      Tasks.of(t.title, t.description, t.status, t.deadline),
    );
  }

  async findById(uuid: Uuid): Promise<Tasks | null> {
    const recordOrNull = await this.tasksMapper.findById(uuid);
    if (recordOrNull) {
      return new Tasks(
        new Uuid(recordOrNull.id),
        new Title(recordOrNull.title),
        new Description(recordOrNull.description),
        recordOrNull.status,
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
      status: tasks.status,
      deadline: tasks.deadline,
      createdAt: now,
      createdBy: '',
      updatedAt: now,
      updatedBy: '',
    };
    await this.tasksMapper.capture(tasksRecord);

    return tasks;
  }
}
