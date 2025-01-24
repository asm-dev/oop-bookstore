import { Book } from "../domain/book/model/book-model";
import { BookDataService } from "../domain/book/service/book-data-service";
import { ApplicationError } from "../types/application-error";
import { createListItemFromBook } from "../utils/create-list-item-from-book";
import { fillBookForm } from "./book-form";
import { showDeletePopup } from "./delete-pop-up";

const createCloseCatalogButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = "closeCatalogBttn";
  button.textContent = "Cerrar el catálogo";
  button.style.display = "none";

  return button;
};

const bookList = document.getElementById("bookList") as HTMLUListElement;
const showCatalogButton = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormButton = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;
const closeCatalogButton = createCloseCatalogButton();
showCatalogButton.insertAdjacentElement("afterend", closeCatalogButton);

const catalogService = new BookDataService();
const getCatalogData = (): Promise<Book[]> => catalogService.getAllBooks();

const hideCatalog = (): void => {
  restartCatalog();
  displayShowCatalogButton();
};

const displayShowCatalogButton = (): void => {
  showCatalogButton.style.display = "inline-block";
  closeCatalogButton.style.display = "none";
};

const displayCloseCatalogButton = (): void => {
  showCatalogButton.style.display = "none";
  closeCatalogButton.style.display = "inline-block";
};

export const restartCatalog = (): void => {
  bookList.innerHTML = "";
};

export async function showCatalog(): Promise<void> {
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

closeCatalogButton.addEventListener("click", hideCatalog);
