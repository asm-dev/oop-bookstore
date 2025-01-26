import { UserRepositoryService } from "../domain/user/service/user-repository";
import { ApplicationError } from "../types/application-error";

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

export const showLoginPopup = (): void => {
  loginPopup.classList.remove("hidden");
  popupOverlay.classList.remove("hidden");
};

const closeLoginPopup = (): void => {
  loginPopup.classList.add("hidden");
  popupOverlay.classList.add("hidden");
};

const displayUserNameAndLogoutButton = (username: string): void => {
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
  });

  container.appendChild(usernameSpan);
  container.appendChild(logoutButton);

  loginButton.replaceWith(container);
};

const checkAuthentication = (): void => {
  const storedUser = sessionStorage.getItem("authenticatedUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    displayUserNameAndLogoutButton(user.name);
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
      alert(`Bienvenido ${user.name}`);
      closeLoginPopup();
      sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
      displayUserNameAndLogoutButton(user.name);
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

loginButton.addEventListener("click", showLoginPopup);
closePopupButton.addEventListener("click", closeLoginPopup);
popupOverlay.addEventListener("click", closeLoginPopup);

document.addEventListener("DOMContentLoaded", checkAuthentication);
