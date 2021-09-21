import { Controller, Get, Inject } from '@nestjs/common';
import { Tasks } from './tasks';
import { TasksRepository } from './repository/tasks.repository';

/**
 * タスクドメインコントローラクラス
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksRepository: TasksRepository) {}

  @Get()
  findAll(): Tasks[] {
    return this.tasksRepository.findAll();
  }
}
