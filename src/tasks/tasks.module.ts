import { Module, Type } from '@nestjs/common';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/default.tasks.repository';
import { LocalMongoDbTasksMapper } from './infrastructure/local.mongodb.tasks.mapper';
import { TasksMapper } from './infrastructure/tasks.mapper';
import { TasksController } from './tasks.controller';
import { BasicUuid } from './type/value.object';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';

const tasksMapper: Type<TasksMapper> =
  process.env.STAGE === 'production' || 'staging'
    ? LocalMongoDbTasksMapper
    : InMemoryTasksMapper;

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksRepository',
      useClass: DefaultTasksReposiory,
    },
    {
      provide: 'TasksMapper',
      useClass: tasksMapper,
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
