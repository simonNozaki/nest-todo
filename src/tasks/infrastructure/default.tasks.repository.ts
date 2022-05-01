import { Inject, Injectable } from '@nestjs/common';
import { TasksRecord } from './tasks.record';
import { Tasks } from '../model/tasks';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksMapper } from './tasks.mapper';
import {
  Deadline,
  Description,
  Status,
  Title,
  Uuid,
} from '../type/value.object';

/**
 * タスクリポジトリ実装クラス
 */
@Injectable()
export class DefaultTasksReposiory implements TasksRepository {
  constructor(
    @Inject('TasksMapper')
    private readonly tasksMapper: TasksMapper,
    @Inject('Uuid')
    private readonly uuid: Uuid,
  ) {}

  private readonly tasks: Tasks[] = [];

  async findAll(): Promise<Tasks[]> {
    const tasksRecords = await this.tasksMapper.findAll();
    // 永続化されたレコードからドメインオブジェクトに変換
    const tasks: Tasks[] = tasksRecords.map((t) =>
      Tasks.add(
        this.uuid.create(t.id),
        new Title(t.title),
        new Description(t.description),
        new Status(t.status),
        new Deadline(t.deadline),
      ),
    );

    this.getTasksDedepulicated(tasks).forEach((t) => this.tasks.push(t));

    return tasks;
  }

  async findById(uuid: Uuid): Promise<Tasks | null> {
    const target = this.tasks.filter((task) => task.id.value === uuid.value);
    if (target.length > 0) {
      return target[0];
    }
    return null;
  }

  async capture(tasks: Tasks): Promise<Tasks> {
    const now = new Date().toString();
    const tasksRecord: TasksRecord = {
      id: tasks.id.value,
      title: tasks.title.title,
      description: tasks.description.value,
      status: tasks.status.value,
      deadline: tasks.deadline.value,
      createdAt: now,
      createdBy: '',
      updatedAt: now,
      updatedBy: '',
    };

    this.tasksMapper.capture(tasksRecord);

    this.tasks.push(tasks);

    return tasks;
  }

  /**
   * 重複ないタスクの配列を取得する
   * @param {Tasks[]} tasks
   */
  private getTasksDedepulicated(tasks: Tasks[]): Tasks[] {
    const t: Tasks[] = [];
    for (const task of tasks) {
      const exist = this.tasks.some((it) => !it.id.equals(task.id));
      if (exist) {
        t.push(task);
      }
    }
    return t;
  }
}
