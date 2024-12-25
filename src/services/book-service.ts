import { Book } from "../models/book-model";

const API_URL = "http://localhost:3000/api/books";

export class BookService {
  static async getAll(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los libros.");
    return response.json();
  }

  static async addBook(book: Book): Promise<Book> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Error al añadir el libro.");
    return response.json();
  }

  static async updateBook(book: Book): Promise<Book> {
    const response = await fetch(`${API_URL}/${book.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Error al actualizar el libro.");
    return response.json();
  }

  static async saveBook(book: Book): Promise<Book> {
    try {
      return await this.updateBook(book);
    } catch {
      return await this.addBook(book);
    }
  }

  static async deleteBook(title: string): Promise<void> {
    const response = await fetch(`${API_URL}/${title}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el libro.");
  }
}
