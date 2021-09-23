import { Injectable } from '@nestjs/common';
import { getBasicTasks, TasksRecord } from './task.record';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';

/**
 * インメモリタスクリポジトリ実装クラス
 */
@Injectable()
export class InMemoryTasksReposiory implements TasksRepository {
  findAll(): Tasks[] {
    const tasksRecords = getBasicTasks();
    return tasksRecords.map((t) =>
      Tasks.of(t.title, t.description, t.status, t.deadline),
    );
  }

  capture(tasks: Tasks): Tasks {
    const now = new Date().toString();
    const tasksRecord: TasksRecord = {
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description,
      status: tasks.status,
      deadline: tasks.deadline,
      createdAt: now,
      createdBy: '',
      updatedAt: now,
      updatedBy: '',
    };
    getBasicTasks().push(tasksRecord);

    return tasks;
  }
}
