import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/default.tasks.repository';
import { TasksController } from './tasks.controller';
import { BasicUuid } from './type/value.object';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';

describe('TasksController', () => {
  let controller: TasksController;
  let saveTasksUseCase: SaveTasksUseCase;
  let findAllTasksUseCase: FindAllTasksUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<TasksController>(TasksController);
    findAllTasksUseCase = module.get<FindAllTasksUseCase>(
      'FindAllTasksUseCase',
    );
    saveTasksUseCase = module.get<SaveTasksUseCase>('SaveTasksUseCase');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can get all tasks', async () => {
    const result = await findAllTasksUseCase.execute();

    expect(result.length).toBe(4);
  });
});
