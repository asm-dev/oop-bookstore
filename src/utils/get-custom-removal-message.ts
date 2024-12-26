import { Book } from "../models/book-model";

export const getCustomRemovalMessage = (book: Book): string =>
  `¿Estás seguro de que quieres eliminar el libro "${
    book.title
  }"? Actualmente hay ${book.copiesAvailable} ${
    book.copiesAvailable === 1 ? "copia disponible." : "copias disponibles."
  }`;
