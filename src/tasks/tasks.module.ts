import { Module } from '@nestjs/common';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/inmemory.tasks.repository';
import { TasksController } from './tasks.controller';
import { BasicUuid } from './type/value.object';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';

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
      provide: 'Uuid',
      useClass: BasicUuid,
    },
    {
      provide: 'SaveTasksUseCase',
      useClass: SaveTasksUseCase,
    },
    {
      provide: 'FindAllTasksUseCase',
      useClass: FindAllTasksUseCase,
    },
  ],
})
export class TasksModule {}
