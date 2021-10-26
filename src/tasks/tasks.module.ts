import { Module } from '@nestjs/common';
import { InMemoryStorage } from 'src/application/inmemory.storage';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/inmemory.tasks.repository';
import { LocalMongoDbTasksMapper } from './infrastructure/local.mongodb.tasks.mapper';
import { TasksController } from './tasks.controller';
import { BasicUuid } from './type/value.object';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksRepository',
      useClass: DefaultTasksReposiory,
    },
    {
      provide: 'TasksMapper',
      useClass: InMemoryTasksMapper,
    },
    {
      provide: 'ServerLocalStorage',
      useClass: InMemoryStorage,
    },
    {
      provide: 'Uuid',
      useClass: BasicUuid,
    },
  ],
})
export class TasksModule {}
