import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import todoRoutes from "../src/routes/todo";

const testApp = express();
testApp.use(express.json());
testApp.use("/todos", todoRoutes);

const TEST_PORT = 3001;

let server: any;

beforeAll(async () => {
  server = testApp.listen(TEST_PORT, () => {
    console.log(`Test server running on http://localhost:${TEST_PORT}`);
  });
});

afterAll(async () => {
  await server.close();
});

describe("Todo API", () => {
  let todoId: number;

  it("should create a new todo", async () => {
    const response = await request(server)
      .post("/todos")
      .send({ title: "Test Todo" })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Todo");
    todoId = response.body.id;
  });

  it("should get all todos", async () => {
    const response = await request(server).get("/todos").expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should update a todo", async () => {
    const response = await request(server)
      .put(`/todos/${todoId}`)
      .send({ title: "Updated Test Todo", completed: true })
      .expect(200);

    expect(response.body.title).toBe("Updated Test Todo");
    expect(response.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    await request(server).delete(`/todos/${todoId}`).expect(204);
    const response = await request(server).get("/todos");
    expect(response.body).not.toContainEqual(
      expect.objectContaining({ id: todoId })
    );
  });
});
