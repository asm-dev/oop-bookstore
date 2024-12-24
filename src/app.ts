import "./styles.css";
import { Book } from "./models/book-model";

const addBookButton = document.getElementById(
  "addBookBttn"
) as HTMLButtonElement;
const bookForm = document.getElementById("bookForm") as HTMLDivElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const closeButton = document.querySelector(".close-button") as HTMLElement;

addBookButton?.addEventListener("click", toggleBookFormVisibility);
closeButton?.addEventListener("click", toggleBookFormVisibility);
addBookForm?.addEventListener("submit", handleBookFormSubmit);
document.addEventListener("scroll", handleScrollEffect);

function toggleBookFormVisibility(): void {
  bookForm.classList.toggle("visible");
  bookForm.classList.toggle("hidden");
}

function handleBookFormSubmit(event: SubmitEvent): void {
  event.preventDefault();

  if (!isBookFormValid()) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  addBook();
  alert("Libro añadido exitosamente!");
  toggleBookFormVisibility();
  addBookForm.reset();
}

function addBook(): void {
  const bookData = {
    title: (document.getElementById("title") as HTMLInputElement).value,
    author: (document.getElementById("author") as HTMLInputElement).value,
    year: parseInt((document.getElementById("year") as HTMLInputElement).value),
    copiesAvailable: parseInt(
      (document.getElementById("copiesAvailable") as HTMLInputElement).value
    ),
    genre:
      (document.getElementById("genre") as HTMLInputElement).value || undefined,
  };

  const newBook = Book.create(
    bookData.title,
    bookData.author,
    bookData.year,
    bookData.copiesAvailable,
    bookData.genre
  );

  saveToStorage([...getBookData(), newBook]);
}

function isBookFormValid(): boolean {
  const requiredFields = ["title", "author", "year", "copiesAvailable"];
  return requiredFields.every((field) => {
    const value = (
      document.getElementById(field) as HTMLInputElement
    ).value.trim();
    return value !== "";
  });
}

function getBookData(): Book[] {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}

function saveToStorage(books: Book[]): void {
  localStorage.setItem("books", JSON.stringify(books));
}

function handleScrollEffect(): void {
  const header = document.querySelector("header") as HTMLElement;
  const isScrolled = window.scrollY > 20;

  header.classList.toggle("scrolled", isScrolled);
}
