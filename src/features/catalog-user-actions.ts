import { AuthRequired } from "../decorators";
import { Book } from "../domain/book";
import { Loan } from "../domain/loan";
import { createLink } from "../utils/create-link";
import { fillBookForm } from "./book-form";
import { showDeletePopup } from "./delete-pop-up";

export class CatalogUserActions {
  private static onBorrowBook = (book: Book): void => {
    //TODO: Crear nueva Loan y hacer copias -1;
  };

  private static onReturnBook = (loan: Loan): void => {
    //TODO: Loan devolver, y quitar registro
  };

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
  public static createBorrowLink(book: Book): HTMLAnchorElement {
    return createLink(
      () => this.onBorrowBook(book),
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
}
