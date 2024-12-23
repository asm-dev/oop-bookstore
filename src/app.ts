import "./styles.css";
import { Book } from "./models/book-model";

const addBookButton = document.getElementById(
  "addBookBttn"
) as HTMLButtonElement;
const bookForm = document.getElementById("bookForm") as HTMLDivElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const closeButton = document.querySelector(".close-button") as HTMLElement;

addBookButton?.addEventListener("click", () => {
  bookForm.classList.remove("hidden");
  bookForm.classList.add("visible");
});

addBookForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const author = (document.getElementById("author") as HTMLInputElement).value;
  const year = parseInt(
    (document.getElementById("year") as HTMLInputElement).value
  );
  const copiesAvailable = parseInt(
    (document.getElementById("copiesAvailable") as HTMLInputElement).value
  );
  const genre =
    (document.getElementById("genre") as HTMLInputElement).value || undefined;

  if (!title || !author || !year || !copiesAvailable) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newBook = Book.create(title, author, year, copiesAvailable, genre);
  const updatedBookList = getBookData().concat([newBook]);

  saveToStorage(updatedBookList);

  alert("Libro añadido exitosamente!");

  bookForm.classList.remove("visible");
  bookForm.classList.add("hidden");

  addBookForm.reset();
});

const getBookData = (): Book[] => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

const saveToStorage = (books: Book[]): void => {
  localStorage.setItem("books", JSON.stringify(books));
};

document.addEventListener("scroll", () => {
  const header = document.querySelector("header") as HTMLElement;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("scroll", () => {
  const header = document.querySelector("header") as HTMLElement;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

addBookButton.addEventListener("click", () => {
  bookForm.classList.add("visible");
  bookForm.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  bookForm.classList.remove("visible");
  bookForm.classList.add("hidden");
});
