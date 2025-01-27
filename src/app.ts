import "./styles.css";
import {
  onBookFormClick,
  onAddBookButtonClick,
  disableAndResetForm,
} from "./features/book-form";
import { showCatalog } from "./features/catalog";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { onLoginButtonClick } from "./features/login";
import { toggleAddButtonVisibility } from "./utils/toggle-visibility";

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
window.addEventListener("load", () => {
  toggleAddButtonVisibility();
});

bookForm.addEventListener("submit", onBookFormClick);
loginButton.addEventListener("click", onLoginButtonClick);
addBookBttn.addEventListener("click", onAddBookButtonClick);
closeBookFormButton.addEventListener("click", disableAndResetForm);
showCatalogButton.addEventListener("click", showCatalog);
