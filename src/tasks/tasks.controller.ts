import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { Tasks } from './model/tasks';
import { TasksRepository } from './repository/tasks.repository';
import { CaptureTasks } from './dto/create-tasks.interface';
import {
  FindAllTasks,
  FindAllTasksElement,
} from './dto/find-all-tasks.interface';
import { ServerLocalStorage } from 'src/application/inmemory.storage';
import { Description, Status, Title, Uuid } from './type/value.object';

/**
 * タスクドメインコントローラクラス
 */
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
    @Inject('ServerLocalStorage')
    private readonly serverLocalStorage: ServerLocalStorage<FindAllTasksElement>,
    @Inject('Uuid')
    private readonly uuid: Uuid,
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
        status: t.status.convertToJp(),
        deadline: t.deadline,
      };
    });
    if (!this.serverLocalStorage.hasItems()) {
      this.serverLocalStorage.setItems(responseElements);
    }

    return {
      tasks: this.serverLocalStorage.getItem(),
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
    const tasks = Tasks.add(
      this.uuid.create(),
      new Title(req.title),
      new Description(req.description),
      new Status('UNPROCESSED'),
      req.deadline,
    );

    // 登録は任せたらいいのでawaitしない
    this.tasksRepository.capture(tasks);

    return {
      tasks: this.serverLocalStorage.getItem(),
    };
  }
}
