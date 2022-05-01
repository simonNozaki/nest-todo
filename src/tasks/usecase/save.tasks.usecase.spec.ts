import { Test, TestingModule } from '@nestjs/testing';
import { CaptureTasks } from '../dto/create-tasks.interface';
import { InMemoryTasksMapper } from '../infrastructure/inmemory.tasks.mapper';
import { DefaultTasksReposiory } from '../infrastructure/default.tasks.repository';
import { MockUuid } from '../type/value.object';
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

  it('can save a single task', async () => {
    jest.spyOn(MockUuid.prototype, 'create').mockImplementation(() => {
      return new MockUuid('1000000000');
    });
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const req: CaptureTasks = {
      title: 'テストタスク',
      description: '',
      deadline: deadline,
    };

    const result = await saveTasksUseCase.execute(req);

    // タスクが一つ増えている
    expect(result.length).toBe(5);
    // モックしたIDでタスクが増えている
    const mocked = result.filter((r) => r.id.value === '1000000000')[0];
    console.log(`登録されるはずのタスク =>`, mocked);
    expect(mocked.id).not.toBeNull();
  });
});
