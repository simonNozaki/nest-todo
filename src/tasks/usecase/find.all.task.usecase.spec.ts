import { Test, TestingModule } from '@nestjs/testing';
import { DefaultTasksReposiory } from '../infrastructure/default.tasks.repository';
import { InMemoryTasksMapper } from '../infrastructure/inmemory.tasks.mapper';
import { MockUuid } from '../type/value.object';
import { FindAllTasksUseCase } from './find.all.tasks.usecase';
import { v4 } from 'uuid';

describe('SaveTaskUseCase', () => {
  let findAllTasksUseCase: FindAllTasksUseCase;

  beforeEach(async () => {
    const moduleRefs: TestingModule = await Test.createTestingModule({
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
          useClass: MockUuid,
        },
        {
          provide: 'FindAllTasksUseCase',
          useClass: FindAllTasksUseCase,
        },
      ],
    }).compile();
    findAllTasksUseCase = moduleRefs.get<FindAllTasksUseCase>(
      'FindAllTasksUseCase',
    );
  });

  it('タスクが一つも存在しない', async () => {
    jest
      .spyOn(InMemoryTasksMapper.prototype, 'findAll')
      .mockImplementation(() => {
        return new Promise((resole) => {
          resole([]);
        });
      });

    const tasks = await findAllTasksUseCase.execute();
    expect(tasks.length).toBe(0);
  });

  it('タスクが3つ存在する', async () => {
    const now = new Date();
    const deadline = now;
    deadline.setDate(now.getDate() + 7);
    jest
      .spyOn(InMemoryTasksMapper.prototype, 'findAll')
      .mockImplementation(() => {
        return new Promise((resole) => {
          resole([
            {
              id: v4().toString(),
              title: '相談する',
              description: '',
              status: 'IN PROGRESS',
              deadline: deadline,
              createdAt: now.toISOString(),
              createdBy: '',
              updatedAt: now.toISOString(),
              updatedBy: '',
            },
            {
              id: v4().toString(),
              title: '共有資料作成',
              description: '',
              status: 'UNPROCESSED',
              deadline: deadline,
              createdAt: now.toISOString(),
              createdBy: '',
              updatedAt: now.toISOString(),
              updatedBy: '',
            },
          ]);
        });
      });
    const tasks = await findAllTasksUseCase.execute();
    expect(tasks.length).toBe(2);
  });
});
