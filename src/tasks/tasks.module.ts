import { Module } from '@nestjs/common';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/inmemory.tasks.repository';
import { LocalMongoDbTasksMapper } from './infrastructure/local.mongodb.tasks.mapper';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksRepository',
      useClass: DefaultTasksReposiory,
    },
    {
      provide: 'TasksMapper',
      useClass: LocalMongoDbTasksMapper,
    },
  ],
})
export class TasksModule {}
