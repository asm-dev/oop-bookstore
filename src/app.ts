import "./styles.css";
import { Book } from "./models/book-model";
import { BookService } from "./services/book-service";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { isBookFormEnabled } from "./utils/show-form";
import { createBookCopiesRemovalForm } from "./utils/create-book-copies-removal-form";
import { createListItemFromBook } from "./utils/create-list-item-from-book";
import { createCloseCatalogButton } from "./utils/create-close-catalog-button";
import { ApplicationError } from "./types/application-error";
import { OperationSuccess } from "./types/operation-sucess";
import { getCustomRemovalMessage } from "./utils/get-custom-removal-message";

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

const getCatalogData = (): Promise<Book[]> => BookService.getAll();
const closePopup = (): void => popup.classList.add("hidden");
const restartCatalog = (): void => {
  bookList.innerHTML = "";
};
const displayCatalogButton = (): void => {
  showCatalogButton.style.display = "none";
  closeCatalogButton.style.display = "inline-block";
};
const displayCloseCatalogButton = (): void => {
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

    displayCatalogButton();
  } catch (error) {
    alert(ApplicationError.LOAD_CATALOG);
  }
}

const hideCatalog = (): void => {
  restartCatalog();
  displayCloseCatalogButton();
};

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

    confirmDelete.onclick = async () => {
      const selectedCopies = parseInt(
        (document.getElementById("unitsToDelete") as HTMLInputElement).value,
        10
      );
      const areSelectedCopiesValid =
        selectedCopies >= 1 && selectedCopies < book.copiesAvailable;
      const areSelectedCopiesSameThanAvailable =
        selectedCopies === book.copiesAvailable;

      if (areSelectedCopiesValid) {
        try {
          await BookService.saveBook({
            ...book,
            copiesAvailable: book.copiesAvailable - selectedCopies,
          });
          alert(OperationSuccess.DELETED_COPIES);
          closePopup();
          restartCatalog();
          await showCatalog();
        } catch (error) {
          alert(ApplicationError.SAVE_COPIES);
        }
      } else if (areSelectedCopiesSameThanAvailable) {
        deleteBook(book.title);
      } else {
        alert(
          `Por favor, introduce un número válido entre 1 y ${book.copiesAvailable}.`
        );
      }
    };
  } else {
    confirmDelete.textContent = "Borrar";
    confirmDelete.onclick = async () => {
      await deleteBook(book.title);
    };
  }
}

const deleteBook = async (bookTitle: string): Promise<void> => {
  try {
    await BookService.deleteBook(bookTitle);
    alert(OperationSuccess.DELETED_BOOK);
    closePopup();
    restartCatalog();
    await showCatalog();
  } catch (error) {
    alert(ApplicationError.DELETE_BOOK);
  }
};

const saveBook = async (book: Book): Promise<void> => {
  try {
    await BookService.saveBook(book);
    alert(OperationSuccess.SAVED_BOOK);
    isBookFormEnabled(false);
    restartCatalog();
    await showCatalog();
  } catch (error) {
    alert(ApplicationError.SAVE_BOOK);
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

  const book = new Book(title, author, year, copiesAvailable, genre);

  saveBook(book);
}

window.addEventListener("scroll", handleStickyHeader);

addBookBttn.addEventListener("click", () => isBookFormEnabled(true));
closeBookFormButton.addEventListener("click", () => isBookFormEnabled(false));
addBookForm.addEventListener("submit", handleFormSubmit);
showCatalogButton.addEventListener("click", showCatalog);
closeCatalogButton.addEventListener("click", hideCatalog);
