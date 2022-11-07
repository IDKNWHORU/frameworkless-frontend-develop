import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import * as mod from "https://deno.land/std@0.100.0/uuid/mod.ts";

const port = 8080;

type Todo = { completed: boolean; id: string; text: string };

const todos: Todo[] = [];

const getTodos = async (_req: Request) => {
  if (_req.body) {
    console.log(await _req.text());
  }
  return new Response(JSON.stringify(todos));
};

const postTodos = async (req: Request) => {
  const body = await req.json();
  const newTodo = {
    completed: false,
    ...body,
    id: mod.v4.generate(),
  };

  todos.push(newTodo as Todo);

  return new Response(JSON.stringify(newTodo), { status: 201 });
};

const patchTodos = async (req: Request) => {
  const patchId = new URL(req.url).pathname.replace("/api/todos/", "");

  const updateIndex = todos.findIndex((t) => t.id === patchId);
  const oldTodo = todos[updateIndex];

  const body = await req.json();

  const newTodo = {
    ...oldTodo,
    ...body,
  };

  todos[updateIndex] = newTodo;

  return new Response(JSON.stringify(newTodo));
};

const deleteTodos = async (req:Request) => {
    await Promise.resolve('');

    const deleteId = new URL(req.url).pathname.replace("/api/todos/", "");

    const deleteIndex = todos.findIndex(t=> t.id === deleteId);

    todos.splice(deleteIndex, 1);

    return new Response(null, { status: 204 });
}

const api: { [key: string]: (req: Request) => Promise<Response> } = {
  GET: getTodos,
  POST: postTodos,
  PATCH: patchTodos,
  DELETE: deleteTodos
};

const handler = async (request: Request): Promise<Response> => {
  if (request.url.includes("/api/todos")) {
    return api[`${request.method}`](request);
  }

  const { pathname } = (new URL(request.url).pathname === "/")
    ? { pathname: "/index.html" }
    : new URL(request.url);

  const file = await Deno.readTextFile(`.${pathname}`);
  const headers = pathname.includes("css")
    ? { "content-type": "text/css" }
    : pathname.includes("js")
    ? { "content-type": "text/javascript" }
    : {
      "content-type": "text/html",
    };

  return new Response(file, { status: 200, headers });
};

await serve((_req) => handler(_req), { port });
