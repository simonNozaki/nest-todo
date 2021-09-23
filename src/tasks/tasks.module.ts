import { Module } from '@nestjs/common';
import { InMemoryTasksReposiory } from './repository/inmemory.tasks.repository';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksRepository',
      useClass: InMemoryTasksReposiory,
    },
  ],
})
export class TasksModule {}
