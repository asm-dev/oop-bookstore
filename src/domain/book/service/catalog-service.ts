import { API_ENDPOINTS } from "../../../config/api-endpoints";
import { ApplicationError } from "../../../types/application-error";
import { Book } from "../book";

export interface BookRepository {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  addBook(book: Book): Promise<void>;
  updateBook(book: Book): Promise<void>;
  deleteBook(id: string): Promise<void>;
}

const API_URL = API_ENDPOINTS.BOOKS;

export class CatalogService implements BookRepository {
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

    const retrievedBook = await response.json();

    return new Book(
      retrievedBook.title,
      retrievedBook.author,
      retrievedBook.year,
      retrievedBook.copiesAvailable,
      retrievedBook.genre,
      retrievedBook.id
    );
  }

  public async addBook(book: Book): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.ADD_BOOK);
  }

  public async updateBook(book: Book): Promise<void> {
    const response = await fetch(`${API_URL}/${book.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.UPDATE_BOOK);
  }

  public async deleteBook(title: string): Promise<void> {
    const response = await fetch(`${API_URL}/${title}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(ApplicationError.DELETE_BOOK);
  }
}
