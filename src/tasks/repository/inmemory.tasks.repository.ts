import { Injectable } from '@nestjs/common';
import { Tasks } from '../tasks';
import { TasksRepository } from './tasks.repository';

/**
 * インメモリタスクリポジトリ実装クラス
 */
@Injectable()
export class InMemoryTasksReposiory implements TasksRepository {
  findAll(): Tasks[] {
    return [];
  }
}
