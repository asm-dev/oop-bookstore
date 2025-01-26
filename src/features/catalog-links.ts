import { AuthRequired } from "../decorators";
import { createLink } from "../utils/create-link";

export class CatalogLinks {
  @AuthRequired(true)
  public static createEditLink(cb: Function): HTMLAnchorElement {
    return createLink(cb, "Editar", "catalog-link-add");
  }

  @AuthRequired(true)
  public static createDeleteLink(cb: Function): HTMLAnchorElement {
    return createLink(cb, "Eliminar", "catalog-link-delete");
  }
}
