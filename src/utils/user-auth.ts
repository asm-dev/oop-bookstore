import { User } from "../domain/user";

export const greetUser = (username: string): void =>
  alert(`Bienvenido ${username}`);

export const isUserAuthenticated = (): boolean => {
  return !!sessionStorage.getItem("authenticatedUser");
};

export const getStoredUser = (): User => {
  const user = sessionStorage.getItem("authenticatedUser");
  return JSON.parse(user);
};

export const isAdminUser = (): boolean => {
  const user = getStoredUser();

  if (user) {
    return user.isAdmin;
  } else {
    return false;
  }
};

export const storeUser = (user: User): void => {
  sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
};
