# Aplicación para la gestión de una librería digital

Esta aplicación está diseñada para ilustrar principios clave de la Programación Orientada a Objetos (POO) tales como encapsulamiento, herencia y polimorfismo en un contexto práctico. Para realizar este proyecto he creado un ecosistema sencillo de Front y Back utilizando Node, ExpressJS y Typescript con Webpack.

&nbsp;

## Ejecución

1. **Clona** este repositorio en tu máquina
2. Instalamos paquetes y **dependencias** `npm i`
3. En una terminal levantamos el **servidor**: `npm run start-server`
4. En otra servimos el **front**: `npm run launch`. Esto desplegará la página en nuestro navegador por defecto.
5. (_Opcional_) Puedes iniciar sesión con el email de usuario "user@example.com" y la contraseña "potato", o si quisieras tener permiso admin utiliza el email "admin@example.com" y la contraseña "admin". Si no, siempre puedes crear un usuario nuevo desde el botón de la esquina superior derecha "iniciar sesión".

&nbsp;

## Notas sobre el desarrollo

* *¿Qué me hubiera gustado hacer al arrancar el proyecto pero no hice?* 

  Seguir una arquitectura "screaming" y, sobre todo, TDD. Este enfoque hubiera reducido sustancialmente el número de pruebas necesarias durante el desarrollo. 

* *¿Ha habido algún acierto?*
  
  Pensar primero y codificar después, planteando desde el inicio una estructura de módulos y clases fácil de entender y replicar, ya que ha permitido bastante escabilidad y facilidad de implementación de nuevas funcionalidades.

* *¿Algo que me gustaría hacer en el futuro?*.
 
  Iterar para mejorar la UI, permitiendo nuevas funcionalidades, como por ejemplo poder tomar prestado y devolver más de una unidad de libros. Además, me gustaría agregar un linter para asegurar la calidad del código.

&nbsp;

### Detalles de la entrega

La realización de este proyecto se relaciona con la entrega de una actividad del máster de Desarrollo Web y Aplicaciones de la UAM. El foco principal de esta actividad está en el uso de mejores prácticas de un entorno de desarrollo con Typescript. Por ello, he procurado seguir principios de código limpio y de POO en todo momento. Se traduce en lo siguiente:

- *Configuración idónea de Typescript*. Usamos los mejores settings del `tsconfig.json` para el proyecto, y nos apoyamos en Webpack para facilitar la transpilación.
- *Empleo de tips, interfaces y clases*. La estructura de datos de la aplicación se define desde `domain` pasando por `features` hasta el servidor. Aprovechamos las posibilidades que nos da TypeScript para estructurar bien la comunicación entre las diferentes partes del sistema.
- *Respeto de principios de Programación Orientada a Objetos*. Estos son encapsulación, herencia y polimorfismo. Pueden encontrarse muchos ejemplos en el código, por ejemplo, la herencia de UserAdmin a partir de User.
- *Utilización de interfaces para definir contratos*. En los `service` tanto de Loan, Book como User se generan interfaces para asegurar la estructura de dichos servicios.
- *Uso de decoradores personalizados*. `loading` permite marcar el inicio y fin de procesos asíncronos, y `user-auth` controlar el acceso a ciertos métodos en función del rol o nivel de permisos del usuario.

&nbsp;

## Uso

*Gestión de libros* 

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Navegación del catálogo | Todos |
Agregar nuevos libros | Admin | 
Modificar información de libro existente | Admin | 
Eliminar un libro del catálogo | Admin |

*Gestión de usuarios*

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Login | Todos
Logout | Todos
Registrar nuevos usuarios | Todos

*Gestión de préstamos*

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Tomar prestado un libro | Usuario registrado regular | Se reduce el número de copias, , Se impide el préstamo cuando no hay copias disponibles
Devolver un libro | Usuario registrado regular | Sólo se devuelven los libros prestados por el usuario, , se reduce el número de copias disponibles
