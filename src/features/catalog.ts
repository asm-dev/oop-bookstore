import { Book } from "../domain/book";
import { CatalogService } from "../domain/book/service/catalog-service";
import { Loan } from "../domain/loan";
import { LoanLogService } from "../domain/loan/service/loan-log-service";
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
  "showCatalogButton"
) as HTMLButtonElement;
const closeCatalogButton = createCloseCatalogButton();
showCatalogButton.insertAdjacentElement("afterend", closeCatalogButton);

const catalogService = new CatalogService();
const loanLogService = new LoanLogService();

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

const hasBeenBorrowed = (bookId: string, loanLog: Loan[]): boolean => {
  const hasLoan = loanLog.some((catalogBook) => catalogBook.bookId === bookId);

  return hasLoan;
};

export const restartCatalog = (): void => {
  bookList.innerHTML = "";
};

export async function showCatalog(): Promise<void> {
  try {
    const catalog = await catalogService.getAllBooks();
    const user = getStoredUser();
    let loanLog: Loan[] = [];

    if (user) {
      loanLog = await loanLogService.getActiveLoansByUser(user.id);
    }

    catalog.forEach((book) => {
      const links = createButtonContainer();
      const bookInfo = createListElement(book);

      if (user) {
        if (user.isAdmin) {
          links.append(
            CatalogUserActions.createEditLink(book),
            CatalogUserActions.createDeleteLink(book)
          );
        } else {
          hasBeenBorrowed(book.id, loanLog)
            ? links.append(
                CatalogUserActions.createReturnLink(new Loan(book.id, user.id))
              )
            : links.append(CatalogUserActions.createBorrowLink(book, user.id));
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
