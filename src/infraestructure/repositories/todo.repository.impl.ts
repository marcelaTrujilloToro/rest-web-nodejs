import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasourse: TodoDatasource) {}

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasourse.create(createTodoDTO);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasourse.getAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasourse.findById(id);
  }

  updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasourse.updateById(updateTodoDTO);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasourse.deleteById(id);
  }
}
