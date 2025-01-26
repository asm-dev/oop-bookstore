export function AuthRequired(requireAdmin: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const storedUser = sessionStorage.getItem("authenticatedUser");

      if (!storedUser) {
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (requireAdmin && !user.isAdmin) {
        alert("No tienes permisos para realizar esta acción.");
        return;
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
