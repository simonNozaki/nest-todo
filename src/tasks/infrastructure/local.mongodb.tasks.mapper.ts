import { Uuid } from '../type/value.object';
import { TasksMapper } from './tasks.mapper';
import { TasksRecord } from './tasks.record';

/**
 * ローカルMongoDB用マッパー実装クラス
 */
export class LocalMongoDbTasksMapper implements TasksMapper {
  findAll(): TasksRecord[] {
    throw new Error('Method not implemented.');
  }
  findById(uuid: Uuid): TasksRecord {
    throw new Error('Method not implemented.');
  }
  capture(taskRecord: TasksRecord): void {
    throw new Error('Method not implemented.');
  }
}
