export function Loading(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    console.log("Cargando...");

    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } finally {
      console.log("Proceso terminado");
    }
  };

  return descriptor;
}
