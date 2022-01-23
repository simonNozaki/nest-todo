import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';

/**
 * タスクドメインコントローラクラス
 */
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('FindAllTasksUseCase')
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    @Inject('SaveTasksUseCase')
    private readonly saveTasksUseCase: SaveTasksUseCase,
  ) {}

  /**
   * 全件検索
   * @returns タスク
   */
  @Get()
  @Render('tasks')
  async findAll(): Promise<FindAllTasks> {
    const tasks: Tasks[] = await this.findAllTasksUseCase.execute();

    return {
      tasks: this.toFindAllTasksElement(tasks),
    };
  }

  /**
   * 1件登録
   * @param {CaptureTasks} req リクエスト
   * @returns FindAllTasksElement
   */
  @Post()
  @Render('tasks')
  async capture(@Body() req: CaptureTasks): Promise<FindAllTasks> {
    const tasks = await this.saveTasksUseCase.execute(req);

    return {
      tasks: this.toFindAllTasksElement(tasks),
    };
  }

  /**
   * ドメインオブジェクトからUI描画オブジェクトに変換する
   * @param {Tasks[]} tasks
   */
  private toFindAllTasksElement(tasks: Tasks[]): FindAllTasksElement[] {
    return tasks.map((t) => {
      return {
        id: t.id.value,
        title: t.title.title,
        description: t.description.value,
        status: t.status.convertToJp(),
        deadline: t.deadline,
      };
    });
  }
}
