import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { Resultt } from 'resultt';
import { AppValidationException } from '../application/exception/app.validation.execption';
import { ErrorConst } from '../application/error.consts';

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
    const errors: string[] = [];
    let tasks: Tasks[] = [];
    try {
      tasks = await this.findAllTasksUseCase.execute();
    } catch (e) {
      if (e instanceof AppValidationException) {
        errors.push(e.message);
      } else {
        errors.push(ErrorConst.E_SYSTEM_UNEXPECTED_ERROR.value);
      }
    }

    return {
      tasks: this.toFindAllTasksElement(tasks),
      errors: errors,
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
    const errors: string[] = [];
    let tasks: Tasks[] = [];
    try {
      tasks = await this.saveTasksUseCase.execute(req);
    } catch (e) {
      if (e instanceof AppValidationException) {
        errors.push(e.message);
      } else {
        errors.push(ErrorConst.E_SYSTEM_UNEXPECTED_ERROR.value);
      }
    }

    return {
      tasks: this.toFindAllTasksElement(tasks),
      errors: errors,
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
