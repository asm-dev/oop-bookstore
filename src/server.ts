import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Book } from "./domain/book";
import { User, UserAdmin } from "./domain/user";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const BOOK_DATA = path.resolve(__dirname, "../data/book-data.json");
const USER_DATA = path.resolve(__dirname, "../data/user-data.json");

app.use(cors());
app.use(express.json());

const ensureDataFileExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

const getData = <T>(filePath: string): T[] => {
  ensureDataFileExists(filePath);
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data) as T[];
};

const saveData = <T>(filePath: string, data: T[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/api/books", (req: Request, res: Response) => {
  try {
    const books = getData<Book>(BOOK_DATA);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos de los libros." });
  }
});

app.post("/api/books", (req: Request, res: Response) => {
  try {
    const newBook: Book = req.body;
    const books = getData<Book>(BOOK_DATA);

    if (books.some((book) => book.title === newBook.title)) {
      return res.status(400).json({ error: "El libro ya existe." });
    }

    books.push(newBook);
    saveData(BOOK_DATA, books);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el libro." });
  }
});

app.put("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const updatedBook: Book = req.body;
    const catalog = getData<Book>(BOOK_DATA);

    const bookIndex = catalog.findIndex((book) => book.title === title);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    catalog[bookIndex] = updatedBook;
    saveData(BOOK_DATA, catalog);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro." });
  }
});

app.delete("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const catalog = getData<Book>(BOOK_DATA);

    const filteredBooks = catalog.filter((book) => book.title !== title);
    if (catalog.length === filteredBooks.length) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    saveData(BOOK_DATA, filteredBooks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro." });
  }
});

app.get("/api/users", (req: Request, res: Response) => {
  try {
    const users = getData<User>(USER_DATA);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos de los usuarios." });
  }
});

app.post("/api/users", (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const users = getData<User>(USER_DATA);

    if (users.some((user) => user.email === newUser.email)) {
      return res.status(400).json({ error: "El usuario ya existe." });
    }

    users.push(newUser);
    saveData(USER_DATA, users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el usuario." });
  }
});

app.post("/api/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const users = getData<User>(USER_DATA);
    const user = users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ error: "Usuario no encontrado o datos incorrectos" });
    }

    const isAdmin = user instanceof UserAdmin;

    res.cookie(
      "user",
      JSON.stringify({ id: user.id, name: user.name, isAdmin }),
      { maxAge: 3600000, httpOnly: true }
    );

    return res.json({
      message: "Inicio de sesión exitoso",
      userName: user.name,
      isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
