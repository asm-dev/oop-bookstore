import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Book } from "./domain/book";

// TODO: refactor to allow user and loan endpoints

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const BOOK_DATA = path.resolve(__dirname, "../data/book-data.json");

app.use(cors());
app.use(express.json());

const ensureDataFileExists = (): void => {
  if (!fs.existsSync(BOOK_DATA)) {
    fs.writeFileSync(BOOK_DATA, JSON.stringify([]));
  }
};

const getBookData = (): Book[] => {
  ensureDataFileExists();

  const data = fs.readFileSync(BOOK_DATA, "utf8");

  return JSON.parse(data) as Book[];
};

const saveBookData = (bookList: Book[]): void => {
  fs.writeFileSync(BOOK_DATA, JSON.stringify(bookList, null, 2));
};

app.get("/api/books", (req: Request, res: Response) => {
  try {
    const books = getBookData();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos de los libros." });
  }
});

app.post("/api/books", (req: Request, res: Response) => {
  try {
    const newBook: Book = req.body;
    const catalog = getBookData();

    if (catalog.some((book) => book.title === newBook.title)) {
      return res.status(400).json({ error: "El libro ya existe." });
    }

    catalog.push(newBook);
    saveBookData(catalog);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el libro." });
  }
});

app.put("/api/books/:title", (req: Request, res: Response) => {
  //TODO: por ID no por title... si no da erro cuando actualizamos el titulo
  try {
    const title = req.params.title;
    const updatedBook: Book = req.body;
    const catalog = getBookData();

    const bookIndex = catalog.findIndex((book) => book.title === title);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    catalog[bookIndex] = updatedBook;
    saveBookData(catalog);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro." });
  }
});

app.delete("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const books = getBookData();

    const filteredBooks = books.filter((book) => book.title !== title);
    if (books.length === filteredBooks.length) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    saveBookData(filteredBooks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
