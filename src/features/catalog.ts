import { CatalogService } from "../domain/book/service/catalog-service";
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
const closeCatalogButton = createCloseCatalogButton();
showCatalogButton.insertAdjacentElement("afterend", closeCatalogButton);

const catalogService = new CatalogService();

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
    const catalog = await catalogService.getAllBooks();

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
