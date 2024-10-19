import express from "express";
import todoRoutes from "./routes/todo";

export const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
