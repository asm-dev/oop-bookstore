import { Book } from "../models/book-model";
import { ApplicationError } from "../types/application-error";
import { BookRepository } from "./contracts/book-repository-contract";
import { API_ENDPOINTS } from "../config";

const API_URL = API_ENDPOINTS.BOOKS;

export class BookDataService implements BookRepository {
  public async getAllBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error(ApplicationError.GET_BOOKS);

    return response.json();
  }

  public async getBookById(id: string): Promise<Book | null> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(ApplicationError.GET_BOOK);
    }

    const bookData = await response.json();
    return new Book(
      bookData.title,
      bookData.author,
      bookData.year,
      bookData.copiesAvailable,
      bookData.genre,
      bookData.id
    );
  }

  public async addBook(book: Book): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.ADD_BOOK);

    const data = await response.json();
    return data.map(
      (book: any) =>
        new Book(
          book.title,
          book.author,
          book.year,
          book.copiesAvailable,
          book.genre
        )
    );
  }

  public async updateBook(book: Book): Promise<void> {
    const response = await fetch(`${API_URL}/${book.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.UPDATE_BOOK);

    return response.json();
  }

  public async deleteBook(title: string): Promise<void> {
    const response = await fetch(`${API_URL}/${title}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(ApplicationError.DELETE_BOOK);
  }
}
