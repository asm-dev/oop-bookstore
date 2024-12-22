import "./styles.css";
import { Book } from "./models/book-model";

const addBookButton = document.getElementById(
  "addBookButton"
) as HTMLButtonElement;
const bookForm = document.getElementById("bookForm") as HTMLDivElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;

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

  saveBooksToStorage(updatedBookList);

  alert("Libro añadido exitosamente!");

  bookForm.classList.remove("visible");
  bookForm.classList.add("hidden");

  addBookForm.reset();
});

const getBookData = (): Book[] => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

const saveBooksToStorage = (books: Book[]): void => {
  localStorage.setItem("books", JSON.stringify(books));
};
