import { Inject, Injectable } from '@nestjs/common';
import { CaptureTasks } from '../dto/create-tasks.interface';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';
import { Description, Status, Title, Uuid } from '../type/value.object';

/**
 * タスク登録ユースケースクラス
 */
@Injectable()
export class SaveTasksUseCase {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
    @Inject('Uuid')
    private readonly uuid: Uuid,
  ) {}

  /**
   * ユースケースの実行
   * @param {Tasks} req
   * @returns 登録対象も含めたすべてのタスク
   */
  async execute(req: CaptureTasks): Promise<Tasks[]> {
    const tasks = Tasks.add(
      this.uuid.create(),
      new Title(req.title),
      new Description(req.description),
      new Status('UNPROCESSED'),
      req.deadline,
    );

    await this.tasksRepository.capture(tasks);

    return await this.tasksRepository.findAll();
  }
}
