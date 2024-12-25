import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { Book } from "./models/book-model";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const BOOK_DATA = path.resolve(__dirname, "../data/book-data.json");

app.use(cors());
app.use(express.json());

function ensureDataFileExists(): void {
  if (!fs.existsSync(BOOK_DATA)) {
    fs.writeFileSync(BOOK_DATA, JSON.stringify([]));
  }
}

function readBooks(): Book[] {
  ensureDataFileExists();
  const data = fs.readFileSync(BOOK_DATA, "utf8");
  return JSON.parse(data) as Book[];
}

function saveBooks(books: Book[]): void {
  fs.writeFileSync(BOOK_DATA, JSON.stringify(books, null, 2));
}

app.get("/api/books", (req: Request, res: Response) => {
  try {
    const books = readBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos de los libros." });
  }
});

app.post("/api/books", (req: Request, res: Response) => {
  try {
    const newBook: Book = req.body;
    const books = readBooks();

    if (books.some((book) => book.title === newBook.title)) {
      return res.status(400).json({ error: "El libro ya existe." });
    }

    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el libro." });
  }
});

app.put("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const updatedBook: Book = req.body;
    const books = readBooks();

    const bookIndex = books.findIndex((book) => book.title === title);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    books[bookIndex] = updatedBook;
    saveBooks(books);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro." });
  }
});

app.delete("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const books = readBooks();

    const filteredBooks = books.filter((book) => book.title !== title);
    if (books.length === filteredBooks.length) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    saveBooks(filteredBooks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
