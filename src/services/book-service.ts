import { Book } from "../models/book-model";

const API_URL = "http://localhost:3000/api/books";

export class BookService {
  public static async getAll(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los libros.");
    }
    return response.json();
  }

  public static async addBook(newBook: Book): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al agregar el libro.");
    }
  }

  public static async updateInfo(updatedBook: Book): Promise<void> {
    const response = await fetch(`${API_URL}/${updatedBook.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al actualizar el libro.");
    }
  }
}
