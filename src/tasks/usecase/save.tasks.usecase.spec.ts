import { Test, TestingModule } from '@nestjs/testing';
import { CaptureTasks } from '../dto/create-tasks.interface';
import { InMemoryTasksMapper } from '../infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from '../infrastructure/default.tasks.repository';
import { Deadline, MockUuid } from '../type/value.object';
import { SaveTasksUseCase } from './save.tasks.usecase';

describe('SaveTasksUseCase', () => {
  let saveTasksUseCase: SaveTasksUseCase;

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
          provide: 'SaveTasksUseCase',
          useClass: SaveTasksUseCase,
        },
      ],
    }).compile();
    saveTasksUseCase = moduleRefs.get<SaveTasksUseCase>('SaveTasksUseCase');
  });

  it('can save and get a single task', async () => {
    const deadline = new Deadline(new Date()).getNDaylater(7);
    const req: CaptureTasks = {
      title: 'テストタスク',
      description: '',
      deadline: deadline.value,
    };

    Object.defineProperty(InMemoryTasksMapper, 'taskRecords', {
      value: [],
    });
    console.log(InMemoryTasksMapper);

    const result = await saveTasksUseCase.execute(req);

    console.log(result);
  });

  it('can save a single task', async () => {
    jest.spyOn(MockUuid.prototype, 'create').mockImplementation(() => {
      return new MockUuid('1000000000');
    });
    const req: CaptureTasks = {
      title: 'テストタスク',
      description: '',
      deadline: new Date(),
    };

    const result = await saveTasksUseCase.execute(req);

    expect(result.length).toBe(5);
  });
});
