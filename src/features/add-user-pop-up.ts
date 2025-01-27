import { User } from "../domain/user/user";
import { UserRepositoryService } from "../domain/user/service/user-repository";
import { validateEmail } from "../types/email-type";
import { OperationSuccess } from "../types/operation-sucess";
import { ApplicationError } from "../types/application-error";
import { hideElement } from "../utils/toggle-visibility";

let isFormOpen = false;

const userRepo = new UserRepositoryService();

const overlay = document.getElementById("popupOverlay") as HTMLDivElement;

const createFormContainer = (): HTMLDivElement => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("popup");
  return formContainer;
};

const createForm = (): HTMLFormElement => {
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

  const submitButtonContainer = document.createElement("div");
  const submitButton = document.createElement("button");
  submitButton.classList.add("primary-button");
  submitButton.type = "submit";
  submitButton.textContent = "Crear usuario";
  submitButtonContainer.appendChild(submitButton);

  form.append(
    nameInput,
    emailInput,
    passwordInput,
    dateOfBirthInput,
    isAdminLabel,
    isAdminInput,
    submitButtonContainer
  );

  return form;
};

const createCloseButton = (
  formContainer: HTMLDivElement
): HTMLButtonElement => {
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-icon-button");
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    formContainer.remove();
    isFormOpen = false;
    hideElement(overlay);
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
    hideElement(overlay);
  }
};

export const createUserForm = (): HTMLDivElement => {
  if (isFormOpen) return;

  isFormOpen = true;

  const formContainer = createFormContainer();
  const form = createForm();
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
