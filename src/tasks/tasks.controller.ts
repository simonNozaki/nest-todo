import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { AppValidationException } from '../application/exception/app.validation.execption';
import { ErrorConst } from '../application/error.consts';
import { Resultt } from 'resultt';

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
    return Resultt.runCatching(async () => {
      const tasks = await this.findAllTasksUseCase.execute();
      return {
        tasks: this.toFindAllTasksElement(tasks),
        errors: null,
      };
    })
      .onSuccess(async (v) => {
        console.log('検索結果: ', await v);
      })
      .onFailure((e) => {
        console.error('検索処理中のエラー: ', e);
      })
      .getOrElse((e: Error) => {
        const m =
          e instanceof AppValidationException
            ? e.error
            : ErrorConst.E_SYSTEM_UNEXPECTED_ERROR;
        return this.getErrorResponse([m]);
      });
  }

  /**
   * 1件登録
   * @param {CaptureTasks} req リクエスト
   * @returns FindAllTasksElement
   */
  @Post()
  @Render('tasks')
  async capture(@Body() req: CaptureTasks): Promise<FindAllTasks> {
    return Resultt.runCatching(async () => {
      const tasks = await this.saveTasksUseCase.execute(req);
      return {
        tasks: this.toFindAllTasksElement(tasks),
        errors: [],
      };
    })
      .onSuccess(async (v) => {
        console.log('登録成功: ', await v);
      })
      .getOrElse((e: Error) => {
        const m =
          e instanceof AppValidationException
            ? e.error
            : ErrorConst.E_SYSTEM_UNEXPECTED_ERROR;
        return this.getErrorResponse([m]);
      });
  }

  /**
   * ユースケースの結果をUI描画オブジェクトに変換する
   * @param {Tasks[]} tasks
   */
  private toFindAllTasksElement(tasks: Tasks[]): FindAllTasksElement[] {
    return tasks.map((t) => {
      return {
        id: t.id.value,
        title: t.title.title,
        description: t.description.value,
        status: t.status.convertToJp(),
        deadline: t.deadline.value,
      };
    });
  }

  private getErrorResponse(messages: ErrorConst[]): FindAllTasks {
    const messageValues = messages.map((v) => v.value);
    return {
      tasks: [],
      errors: messageValues,
    };
  }
}
