import "./styles.css";
import {
  enableForm,
  disableAndResetForm,
  handleFormSubmit,
} from "./features/book-form";
import { showCatalog } from "./features/catalog";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { showLoginPopup } from "./features/login";
import { isAdmin, isUserAuthenticated } from "./utils/user-auth";

const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
const addBookBttn = document.getElementById("addBookBttn") as HTMLButtonElement;
const bookForm = document.getElementById("addBookForm") as HTMLFormElement;
const showCatalogButton = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormButton = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;

window.addEventListener("scroll", handleStickyHeader);

bookForm.addEventListener("submit", handleFormSubmit);
loginButton.addEventListener("click", showLoginPopup);
addBookBttn.addEventListener("click", () => enableForm());
closeBookFormButton.addEventListener("click", () => disableAndResetForm());
showCatalogButton.addEventListener("click", showCatalog);

if (isAdmin()) {
  addBookBttn.classList.remove("hidden");
} else {
  addBookBttn.classList.add("hidden");
}
