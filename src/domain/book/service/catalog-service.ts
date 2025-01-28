import { API_ENDPOINTS } from "../../../config/api-endpoints";
import { Loading } from "../../../decorators";
import { ApplicationError } from "../../../types/application-error";
import { Book } from "../book";

export interface CatalogServiceModel {
  getAllBooks(): Promise<Book[]>;
  addBook(book: Book): Promise<void>;
  updateBook(book: Book): Promise<void>;
  deleteBook(id: string): Promise<void>;
}

const API_URL = API_ENDPOINTS.BOOKS;

export class CatalogService implements CatalogServiceModel {
  @Loading
  public async getAllBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error(ApplicationError.GET_BOOKS);

    return response.json();
  }

  @Loading
  public async addBook(book: Book): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.ADD_BOOK);
  }

  @Loading
  public async updateBook(book: Book): Promise<void> {
    const response = await fetch(`${API_URL}/${book.title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error(ApplicationError.UPDATE_BOOK);
  }

  @Loading
  public async deleteBook(title: string): Promise<void> {
    const response = await fetch(`${API_URL}/${title}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(ApplicationError.DELETE_BOOK);
  }
}
