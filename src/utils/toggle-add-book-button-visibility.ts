import { isAdminUser } from "./user-auth";

export const toggleAddButtonVisibility = (): void => {
  const addBook = document.getElementById("addBookBttn") as HTMLButtonElement;

  if (addBook) {
    isAdminUser()
      ? addBook.classList.remove("hidden")
      : addBook.classList.add("hidden");
  }
};
