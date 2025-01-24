import { Book } from "../domain/book/model/book-model";

const createLink = (
  callback: Function,
  text: string,
  customClass: string
): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = text;
  link.classList.add(customClass);
  link.addEventListener("click", (event) => {
    event.preventDefault();
    callback();
  });

  return link;
};

const createEditLink = (cb: Function): HTMLAnchorElement =>
  createLink(cb, "Editar", "catalog-link-add");
const createDeleteLink = (cb: Function): HTMLAnchorElement =>
  createLink(cb, "Eliminar", "catalog-link-delete");

export const createListItemFromBook = (
  book: Book,
  editCb: Function,
  deleteCb: Function
): HTMLLIElement => {
  const listItem = document.createElement("li");
  listItem.textContent = `${book.title} - ${book.author} (${book.year})`;

  const editLink = createEditLink(editCb);
  const deleteLink = createDeleteLink(deleteCb);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.append(editLink, deleteLink);

  listItem.appendChild(buttonContainer);

  return listItem;
};
