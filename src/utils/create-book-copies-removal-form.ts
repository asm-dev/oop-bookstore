export const createBookCopiesRemovalForm = (
  copies: number
): HTMLFormElement => {
  const form = document.createElement("form") as HTMLFormElement;
  form.id = "deleteBookUnitsForm";
  const label = document.createElement("label") as HTMLLabelElement;
  label.htmlFor = "unitsToDelete";
  label.textContent = "Por favor selecciona cuantas unidades quieres borrar:";
  const input = document.createElement("input");
  input.type = "number";
  input.id = "unitsToDelete";
  input.name = "unitsToDelete";
  input.min = "1";
  input.max = `${copies}`;
  input.placeholder = `Introduce un número del 1 al ${copies}`;
  input.required = true;
  form.appendChild(label);
  form.appendChild(input);

  return form;
};
