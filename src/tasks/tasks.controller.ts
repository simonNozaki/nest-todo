import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Render,
} from '@nestjs/common';
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

  /**
   * 全件検索
   * @returns タスク
   */
  @Get()
  @Render('tasks')
  async findAll(): Promise<FindAllTasks> {
    const tasks: Tasks[] = await this.tasksRepository.findAll();
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

  /**
   * 1件登録
   * @param {CaptureTasks} req リクエスト
   * @returns FindAllTasksElement
   */
  @Post()
  @HttpCode(201)
  async capture(@Body() req: CaptureTasks): Promise<FindAllTasksElement> {
    const tasks = Tasks.of(
      req.title,
      req.description,
      req.status,
      req.deadline,
    );
    await this.tasksRepository.capture(tasks);

    return {
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description.value,
      status: tasks.status,
      deadline: tasks.deadline,
    };
  }
}
