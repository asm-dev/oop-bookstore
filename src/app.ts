import "./styles.css";
import { Book } from "./models/book-model";
import { BookService } from "./services/book-service";
import { handleStickyHeader } from "./utils/sticky-header-handler";
import { isBookFormEnabled } from "./utils/show-form";

const showCatalogBttn = document.getElementById(
  "showCatalogBttn"
) as HTMLButtonElement;
const closeBookFormBttn = document.getElementById(
  "closeFormBttn"
) as HTMLButtonElement;
const confirmDelete = document.getElementById(
  "confirmDelete"
) as HTMLButtonElement;
const cancelDelete = document.getElementById(
  "cancelDelete"
) as HTMLButtonElement;
const deleteMessage = document.getElementById(
  "deleteMessage"
) as HTMLParagraphElement;
const closePopupButton = document.getElementById(
  "closePopup"
) as HTMLButtonElement;
const popup = document.getElementById("deletePopup") as HTMLDivElement;
const bookList = document.getElementById("bookList") as HTMLUListElement;
const addBookBttn = document.getElementById("addBookBttn") as HTMLButtonElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;

const closeCatalogBttn = document.createElement("button");
closeCatalogBttn.id = "closeCatalogBttn";
closeCatalogBttn.textContent = "Cerrar el catálogo";
closeCatalogBttn.style.display = "none";
showCatalogBttn.insertAdjacentElement("afterend", closeCatalogBttn);

async function showCatalog(): Promise<void> {
  try {
    const books = await BookService.getAll();
    bookList.innerHTML = "";

    books.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${book.title} - ${book.author} (${book.year})`;

      const editLink = document.createElement("a");
      editLink.href = "#";
      editLink.textContent = "Editar";
      editLink.classList.add("catalog-link-add");
      editLink.addEventListener("click", (event) => {
        event.preventDefault();
        retrieveBookData(book);
      });

      const deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.textContent = "Eliminar";
      deleteLink.classList.add("catalog-link-delete");
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

function showDeletePopup(book: Book): void {
  const closePopup = (): void => popup.classList.add("hidden");
  deleteMessage.textContent = `¿Estás seguro de que quieres eliminar el libro "${
    book.title
  }"? Actualmente hay ${book.copiesAvailable} ${
    book.copiesAvailable === 1 ? "copia disponible." : "copias disponibles."
  }`;

  popup.classList.remove("hidden");
  closePopupButton.onclick = closePopup;
  cancelDelete.onclick = closePopup;

  if (book.copiesAvailable > 1) {
    const form = document.createElement("form") as HTMLFormElement;
    form.id = "deleteBookUnitsForm";
    const label = document.createElement("label") as HTMLLabelElement;
    label.htmlFor = "units-to-delete";
    label.textContent = "Por favor selecciona cuantas unidades quieres borrar:";
    const input = document.createElement("input");
    input.type = "number";
    input.id = "units-to-delete";
    input.name = "unitsToDelete";
    input.min = "1";
    input.max = `${book.copiesAvailable}`;
    input.placeholder = `Introduce un número del 1 al ${book.copiesAvailable}`;
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);
    deleteMessage.appendChild(form);

    confirmDelete.type = "submit";
    confirmDelete.textContent = "Borrar copias";
    confirmDelete.onclick = async () => {};

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const selectedCopies = parseInt(input.value, 10);
      const updatedBook: Book = { ...book, copiesAvailable: selectedCopies };

      if (selectedCopies >= 1 && selectedCopies <= book.copiesAvailable) {
        try {
          await BookService.saveBook(updatedBook);
          alert("Copias eliminadas con éxito");
          closePopup();
          await showCatalog();
        } catch (error) {
          alert(
            "Error al actualizar las copias disponibles del libro: " + error
          );
        }
      } else {
        alert(
          `Por favor, introduce un número válido entre 1 y ${book.copiesAvailable}.`
        );
      }
    });
  } else {
    confirmDelete.textContent = "Borrar";
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
}

function retrieveBookData(book: Book): void {
  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("author") as HTMLInputElement).value = book.author;
  (document.getElementById("year") as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById("copiesAvailable") as HTMLInputElement).value =
    book.copiesAvailable.toString();
  (document.getElementById("genre") as HTMLInputElement).value =
    book.genre || "";

  isBookFormEnabled(true);
}

async function handleFormSubmit(event: SubmitEvent): Promise<void> {
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
    isBookFormEnabled(false);
    await showCatalog();
  } catch (error) {
    alert("Error al guardar el libro: " + error);
  }
}

const hideCatalog = (): void => {
  bookList.innerHTML = "";
  showCatalogBttn.style.display = "inline-block";
  closeCatalogBttn.style.display = "none";
};

window.addEventListener("scroll", handleStickyHeader);

addBookBttn.addEventListener("click", () => isBookFormEnabled(true));
closeBookFormBttn.addEventListener("click", () => isBookFormEnabled(false));
addBookForm.addEventListener("submit", handleFormSubmit);
showCatalogBttn.addEventListener("click", showCatalog);
closeCatalogBttn.addEventListener("click", hideCatalog);
