import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { TasksRepository } from './repository/tasks.repository';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';

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
  findAll(): FindAllTasks {
    const tasks: Tasks[] = this.tasksRepository.findAll();
    const responseElements: FindAllTasksElement[] = tasks.map((t) => {
      return {
        id: t.id.value,
        title: t.title.title,
        description: t.description.value,
        status: t.status,
        deadline: t.deadline,
      };
    });
    return {
      tasks: responseElements,
    };
  }

  @Post()
  @HttpCode(201)
  capture(@Body() req: CaptureTasks): FindAllTasksElement {
    const tasks = Tasks.of(
      req.title,
      req.description,
      req.status,
      req.deadline,
    );
    this.tasksRepository.capture(tasks);

    return {
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description.value,
      status: tasks.status,
      deadline: tasks.deadline,
    };
  }
}
