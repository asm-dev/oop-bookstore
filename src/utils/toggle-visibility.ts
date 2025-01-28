import { isAdminUser } from "./user-auth";

export const toggleAddButtonVisibility = (): void => {
  const addBook = document.getElementById("addBookButton") as HTMLButtonElement;

  if (addBook) {
    isAdminUser() ? showElement(addBook) : hideElement(addBook);
  }
};

export const hideElement = (element: HTMLElement): void => {
  element.classList.add("hidden");
};

export const showElement = (element: HTMLElement): void => {
  element.classList.remove("hidden");
};
