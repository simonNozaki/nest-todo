import { Injectable } from '@nestjs/common';
import { getBasicTasks, Tasks } from '../tasks';
import { TasksRepository } from './tasks.repository';

/**
 * インメモリタスクリポジトリ実装クラス
 */
@Injectable()
export class InMemoryTasksReposiory implements TasksRepository {
  findAll(): Tasks[] {
    return getBasicTasks();
  }

  capture(tasks: Tasks): Tasks {
    const basicTasks = getBasicTasks();
    basicTasks.push(tasks);
    return tasks;
  }
}
