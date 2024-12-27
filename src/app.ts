import "./styles.css";
import { Book } from "./models/book-model";
import { BookDataService } from "./services/book-data-service";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { isBookFormEnabled } from "./utils/show-form";
import { createBookCopiesRemovalForm } from "./utils/create-book-copies-removal-form";
import { createListItemFromBook } from "./utils/create-list-item-from-book";
import { createCloseCatalogButton } from "./utils/create-close-catalog-button";
import { ApplicationError } from "./types/application-error";
import { OperationSuccess } from "./types/operation-sucess";
import { getCustomRemovalMessage } from "./utils/get-custom-removal-message";

const bookCatalog = new BookDataService();
let isEditing = false;
let selectedBookId: string | null = null;

const showCatalogButton = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormButton = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;
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
const bookList = document.getElementById("bookList") as HTMLUListElement;
const addBookBttn = document.getElementById("addBookBttn") as HTMLButtonElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const closeCatalogButton = createCloseCatalogButton();

showCatalogButton.insertAdjacentElement("afterend", closeCatalogButton);

const getCatalogData = (): Promise<Book[]> => bookCatalog.getAllBooks();
const closePopup = (): void => popup.classList.add("hidden");
const restartCatalog = (): void => {
  bookList.innerHTML = "";
};
const hideCatalog = (): void => {
  restartCatalog();
  displayShowCatalogButton();
};
const displayCloseCatalogButton = (): void => {
  showCatalogButton.style.display = "none";
  closeCatalogButton.style.display = "inline-block";
};
const displayShowCatalogButton = (): void => {
  showCatalogButton.style.display = "inline-block";
  closeCatalogButton.style.display = "none";
};

async function showCatalog(): Promise<void> {
  try {
    const catalog = await getCatalogData();

    catalog.forEach((book) => {
      const listItem = createListItemFromBook(
        book,
        () => fillBookForm(book),
        () => showDeletePopup(book)
      );

      bookList.appendChild(listItem);
    });

    displayCloseCatalogButton();
  } catch (error) {
    alert(ApplicationError.LOAD_CATALOG);
  }
}

function showDeletePopup(book: Book): void {
  deleteMessage.textContent = getCustomRemovalMessage(book);

  popup.classList.remove("hidden");
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

async function handleDeleteCopies(book: Book): Promise<void> {
  const selectedCopies = getSelectedCopies();

  if (isValidCopiesSelection(selectedCopies, book.copiesAvailable)) {
    if (selectedCopies === book.copiesAvailable) {
      await handleDeleteBook(book);
    } else {
      await handleRemoveBookCopies(book, selectedCopies);
    }
    closePopup();
    restartCatalog();
    await showCatalog();
  } else {
    alert(
      `Por favor, introduce un número válido entre 1 y ${book.copiesAvailable}.`
    );
  }
}

const handleRemoveBookCopies = async (
  book: Book,
  copies: number
): Promise<void> => {
  try {
    await removeCopiesFromBook(book, copies);
    OperationSuccess.DELETED_COPIES;
  } catch (error) {
    ApplicationError.SAVE_COPIES;
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

const getSelectedCopies = (): number => {
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

async function removeCopiesFromBook(
  book: Book,
  selectedCopies: number
): Promise<void> {
  for (let i = 0; i < selectedCopies; i++) {
    book.borrowCopy();
  }

  await bookCatalog.updateBook(book);
}

const deleteBook = async (bookTitle: string): Promise<void> => {
  try {
    await bookCatalog.deleteBook(bookTitle);
    alert(OperationSuccess.DELETED_BOOK);
    closePopup();
    restartCatalog();
    await showCatalog();
  } catch (error) {
    alert(ApplicationError.DELETE_BOOK);
  }
};

function fillBookForm(book: Book): void {
  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("author") as HTMLInputElement).value = book.author;
  (document.getElementById("year") as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById("copiesAvailable") as HTMLInputElement).value =
    book.copiesAvailable.toString();
  (document.getElementById("genre") as HTMLInputElement).value =
    book.genre || "";

  isBookFormEnabled(true);
  isEditing = true;
  selectedBookId = book.id;
}

async function handleFormSubmit(event: SubmitEvent): Promise<void> {
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
      await bookCatalog.addBook(
        new Book(title, author, year, copiesAvailable, genre)
      );
      alert(OperationSuccess.SAVED_BOOK);
    } catch (error) {
      alert(ApplicationError.SAVE_BOOK);
    }
  } else {
    try {
      await bookCatalog.updateBook(
        new Book(title, author, year, copiesAvailable, genre, selectedBookId)
      );
      alert(OperationSuccess.UPDATED_BOOK);
    } catch (error) {
      alert(ApplicationError.UPDATE_BOOK);
    }
  }

  isBookFormEnabled(false);
  restartCatalog();
  await showCatalog();
  isEditing = false;
  selectedBookId = null;
}

window.addEventListener("scroll", handleStickyHeader);

addBookBttn.addEventListener("click", () => isBookFormEnabled(true));
closeBookFormButton.addEventListener("click", () => isBookFormEnabled(false));
addBookForm.addEventListener("submit", handleFormSubmit);
showCatalogButton.addEventListener("click", showCatalog);
closeCatalogButton.addEventListener("click", hideCatalog);
