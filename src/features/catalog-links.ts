import { AuthRequired } from "../decorators";
import { createLink } from "../utils/create-link";

export class CatalogLinks {
  @AuthRequired(true)
  public static createEditLink(action: Function): HTMLAnchorElement {
    return createLink(action, "Editar", "catalog-link-add");
  }

  @AuthRequired(true)
  public static createDeleteLink(action: Function): HTMLAnchorElement {
    return createLink(action, "Eliminar", "catalog-link-delete");
  }

  @AuthRequired()
  public static createBorrowLink(action: Function): HTMLAnchorElement {
    return createLink(action, "Tomar prestado", "catalog-link-borrow");
  }

  @AuthRequired()
  public static createReturnLink(action: Function): HTMLAnchorElement {
    return createLink(action, "Devolver", "catalog-link-return");
  }
}
