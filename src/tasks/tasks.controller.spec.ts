import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryTasksMapper } from './infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from './infrastructure/default.tasks.repository';
import { TasksController } from './tasks.controller';
import { BasicUuid } from './type/value.object';
import { FindAllTasksUseCase } from './usecase/find.all.tasks.usecase';
import { SaveTasksUseCase } from './usecase/save.tasks.usecase';
import { ErrorConst } from '../application/error.consts';
import { AppValidationException } from '../application/exception/app.validation.execption';

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

  it('全件検索: 存在するすべてのタスクを取得できる', async () => {
    const result = await findAllTasksUseCase.execute();

    expect(result.length).toBe(4);
  });

  it('全件検索: 値の仕様を満たさない(IDが空文字)', async () => {
    jest
      .spyOn(FindAllTasksUseCase.prototype, 'execute')
      .mockImplementation(() => {
        throw new AppValidationException(ErrorConst.E_VALIDATION_ID_BLANK);
      });

    const response = await controller.findAll();

    expect(response.tasks.length).toBe(0);
    expect(response.errors.length).toBe(1);
    expect(response.errors[0]).toBe(ErrorConst.E_VALIDATION_ID_BLANK.value);
  });

  it('全件検索: 予期しないエラーを検出する', async () => {
    jest
      .spyOn(FindAllTasksUseCase.prototype, 'execute')
      .mockImplementation(() => {
        throw new Error('モックによる予期しないエラー');
      });

    const response = await controller.findAll();

    expect(response.tasks.length).toBe(0);
    expect(response.errors.length).toBe(1);
    expect(response.errors[0]).toBe(ErrorConst.E_SYSTEM_UNEXPECTED_ERROR.value);
  });
});
