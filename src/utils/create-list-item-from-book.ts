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
      const borrowLink = document.createElement("a");
      borrowLink.textContent = "Tomar prestado";
      borrowLink.href = "#";
      borrowLink.onclick = () => alert("Pendiente de implementar");
      buttonContainer.appendChild(borrowLink);
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
