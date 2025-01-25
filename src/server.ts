import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Book } from "./domain/book";
import { User, UserAdmin } from "./domain/user";
import { Loan } from "./domain/loan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const BOOK_DATA = path.resolve(__dirname, "../data/book-data.json");
const USER_DATA = path.resolve(__dirname, "../data/user-data.json");
const LOAN_DATA = path.resolve(__dirname, "../data/loan-data.json");

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
    const books = getData<Book>(BOOK_DATA);

    const bookIndex = books.findIndex((book) => book.title === title);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "El libro no existe." });
    }

    books[bookIndex] = updatedBook;
    saveData(BOOK_DATA, books);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro." });
  }
});

app.delete("/api/books/:title", (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const books = getData<Book>(BOOK_DATA);

    const filteredBooks = books.filter((book) => book.title !== title);
    if (books.length === filteredBooks.length) {
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

app.get("/api/users/:email", (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const users = getData<User>(USER_DATA);
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
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

app.get("/api/loans", (req: Request, res: Response) => {
  try {
    const loans = getData<Loan>(LOAN_DATA);
    res.json(loans);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al leer los datos de los préstamos." });
  }
});

app.post("/api/loans", (req: Request, res: Response) => {
  try {
    const newLoan: Loan = req.body;
    const loans = getData<Loan>(LOAN_DATA);
    const books = getData<Book>(BOOK_DATA);
    const users = getData<User>(USER_DATA);

    const book = books.find((b) => b.title === newLoan.bookId);
    const user = users.find((u) => u.email === newLoan.userId);

    if (!book || !user) {
      return res
        .status(400)
        .json({ error: "El libro o el usuario no existen." });
    }

    if (book.copiesAvailable <= 0) {
      return res
        .status(400)
        .json({ error: "No hay copias disponibles del libro." });
    }

    book.copiesAvailable -= 1;
    loans.push(newLoan);

    saveData(BOOK_DATA, books);
    saveData(LOAN_DATA, loans);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el préstamo." });
  }
});

app.delete("/api/loans/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const loans = getData<Loan>(LOAN_DATA);
    const books = getData<Book>(BOOK_DATA);

    const loanIndex = loans.findIndex((loan) => loan.id === id);
    if (loanIndex === -1) {
      return res.status(404).json({ error: "El préstamo no existe." });
    }

    const loan = loans[loanIndex];
    const book = books.find((b) => b.title === loan.bookId);

    if (book) {
      book.returnCopy();
    }

    loans.splice(loanIndex, 1);
    saveData(BOOK_DATA, books);
    saveData(LOAN_DATA, loans);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el préstamo." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
