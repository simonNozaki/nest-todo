import { Injectable } from '@nestjs/common';
import { WithId } from 'mongodb';
import { Uuid } from '../type/value.object';
import { localMongoClient, selectCollection } from './mongodb-client';
import { TasksMapper } from './tasks.mapper';
import { TasksRecord } from './tasks.record';

/**
 * ローカルMongoDB用マッパー実装クラス
 */
@Injectable()
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
    const collection = await selectCollection<WithId<TasksRecord>>(
      'local',
      'tasks',
    );

    const result = await collection.findOne({ id: uuid.value });

    return {
      id: result.id,
      title: result.title,
      status: result.status,
      description: result.description,
      deadline: result.deadline,
      createdAt: result.createdAt,
      createdBy: result.createdBy,
      updatedAt: result.updatedAt,
      updatedBy: result.updatedBy,
    };
  }

  async capture(taskRecord: TasksRecord): Promise<void> {
    const collection = await selectCollection<WithId<TasksRecord>>(
      'local',
      'tasks',
    );
    await collection.insertOne(taskRecord);

    localMongoClient.close();
  }
}
