import { Book } from "../book";

export interface CatalogModel {
  getAllBooks(): Promise<Book[]>;
  addBook(book: Book): Promise<void>;
  updateBook(book: Book): Promise<void>;
  deleteBook(id: string): Promise<void>;
}
