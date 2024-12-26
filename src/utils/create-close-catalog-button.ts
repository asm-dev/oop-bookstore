export const createCloseCatalogButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = "closeCatalogBttn";
  button.textContent = "Cerrar el catálogo";
  button.style.display = "none";

  return button;
};
