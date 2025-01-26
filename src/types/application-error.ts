export enum ApplicationError {
  ADD_BOOK = "No se ha podido añadir el libro",
  ALREADY_RETURNED = "El libro ya ha sido retornado",
  CREATE_USER = "Se ha producido un error al crear el usuario",
  DELETE_BOOK = "Error al eliminar el libro",
  GET_BOOK = "No ha podido obtenerse el libro",
  GET_BOOKS = "Ha habido un problema en la obtención del catálogo de libros",
  GET_USER_BY_EMAIL = "Se ha producido un error al buscar el usuario por email",
  GET_USER_BY_ID = "Error al buscar la id de usuario",
  LOAD_CATALOG = "Error al recuperar el diálogo",
  LOGIN = "Error en el login",
  MINIMUM_COPY = "Para registrar un nuevo libro es necesario disponer de una copia como mínimo",
  NOT_FOUND = "No encontrado",
  NO_COPIES_AVAILABLE = "No hay copias disponibles",
  SAVE_BOOK = "Se ha producido un error al guardar el libro",
  SAVE_COPIES = "Error al actualizar las copias disponibles",
  SAVE_USER = "No hemos podido guardar el usuario",
  UPDATE_BOOK = "Ha habido un error al actualizar el libro",
  WRONG_CREDENTIALS = "Credenciales incorrectas",
}
