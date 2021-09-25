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
export class InMemoryTasksReposiory implements TasksRepository {
  constructor(
    @Inject('TasksMapper') private readonly tasksMapper: TasksMapper,
  ) {}

  findAll(): Tasks[] {
    const tasksRecords = this.tasksMapper.findAll();
    return tasksRecords.map((t) =>
      Tasks.of(t.title, t.description, t.status, t.deadline),
    );
  }

  findById(uuid: Uuid): Tasks | null {
    const recordOrNull = this.tasksMapper.findById(uuid);
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

  capture(tasks: Tasks): Tasks {
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
    this.tasksMapper.capture(tasksRecord);

    return tasks;
  }
}
