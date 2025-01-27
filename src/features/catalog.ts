import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { Loan } from "../domain/loan";
import { ApplicationError } from "../types/application-error";
import { getStoredUser } from "../utils/user-auth";
import { CatalogUserActions } from "./catalog-user-actions";

const createCloseCatalogButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = "closeCatalogBttn";
  button.classList.add("close-button");
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

const createButtonContainer = (): HTMLDivElement => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  return buttonContainer;
};

const createListElement = (book: Book): HTMLLIElement => {
  const listItem = document.createElement("li");
  listItem.textContent = `${book.title} - ${book.author} (${book.year})`;
  return listItem;
};

//TODO: comprobar loans
const hasBeenBorrowed = (book: Book, loanLog: Loan[]): Loan | undefined => {
  return undefined;
};

export const restartCatalog = (): void => {
  bookList.innerHTML = "";
};

export async function showCatalog(): Promise<void> {
  try {
    const catalog = await catalogService.getAllBooks();
    const user = getStoredUser();

    catalog.forEach((book) => {
      const links = createButtonContainer();
      const bookInfo = createListElement(book);

      if (user) {
        const userLoans = [];
        if (user.isAdmin) {
          links.append(
            CatalogUserActions.createEditLink(book),
            CatalogUserActions.createDeleteLink(book)
          );
        } else {
          const loan = hasBeenBorrowed(book, userLoans);
          loan
            ? links.append(CatalogUserActions.createReturnLink(loan))
            : links.append(CatalogUserActions.createBorrowLink(book));
        }
      }
      bookInfo.appendChild(links);
      bookList.appendChild(bookInfo);
    });

    displayCloseCatalogButton();
  } catch (error) {
    alert(ApplicationError.LOAD_CATALOG);
  }
}

closeCatalogButton.addEventListener("click", hideCatalog);
