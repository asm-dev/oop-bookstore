import { Book } from "../domain/book";
import { CatalogLinks } from "../features/catalog-links";

export const createListItemFromBook = (
  book: Book,
  editCb: Function,
  deleteCb: Function
): HTMLLIElement => {
  const listItem = document.createElement("li");
  listItem.textContent = `${book.title} - ${book.author} (${book.year})`;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const storedUser = sessionStorage.getItem("authenticatedUser");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (!user.isAdmin) {
      const pending = () => alert("Pendiente de implementar");
      const borrowLink = CatalogLinks.createBorrowLink(pending);
      const returnLink = CatalogLinks.createReturnLink(pending);
      buttonContainer.append(borrowLink, returnLink);
    }

    if (user.isAdmin) {
      const editLink = CatalogLinks.createEditLink(editCb);
      const deleteLink = CatalogLinks.createDeleteLink(deleteCb);
      buttonContainer.append(editLink, deleteLink);
    }
  }

  listItem.appendChild(buttonContainer);
  return listItem;
};
