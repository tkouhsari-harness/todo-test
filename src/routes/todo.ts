import { Router, Request, Response } from "express";

const router = Router();
let todos: { id: number; title: string; completed: boolean }[] = [];

router.get("/", (req: Request, res: any) => {
  return res.json(todos);
});

router.post("/", (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    todo.title = title ?? todo.title;
    todo.completed = completed ?? todo.completed;
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.status(204).send();
});

export default router;
