export enum ApplicationError {
  ADD_BOOK = "No se ha podido añadir el libro",
  ALREADY_RETURNED = "El libro ya ha sido retornado",
  DELETE_BOOK = "Error al eliminar el libro",
  GET_BOOK = "No ha podido obtenerse el libro",
  GET_BOOKS = "Ha habido un problema en la obtención del catálogo de libros",
  LOAD_CATALOG = "Error al recuperar el diálogo",
  MINIMUM_COPY = "Para registrar un nuevo libro es necesario disponer de una copia como mínimo",
  NO_COPIES_AVAILABLE = "No hay copias disponibles",
  SAVE_BOOK = "Se ha producido un error al guardar el libro",
  SAVE_COPIES = "Error al actualizar las copias disponibles",
  UPDATE_BOOK = "Ha habido un error al actualizar el libro",
}
