import { AuthRequired } from "../decorators";
import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { Loan } from "../domain/loan";
import { LoanLogService } from "../domain/loan/service/loan-log-service";
import { User } from "../domain/user";
import { ApplicationError } from "../types/application-error";
import { OperationSuccess } from "../types/operation-sucess";
import { createLink } from "../utils/create-link";
import { fillBookForm } from "./book-form";
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
  public static createReturnLink(loan: Loan): HTMLAnchorElement {
    return createLink(
      () => this.onReturnBook(loan),
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

      alert(OperationSuccess.SAVED_LOAN);
    } catch (error) {
      console.error(`${ApplicationError.SAVE_LOAN}: ${error}`);
      alert(ApplicationError.NEW_LOAN);
    }
  };

  private static onReturnBook = async (loan: Loan): Promise<void> => {
    try {
      await this.loanService.returnBook(loan.id);

      const books = await this.catalogService.getAllBooks();
      const book = books.find((book) => book.id === loan.bookId);

      if (!book) {
        throw new Error(ApplicationError.NOT_FOUND_BOOK);
      }

      book.returnCopy();

      await this.catalogService.updateBook(book);

      alert(OperationSuccess.RETURN_BOOK);
    } catch (error) {
      console.error(`${ApplicationError.RETURN_BOOK}: ${error}`);
      alert(ApplicationError.RETURN_BOOK_TRY_AGAIN);
    }
  };
}
