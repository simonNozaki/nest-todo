import { Module } from '@nestjs/common';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { InMemoryTasksReposiory } from './infrastructure/inmemory.tasks.repository';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksRepository',
      useClass: InMemoryTasksReposiory,
    },
    {
      provide: 'TasksMapper',
      useClass: InMemoryTasksMapper,
    },
  ],
})
export class TasksModule {}
