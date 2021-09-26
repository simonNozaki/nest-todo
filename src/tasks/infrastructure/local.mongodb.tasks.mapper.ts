import { WithId } from 'mongodb';
import { Uuid } from '../type/value.object';
import { localMongoClient, selectCollection } from './mongodb-client';
import { TasksMapper } from './tasks.mapper';
import { TasksRecord } from './tasks.record';

/**
 * ローカルMongoDB用マッパー実装クラス
 */
export class LocalMongoDbTasksMapper implements TasksMapper {
  async findAll(): Promise<TasksRecord[]> {
    const collection = await selectCollection<WithId<TasksRecord>>(
      'local',
      'tasks',
    );

    const result = await collection.find({}).toArray();
    localMongoClient.close();

    return result.map((r) => {
      return {
        id: r.id,
        title: r.title,
        status: r.status,
        description: r.description,
        deadline: r.deadline,
        createdAt: r.createdAt,
        createdBy: r.createdBy,
        updatedAt: r.updatedAt,
        updatedBy: r.updatedBy,
      };
    });
  }

  async findById(uuid: Uuid): Promise<TasksRecord> {
    throw new Error('Method not implemented.');
  }

  async capture(taskRecord: TasksRecord): Promise<void> {
    const collection = await selectCollection<TasksRecord>('local', 'tasks');
    await collection.insertOne(taskRecord);
  }
}
