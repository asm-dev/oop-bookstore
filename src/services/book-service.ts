import { Book } from "../models/book-model";
import { ApplicationError } from "../types/application-error";

const API_URL = "http://localhost:3000/api/books";

export class BookService {
  public static async getAll(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(ApplicationError.GET_BOOKS);
    return response.json();
  }

  private static async addBook(book: Book): Promise<Book> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error(ApplicationError.ADD_BOOK);
    return response.json();
  }

  private static async updateBook(book: Book): Promise<Book> {
    const response = await fetch(`${API_URL}/${book.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error(ApplicationError.UPDATE_BOOK);
    return response.json();
  }

  public static async saveBook(book: Book): Promise<Book> {
    try {
      return await this.updateBook(book);
    } catch {
      return await this.addBook(book);
    }
  }

  public static async deleteBook(title: string): Promise<void> {
    const response = await fetch(`${API_URL}/${title}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(ApplicationError.DELETE_BOOK);
  }
}
