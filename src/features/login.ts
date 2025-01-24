import { UserRepositoryImpl } from "../domain/user/service/user-repository";
import { UserService } from "../domain/user/service/user-service";

const loginPopup = document.getElementById("loginPopup") as HTMLDivElement;
const popupOverlay = document.getElementById("popupOverlay") as HTMLDivElement;
const loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
const loginPassword = document.getElementById(
  "loginPassword"
) as HTMLInputElement;
const loginSubmit = document.getElementById("loginSubmit") as HTMLButtonElement;
const createUserButton = document.getElementById(
  "createUserButton"
) as HTMLButtonElement;

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

export const showLoginPopup = () => {
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const popupOverlay = document.getElementById("popupOverlay") as HTMLElement;

  if (loginPopup && popupOverlay) {
    loginPopup.classList.remove("hidden");
    popupOverlay.classList.remove("hidden");
  }
};

const closeLoginPopup = () => {
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const popupOverlay = document.getElementById("popupOverlay") as HTMLElement;

  if (loginPopup && popupOverlay) {
    loginPopup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
  }
};

loginSubmit.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const user = await userService.login(email, password);
    if (user) {
      alert(`Bienvenido ${user.name}`);
      closeLoginPopup();
    } else {
      alert("Credenciales incorrectas.");
    }
  } catch (error) {
    alert("Error al intentar iniciar sesión");
  }
});

createUserButton.addEventListener("click", () => {
  const name = prompt("Ingresa tu nombre");
  const email = prompt("Ingresa tu correo electrónico");
  const password = prompt("Ingresa tu contraseña");

  if (name && email && password) {
    userService
      .registerUser(name, email, password)
      .then((user) => {
        alert(`Usuario creado exitosamente: ${user.name}`);
        closeLoginPopup();
      })
      .catch((error) => {
        alert("Error al crear el usuario");
      });
  }
});

const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
loginButton.addEventListener("click", showLoginPopup);

const closePopupButton = document.getElementById(
  "closeLoginPopup"
) as HTMLButtonElement;
closePopupButton.addEventListener("click", closeLoginPopup);

popupOverlay.addEventListener("click", closeLoginPopup);
