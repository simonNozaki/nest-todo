import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';

/**
 * タスク全件検索ユースケース
 */
@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  /**
   * ユースケースの実行
   */
  async execute(): Promise<Tasks[]> {
    return await this.tasksRepository.findAll();
  }
}
