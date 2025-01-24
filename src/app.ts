import "./styles.css";
import {
  enableForm,
  disableAndResetForm,
  handleFormSubmit,
} from "./features/book-form";
import { showCatalog } from "./features/catalog";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { showLoginPopup } from "./features/login";

const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
const showCatalogButton = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormButton = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;

const addBookBttn = document.getElementById("addBookBttn") as HTMLButtonElement;
const bookForm = document.getElementById("addBookForm") as HTMLFormElement;

window.addEventListener("scroll", handleStickyHeader);

loginButton.addEventListener("click", showLoginPopup);
addBookBttn.addEventListener("click", () => enableForm());
closeBookFormButton.addEventListener("click", () => disableAndResetForm());
bookForm.addEventListener("submit", handleFormSubmit);
showCatalogButton.addEventListener("click", showCatalog);
