import { UserRepositoryService } from "../domain/user/service/user-repository";

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

const displayUserName = (username: string): void => {
  const container = document.createElement("div");
  const span = document.createElement("span");
  span.textContent = username;
  container.appendChild(span);
  container.classList.add("username");
  loginButton.replaceWith(container);
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
      displayUserName(user.name);
      sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
    } else {
      alert("Credenciales incorrectas.");
    }
  } catch (error) {
    alert("Error al intentar iniciar sesión");
  }
});

createUserButton.addEventListener("click", () => {
  alert("Pendiente de implementación");
});

loginButton.addEventListener("click", showLoginPopup);
closePopupButton.addEventListener("click", closeLoginPopup);
popupOverlay.addEventListener("click", closeLoginPopup);
