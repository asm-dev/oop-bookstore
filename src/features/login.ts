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

// Muestra el popup de login
export const showLoginPopup = (): void => {
  loginPopup.classList.remove("hidden");
  popupOverlay.classList.remove("hidden");
};

// Cierra el popup de login
const closeLoginPopup = (): void => {
  loginPopup.classList.add("hidden");
  popupOverlay.classList.add("hidden");
};

// Función para crear el contenedor con el nombre de usuario y el botón de logout
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
    location.reload(); // Recargar la página para reflejar el cambio
  });

  // Añadir el nombre de usuario y el botón de logout al contenedor
  container.appendChild(usernameSpan);
  container.appendChild(logoutButton);

  // Reemplazar el loginButton por el contenedor con username y logout
  loginButton.replaceWith(container);
};

// Función para manejar el estado de autenticación
const checkAuthentication = (): void => {
  const storedUser = sessionStorage.getItem("authenticatedUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    displayUserNameAndLogoutButton(user.name); // Mostrar el nombre y el botón de logout
  } else {
    // Si no hay usuario autenticado, el botón permanece como "Iniciar sesión"
    loginButton.textContent = "Iniciar sesión";
  }
};

// Llama a checkAuthentication al cargar la página
document.addEventListener("DOMContentLoaded", checkAuthentication);

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
      displayUserNameAndLogoutButton(user.name); // Mostrar nombre y logout
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

// Abrir el popup de login
loginButton.addEventListener("click", showLoginPopup);

// Cerrar el popup de login
closePopupButton.addEventListener("click", closeLoginPopup);
popupOverlay.addEventListener("click", closeLoginPopup);
