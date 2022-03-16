import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let booksList = [];

const getBooksList = (req, res) => {
  res.send(booksList);
};
const createBook = (req, res) => {
  const user = req.body;
  booksList.push({ ...user, id: uuid() });
  res.send("Book Added Successfully");
};

const deleteBook = (req, res) => {
  booksList = booksList.filter((user) => user.id !== req.params.id);
  res.send("Book deleted successfully");
};

app.get("/", (req, res) => res.send("Hello from Express"));
app.get("/allBooks", getBooksList);
app.post("/createBook", createBook);
app.delete("/book/:id", deleteBook);

app.get("*", (req, res) => res.send("The route doesn't exist"));

app.listen(port, () => console.log(`server is listening on port : ${port}`));
