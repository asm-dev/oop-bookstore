# Aplicación para la gestión de una librería digital

Esta aplicación está diseñada para ilustrar principios clave de la Programación Orientada a Objetos (POO) tales como encapsulamiento, herencia y polimorfismo en un contexto práctico. Para realizar este proyecto he creado un ecosistema sencillo de Front y Back utilizando Node, ExpressJS y Typescript con Webpack.

## Ejecución

1. Clone
2. npm i
3. En una terminal inicializamos el Back: npm run start-server
4. En otra servimos el Front: npm run launch

## Notas sobre el desarrollo

* *¿Qué me hubiera gustado hacer al arrancar el proyecto pero no hice?*: seguir una arquitectura "screaming" y TDD. Este enfoque hubiera reducido sustancialmente el número de pruebas necesarias durante el desarrollo. 
* *¿Ha habido algún acierto?*: pensar primero y codificar después, planteando desde el inicio una estructura de módulos y clases fácil de entender y replicar, ya que ha permitido bastante escabilidad y facilidad de implementación de nuevas funcionalidades.
* *¿Algo que me gustaría hacer en el futuro?*: iterar para mejorar la UI, permitiendo nuevas funcionalidades, como por ejemplo permitir a los usuarios tomar prestado y devolver más de una unidad de libros.

### Detalles de la entrega

Actividad del máster, módulo de Programación en Javascript y Typescript

Configura el entorno de desarrollo para TypeScript siguiendo las mejores prácticas
(archivo tsconfig.json bien configurado).
▪ Usa TypeScript.
▪ Utiliza tipos básicos, interfaces y clases para definir la estructura de datos de la
aplicación.
▪ Implementar clases que respeten los principios de encapsulación, herencia y
poliformismo.
▪ Utilizar interfaces para definir contratos en los métodos principales de la
aplicación.
▪ Implentar clases que respeten los principios de encapsulación, herencia y
poliformismo.
▪ Utiliza interfaces para definir los contratos en los métodos principales de la
aplicación.
▪ Control de acceso y decoradores:
o Implementa control de acceso para las propiedades y métodos de las clases,
utilizando modificadores de acceso (public, private, protected).
o Crear y aplicar al menos un decorador personalizado para alguna de las
funcionalidades de la aplicación. 

## Ejemplo de ejecución

Acciónes permitidas a los usuarios (tabla):

1. Gestionar Libros.
2. Añadir nuevos libros con información como título, autor, año de publicación,
género y número de copias disponibles.
3. Modificar información de un libro existente.
4. Eliminar un libro del catálogo.
5. Gestionar usuarios.
6. Registrar nuevos usuarios con información básica (nombre, correo electrónico,
fecha de nacimiento).
7. Realizar préstamos:
a. Permitir a un usuario tomar prestado un libro, reduciendo el número de copias
disponibles.
b. Registrar fecha de préstamo y fecha de devolución.
c. Impedir que un usuario tome prestado un libro si no hay copias disponibles
d. Permitir la devolución de un libro y actualizar el número de copias disponibles.
