import "./styles.css";
import { Book } from "./models/book-model";
import { BookService } from "./services/book-service";

const addBookBttn = document.getElementById("addBookBttn") as HTMLButtonElement;
const showCatalogBttn = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormBttn = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;
const bookForm = document.getElementById("bookForm") as HTMLDivElement;
const bookList = document.getElementById("bookList") as HTMLUListElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const header = document.querySelector("header") as HTMLElement;

const closeCatalogBttn = document.createElement("button");
closeCatalogBttn.id = "closeCatalogBttn";
closeCatalogBttn.textContent = "Cerrar el catálogo";
closeCatalogBttn.style.display = "none";

showCatalogBttn.insertAdjacentElement("afterend", closeCatalogBttn);

function handleStickyHeader() {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleStickyHeader);

function toggleBookFormVisibility(show: boolean) {
  if (show) {
    bookForm.classList.add("visible");
  } else {
    bookForm.classList.remove("visible");
    addBookForm.reset();
  }
}

const hideForm = (): void => toggleBookFormVisibility(false);
const showForm = (): void => toggleBookFormVisibility(true);

async function showCatalog() {
  try {
    const books = await BookService.getAll();
    bookList.innerHTML = "";

    books.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${book.title} - ${book.author} (${book.year})`;

      const editLink = document.createElement("a");
      editLink.href = "#";
      editLink.textContent = "Editar";
      editLink.addEventListener("click", (event) => {
        event.preventDefault();
        retrieveBookData(book);
      });

      const deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.textContent = "Eliminar";
      deleteLink.classList.add("delete-link");
      deleteLink.addEventListener("click", (event) => {
        event.preventDefault();
        showDeletePopup(book);
      });

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
      buttonContainer.append(editLink, deleteLink);

      listItem.appendChild(buttonContainer);
      bookList.appendChild(listItem);
    });

    showCatalogBttn.style.display = "none";
    closeCatalogBttn.style.display = "inline-block";
  } catch (error) {
    alert("Error al mostrar el catálogo: " + error);
  }
}

function hideCatalog() {
  bookList.innerHTML = "";
  showCatalogBttn.style.display = "inline-block";
  closeCatalogBttn.style.display = "none";
}

function showDeletePopup(book: Book) {
  const popup = document.getElementById("deletePopup") as HTMLDivElement;
  const deleteMessage = document.getElementById(
    "deleteMessage"
  ) as HTMLParagraphElement;
  deleteMessage.textContent = `¿Estás seguro de que quieres eliminar el libro "${book.title}"?`;

  const confirmDelete = document.getElementById(
    "confirmDelete"
  ) as HTMLButtonElement;
  const cancelDelete = document.getElementById(
    "cancelDelete"
  ) as HTMLButtonElement;
  const closeBtn = document.getElementById("closePopup") as HTMLButtonElement;

  popup.classList.remove("hidden");

  const closePopup = () => popup.classList.add("hidden");

  closeBtn.onclick = closePopup;
  cancelDelete.onclick = closePopup;

  confirmDelete.onclick = async () => {
    try {
      await BookService.deleteBook(book.title);
      alert("Libro eliminado con éxito");
      closePopup();
      await showCatalog();
    } catch (error) {
      alert("Error al eliminar el libro: " + error);
    }
  };
}

function retrieveBookData(book: Book) {
  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("author") as HTMLInputElement).value = book.author;
  (document.getElementById("year") as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById("copiesAvailable") as HTMLInputElement).value =
    book.copiesAvailable.toString();
  (document.getElementById("genre") as HTMLInputElement).value =
    book.genre || "";

  showForm();
}

async function handleFormSubmit(event: SubmitEvent) {
  event.preventDefault();

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
  const genre = (
    document.getElementById("genre") as HTMLInputElement
  ).value.trim();

  if (!title || !author || isNaN(year) || isNaN(copiesAvailable)) {
    alert("Por favor revise el formulario.");
    return;
  }

  const book = new Book(title, author, year, copiesAvailable, genre);

  try {
    await BookService.saveBook(book);
    alert("Libro guardado con éxito");
    hideForm();
    await showCatalog();
  } catch (error) {
    alert("Error al guardar el libro: " + error);
  }
}

addBookBttn.addEventListener("click", () => toggleBookFormVisibility(true));
closeBookFormBttn.addEventListener("click", () => hideForm());
addBookForm.addEventListener("submit", handleFormSubmit);
showCatalogBttn.addEventListener("click", showCatalog);
closeCatalogBttn.addEventListener("click", hideCatalog);
