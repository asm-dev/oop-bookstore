import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { ApplicationError } from "../types/application-error";
import { OperationSuccess } from "../types/operation-sucess";
import { hideCatalog, showCatalog } from "./catalog";

const catalogService = new CatalogService();
const formContainer = document.getElementById("bookForm") as HTMLDivElement;
const form = document.getElementById("addBookForm") as HTMLFormElement;

let isEditing = false;
let selectedBookId: string | null = null;

export const onAddBookButtonClick = (): void => enableForm();

const enableForm = (): void => {
  formContainer.classList.add("visible");
};

export const disableAndResetForm = (): void => {
  formContainer.classList.remove("visible");
  form.reset();
};

export function fillBookForm(book: Book): void {
  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("author") as HTMLInputElement).value = book.author;
  (document.getElementById("year") as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById("copiesAvailable") as HTMLInputElement).value =
    book.copiesAvailable.toString();
  (document.getElementById("genre") as HTMLInputElement).value =
    book.genre || "";

  enableForm();
  isEditing = true;
  selectedBookId = book.id;
}

export async function onBookFormClick(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const title = (
    document.getElementById("title") as HTMLInputElement
  ).value.trim();
  const author = (
    document.getElementById("author") as HTMLInputElement
  ).value.trim();
  const year = parseInt(
    (document.getElementById("year") as HTMLInputElement).value.trim()
  );
  const copiesAvailable = parseInt(
    (
      document.getElementById("copiesAvailable") as HTMLInputElement
    ).value.trim()
  );
  const genre = (
    document.getElementById("genre") as HTMLInputElement
  ).value.trim();

  if (!title || !author || isNaN(year) || isNaN(copiesAvailable)) {
    alert("Por favor revise el formulario.");
    return;
  }

  if (!isEditing) {
    try {
      await catalogService.addBook(
        new Book(title, author, year, copiesAvailable, genre)
      );
      alert(OperationSuccess.SAVED_BOOK);
    } catch (error) {
      alert(ApplicationError.SAVE_BOOK);
    }
  } else {
    try {
      await catalogService.updateBook(
        new Book(title, author, year, copiesAvailable, genre, selectedBookId)
      );
      alert(OperationSuccess.UPDATED_BOOK);
    } catch (error) {
      alert(ApplicationError.UPDATE_BOOK);
    }
  }

  disableAndResetForm();
  hideCatalog();
  await showCatalog();
  isEditing = false;
  selectedBookId = null;
}
