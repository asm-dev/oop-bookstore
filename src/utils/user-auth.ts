export const isUserAuthenticated = (): boolean => {
  return !!sessionStorage.getItem("authenticatedUser");
};

export const getStoredUser = (): string => {
  return sessionStorage.getItem("authenticatedUser");
};

export const isAdmin = (): boolean => {
  const storedUser = getStoredUser();
  const user = JSON.parse(storedUser);

  return user.isAdmin;
};
