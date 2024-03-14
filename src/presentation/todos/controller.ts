import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';

export class TodosController {
  //* Dependenci inyection
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({ where: { id } });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDTO!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDTO] = UpdateTodoDTO.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDTO!.values,
    });

    res.json(updateTodo);

    //   //! actualizando el TODO por referencia
    //   // // todo.text = text;

    //   // // todos.forEach((todo, index) => {
    //   // //   if (todo.id === id) {
    //   // //     todos[index] = todo;
    //   // //   }
    //   // // });
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const deleted = await prisma.todo.delete({ where: { id } });

    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `TODO with id ${id} not found` });
  };
}
