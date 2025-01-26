import { UserRepositoryService } from "../domain/user/service/user-repository";
import { ApplicationError } from "../types/application-error";
import { toggleAddButtonVisibility } from "../utils/toggle-add-book-button-visibility";
import {
  getStoredUser,
  greetUser,
  isUserAuthenticated,
  storeUser,
} from "../utils/user-auth";

const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
const loginPopup = document.getElementById("loginPopup") as HTMLDivElement;
const loginSubmit = document.getElementById("loginSubmit") as HTMLButtonElement;
const popupOverlay = document.getElementById("popupOverlay") as HTMLDivElement;
const loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
const loginPassword = document.getElementById(
  "loginPassword"
) as HTMLInputElement;
const closePopupButton = document.getElementById(
  "closeLoginPopup"
) as HTMLButtonElement;
const createUserButton = document.getElementById(
  "createUserButton"
) as HTMLButtonElement;

const userData = new UserRepositoryService();

export const onLoginButtonClick = (): void => {
  loginPopup.classList.remove("hidden");
  popupOverlay.classList.remove("hidden");
};

const closeLoginPopup = (): void => {
  loginPopup.classList.add("hidden");
  popupOverlay.classList.add("hidden");
};

const displayUserAndLogout = (username: string): void => {
  const container = document.createElement("div");
  container.classList.add("user-info-container");

  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = username;
  usernameSpan.classList.add("username");

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Cerrar sesión";
  logoutButton.classList.add("logout-button");

  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("authenticatedUser");
    location.reload();
    toggleAddButtonVisibility();
  });

  container.appendChild(usernameSpan);
  container.appendChild(logoutButton);

  loginButton.replaceWith(container);
};

const handleAuth = (): void => {
  if (isUserAuthenticated()) {
    const user = getStoredUser();
    displayUserAndLogout(user.name);
  } else {
    loginButton.textContent = "Iniciar sesión";
  }
};

loginSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const user = await userData.login(email, password);
    if (user) {
      greetUser(user.name);
      storeUser(user);
      closeLoginPopup();
      displayUserAndLogout(user.name);
      toggleAddButtonVisibility();
    } else {
      alert(`${ApplicationError.WRONG_CREDENTIALS}`);
    }
  } catch (error) {
    alert(`${ApplicationError.LOGIN}`);
  }
});

createUserButton.addEventListener("click", () => {
  alert("Pendiente de implementación");
});

loginButton.addEventListener("click", onLoginButtonClick);
closePopupButton.addEventListener("click", closeLoginPopup);
popupOverlay.addEventListener("click", closeLoginPopup);

document.addEventListener("DOMContentLoaded", handleAuth);
