import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { ApplicationError } from "../types/application-error";
import { OperationSuccess } from "../types/operation-sucess";
import { createBookCopiesRemovalForm } from "../utils/create-book-copies-removal-form";
import { hideElement, showElement } from "../utils/toggle-visibility";
import { hideCatalog, showCatalog } from "./catalog";

const confirmDelete = document.getElementById(
  "confirmDelete"
) as HTMLButtonElement;
const cancelDelete = document.getElementById(
  "cancelDelete"
) as HTMLButtonElement;
const deleteMessage = document.getElementById(
  "deleteMessage"
) as HTMLParagraphElement;
const closePopupButton = document.getElementById(
  "closePopup"
) as HTMLButtonElement;
const popup = document.getElementById("deletePopup") as HTMLDivElement;

const catalog = new CatalogService();

export const getCustomRemovalMessage = (book: Book): string =>
  `¿Estás seguro de que quieres eliminar el libro "${
    book.title
  }"? Actualmente hay ${book.copiesAvailable} ${
    book.copiesAvailable === 1 ? "copia disponible." : "copias disponibles."
  }`;

const closePopup = (): void => hideElement(popup);

const deleteBook = async (bookTitle: string): Promise<void> => {
  try {
    await catalog.deleteBook(bookTitle);
    alert(OperationSuccess.DELETED_BOOK);
    closePopup();
    hideCatalog();
    await showCatalog();
  } catch (error) {
    alert(ApplicationError.DELETE_BOOK);
  }
};

const handleDeleteBook = async (book: Book): Promise<void> => {
  try {
    await deleteBook(book.title);
    OperationSuccess.DELETED_BOOK;
  } catch (error) {
    ApplicationError.DELETE_BOOK;
  }
};

export function showDeletePopup(book: Book): void {
  deleteMessage.textContent = getCustomRemovalMessage(book);

  showElement(popup);
  closePopupButton.onclick = closePopup;
  cancelDelete.onclick = closePopup;

  if (book.copiesAvailable > 1) {
    const form = createBookCopiesRemovalForm(book.copiesAvailable);
    deleteMessage.appendChild(form);

    confirmDelete.type = "submit";
    confirmDelete.textContent = "Borrar copias";

    confirmDelete.onclick = () => handleDeleteCopies(book);
  } else {
    confirmDelete.textContent = "Borrar";
    confirmDelete.onclick = () => handleDeleteBook(book);
  }
}

const copiesToDelete = (): number => {
  return parseInt(
    (document.getElementById("unitsToDelete") as HTMLInputElement).value,
    10
  );
};

const isValidCopiesSelection = (
  selectedCopies: number,
  availableCopies: number
): boolean => {
  return selectedCopies >= 1 && selectedCopies <= availableCopies;
};

const borrowCopyFromBook = async (
  book: Book,
  copies: number
): Promise<void> => {
  try {
    const bookInstance = Book.fromJSON(book);
    bookInstance.borrow(copies);
    await catalog.updateBook(bookInstance);
    alert(OperationSuccess.DELETED_COPIES);
  } catch (error) {
    console.error(ApplicationError.SAVE_COPIES);
  }
};

async function handleDeleteCopies(book: Book): Promise<void> {
  const selectedCopies = copiesToDelete();

  if (isValidCopiesSelection(selectedCopies, book.copiesAvailable)) {
    if (selectedCopies === book.copiesAvailable) {
      await handleDeleteBook(book);
    } else {
      await borrowCopyFromBook(book, selectedCopies);
    }
    closePopup();
    hideCatalog();
  } else {
    alert(
      `Por favor, introduce un número válido entre 1 y ${book.copiesAvailable}.`
    );
  }
}
