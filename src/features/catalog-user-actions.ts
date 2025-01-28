import { AuthRequired } from "../decorators";
import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { Loan } from "../domain/loan";
import { LoanLogService } from "../domain/loan/service/loan-log-service";
import { ApplicationError } from "../types/application-error";
import { OperationSuccess } from "../types/operation-sucess";
import { createLink } from "../utils/create-link";
import { fillBookForm } from "./book-form";
import { hideCatalog } from "./catalog";
import { showDeletePopup } from "./delete-pop-up";

export class CatalogUserActions {
  private static loanService: LoanLogService = new LoanLogService();
  private static catalogService: CatalogService = new CatalogService();

  @AuthRequired(true)
  public static createEditLink(book: Book): HTMLAnchorElement {
    return createLink(() => fillBookForm(book), "Editar", "catalog-link-add");
  }

  @AuthRequired(true)
  public static createDeleteLink(book: Book): HTMLAnchorElement {
    return createLink(
      () => showDeletePopup(book),
      "Eliminar",
      "catalog-link-delete"
    );
  }

  @AuthRequired()
  public static createBorrowLink(
    book: Book,
    userId: string
  ): HTMLAnchorElement {
    return createLink(
      () => this.onBorrowBook(book, userId),
      "Tomar prestado",
      "catalog-link-borrow"
    );
  }

  @AuthRequired()
  public static createReturnLink(
    bookId: string,
    userId: string
  ): HTMLAnchorElement {
    return createLink(
      () => this.onReturnBook(userId, bookId),
      "Devolver",
      "catalog-link-return"
    );
  }

  private static onBorrowBook = async (
    book: Book,
    userId: string
  ): Promise<void> => {
    try {
      const newLoan: Loan = new Loan(book.id, userId);
      const bookInstance = Book.fromJSON(book);
      bookInstance.borrow(1);

      await this.catalogService.updateBook(bookInstance);
      await this.loanService.addLoan(newLoan);

      hideCatalog();
      alert(OperationSuccess.SAVED_LOAN);
    } catch (error) {
      console.error(`${ApplicationError.SAVE_LOAN}: ${error}`);
      alert(ApplicationError.NEW_LOAN);
    }
  };

  private static onReturnBook = async (
    userId: string,
    bookId: string
  ): Promise<void> => {
    try {
      await this.loanService.returnBook(userId, bookId);
      const books = await this.catalogService.getAllBooks();
      const book = books.find((book) => book.id === bookId);
      if (!book) {
        throw new Error(ApplicationError.NOT_FOUND_BOOK);
      }

      const bookInstance = Book.fromJSON(book);
      bookInstance.returnCopy();

      await this.catalogService.updateBook(bookInstance);

      hideCatalog();
      alert(OperationSuccess.RETURN_BOOK);
    } catch (error) {
      console.error(`${ApplicationError.RETURN_BOOK}: ${error}`);
      alert(ApplicationError.RETURN_BOOK_TRY_AGAIN);
    }
  };
}
