import { User } from "../domain/user/user";
import { UserRepositoryService } from "../domain/user/service/user-repository";
import { validateEmail } from "../types/email-type";
import { OperationSuccess } from "../types/operation-sucess";
import { ApplicationError } from "../types/application-error";

let isFormOpen = false;

const userRepo = new UserRepositoryService();

const createFormContainer = (): HTMLDivElement => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("add-user-form-container");

  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");
  formContainer.appendChild(overlay);

  return formContainer;
};

const createFormElements = (): HTMLFormElement => {
  const form = document.createElement("form");
  form.id = "addUserForm";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Nombre";
  nameInput.required = true;

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Correo electrónico";
  emailInput.required = true;

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.placeholder = "Contraseña (mínimo 5 caracteres)";
  passwordInput.required = true;

  const dateOfBirthInput = document.createElement("input");
  dateOfBirthInput.type = "date";
  dateOfBirthInput.name = "dateOfBirth";
  dateOfBirthInput.required = true;

  const isAdminInput = document.createElement("input");
  isAdminInput.type = "checkbox";
  isAdminInput.name = "isAdmin";
  const isAdminLabel = document.createElement("label");
  isAdminLabel.textContent = "¿Te gustaría tener permisos de administrador?";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Crear usuario";

  form.append(
    nameInput,
    emailInput,
    passwordInput,
    dateOfBirthInput,
    isAdminLabel,
    isAdminInput,
    submitButton
  );

  return form;
};

const createCloseButton = (
  formContainer: HTMLDivElement
): HTMLButtonElement => {
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    formContainer.remove();
    isFormOpen = false;
  });

  return closeButton;
};

const createUser = async (
  event: Event,
  nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  dateOfBirthInput: HTMLInputElement,
  isAdminInput: HTMLInputElement,
  form: HTMLFormElement
): Promise<void> => {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const dateOfBirth = new Date(dateOfBirthInput.value);
  const isAdmin = isAdminInput.checked;

  if (password.length < 5) {
    alert("La contraseña debe tener al menos 5 caracteres.");
    return;
  }

  try {
    const newUser = new User(
      name,
      validateEmail(email),
      password,
      dateOfBirth,
      new Date(),
      isAdmin
    );

    await userRepo.addUser(newUser);

    alert(`${OperationSuccess.CREATED_USER}`);
    form.reset();
  } catch (error) {
    alert(`${ApplicationError.CREATE_USER}`);
  } finally {
    isFormOpen = false;
  }
};

export const createUserForm = (): HTMLDivElement => {
  if (isFormOpen) return;

  isFormOpen = true;

  const formContainer = createFormContainer();
  const form = createFormElements();
  const closeButton = createCloseButton(formContainer);

  formContainer.appendChild(closeButton);
  formContainer.appendChild(form);
  document.body.appendChild(formContainer);

  form.addEventListener("submit", (event) =>
    createUser(
      event,
      form.querySelector('input[name="name"]') as HTMLInputElement,
      form.querySelector('input[name="email"]') as HTMLInputElement,
      form.querySelector('input[name="password"]') as HTMLInputElement,
      form.querySelector('input[name="dateOfBirth"]') as HTMLInputElement,
      form.querySelector('input[name="isAdmin"]') as HTMLInputElement,
      form
    )
  );

  return formContainer;
};
