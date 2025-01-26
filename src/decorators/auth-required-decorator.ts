import { isAdminUser, isUserAuthenticated } from "../utils/user-auth";

export function AuthRequired(requireAdmin: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!isUserAuthenticated()) {
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
      }

      if (requireAdmin && !isAdminUser()) {
        alert("No tienes permisos para realizar esta acción.");
        return;
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
