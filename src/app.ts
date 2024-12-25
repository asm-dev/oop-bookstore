import "./styles.css";
import { Book } from "./models/book-model";
import { BookService } from "./services/book-service";

const addBookButton = document.getElementById(
  "addBookBttn"
) as HTMLButtonElement;
const closeButton = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;
const showCatalogButton = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const bookForm = document.getElementById("bookForm") as HTMLDivElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const bookList = document.getElementById("bookList") as HTMLUListElement;

addBookButton?.addEventListener("click", () => toggleBookFormVisibility(true));
closeButton?.addEventListener("click", () => toggleBookFormVisibility(false));
addBookForm?.addEventListener("submit", handleBookFormSubmit);
showCatalogButton?.addEventListener("click", showCatalog);

function toggleBookFormVisibility(shouldDisplay: boolean): void {
  if (shouldDisplay) {
    bookForm.classList.add("visible");
  } else {
    bookForm.classList.remove("visible");
  }
}

function getFormValues(): {
  title: string;
  author: string;
  year: number;
  copiesAvailable: number;
  genre?: string;
} {
  const title = (
    document.getElementById("title") as HTMLInputElement
  ).value.trim();
  const author = (
    document.getElementById("author") as HTMLInputElement
  ).value.trim();
  const year = parseInt(
    (document.getElementById("year") as HTMLInputElement).value.trim()
  );
  const copiesAvailable = parseInt(
    (
      document.getElementById("copiesAvailable") as HTMLInputElement
    ).value.trim()
  );
  const genre =
    (document.getElementById("genre") as HTMLInputElement).value.trim() ||
    undefined;

  return { title, author, year, copiesAvailable, genre };
}

function setFormValues(book: Book): void {
  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("author") as HTMLInputElement).value = book.author;
  (document.getElementById("year") as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById("copiesAvailable") as HTMLInputElement).value =
    book.copiesAvailable.toString();
  (document.getElementById("genre") as HTMLInputElement).value =
    book.genre || "";
}

function isBookFormValid(): boolean {
  const { title, author, year, copiesAvailable } = getFormValues();
  return !!(title && author && !isNaN(year) && !isNaN(copiesAvailable));
}

function handleErrors(error: unknown): void {
  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Ha ocurrido un error desconocido.");
  }
}

async function handleBookFormSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  if (!isBookFormValid()) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const bookData = getFormValues();
  const storedBookList = await BookService.getAll();
  const existingBook = storedBookList.find(
    (book) => book.title === bookData.title
  );

  try {
    if (existingBook) {
      updateBook(existingBook, bookData);
    } else {
      addNewBook(bookData);
    }

    toggleBookFormVisibility(false);
    showCatalog();
    addBookForm.reset();
  } catch (error) {
    handleErrors(error);
  }
}

function updateBook(existingBook: Book, bookData: Partial<Book>): void {
  const updatedBook = new Book(
    existingBook.title,
    bookData.author || existingBook.author,
    bookData.year || existingBook.year,
    bookData.copiesAvailable || existingBook.copiesAvailable,
    bookData.genre || existingBook.genre
  );

  BookService.updateInfo(updatedBook);
  alert("Libro actualizado exitosamente.");
}

function addNewBook(bookData: {
  title: string;
  author: string;
  year: number;
  copiesAvailable: number;
  genre?: string;
}): void {
  const newBook = Book.create(
    bookData.title,
    bookData.author,
    bookData.year,
    bookData.copiesAvailable,
    bookData.genre
  );

  BookService.addBook(newBook);
  alert("Libro añadido exitosamente.");
}

async function showCatalog(): Promise<void> {
  bookList.innerHTML = "";
  const storedBookList = await BookService.getAll();

  storedBookList.forEach((book) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${book.title} - ${book.author} (${book.year})`;

    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.textContent = "Editar";
    editLink.addEventListener("click", () => editBook(book));

    listItem.appendChild(editLink);
    bookList.appendChild(listItem);
  });
}

function editBook(book: Book): void {
  toggleBookFormVisibility(true);
  setFormValues(book);

  addBookForm.onsubmit = (event) => {
    event.preventDefault();

    if (!isBookFormValid()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const updatedData = getFormValues();
      updateBook(book, updatedData);
      toggleBookFormVisibility(false);
      showCatalog();
      addBookForm.reset();
    } catch (error) {
      handleErrors(error);
    }
  };
}
