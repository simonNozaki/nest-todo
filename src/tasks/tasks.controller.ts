import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { TasksRepository } from './repository/tasks.repository';
import { CaptureTasks } from './dto/create-tasks.interface';

/**
 * タスクドメインコントローラクラス
 */
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  @Get()
  findAll(): Tasks[] {
    return this.tasksRepository.findAll();
  }

  @Post()
  @HttpCode(201)
  capture(@Body() req: CaptureTasks) {
    const tasks = Tasks.of(
      req.title,
      req.description,
      req.status,
      req.deadline,
    );
    return this.tasksRepository.capture(tasks);
  }
}
