import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { TasksRepository } from './repository/tasks.repository';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';
import { TasksStatus, TasksStatusJp } from './type/value.object';

/**
 * タスクドメインコントローラクラス
 */
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  private allTasks: FindAllTasks = { tasks: [] };

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
        status: this.convertStatusToJp(t.status),
        deadline: t.deadline,
      };
    });
    // todo ローカルストレージに役割を移動する
    if (this.allTasks.tasks.length === 0) {
      this.allTasks.tasks = responseElements;
    }

    return this.allTasks;
  }

  /**
   * 1件登録
   * @param {CaptureTasks} req リクエスト
   * @returns FindAllTasksElement
   */
  @Post()
  @Render('tasks')
  async capture(@Body() req: CaptureTasks): Promise<FindAllTasks> {
    const tasks = Tasks.of(
      req.title,
      req.description,
      'UNPROCESSED',
      req.deadline,
    );
    this.allTasks.tasks.push({
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description.value,
      status: this.convertStatusToJp(tasks.status),
      deadline: tasks.deadline,
    });

    // 登録は任せたらいいのでawaitしない
    this.tasksRepository.capture(tasks);

    return this.allTasks;
  }

  private convertStatusToJp(status: TasksStatus): TasksStatusJp {
    switch (status) {
      case 'UNPROCESSED':
        return '未処理';
      case 'IN PROGRESS':
        return '対応中';
      case 'DONE':
        return '完了';
      case 'GONE':
        return '削除';
      default:
        throw new Error('e.system.general.general.unexpected_error');
    }
  }
}
