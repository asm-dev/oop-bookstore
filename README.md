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
- *Respeto de principios de Programación Orientada a Objetos*. Pueden encontrarse muchos ejemplos en el código, por ejemplo, la herencia de UserAdmin a partir de User.
- *Utilización de interfaces para definir contratos*. En los `service` tanto de Loan, Book como User se generan interfaces para asegurar la estructura de dichos servicios.
- *Uso de decoradores personalizados*. `loading` permite marcar el inicio y fin de procesos asíncronos, y `user-auth` controlar el acceso a ciertos métodos en función del rol o nivel de permisos del usuario.

&nbsp;

## Uso

&nbsp;

### Gestión de libros

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Navegación del catálogo | Todos | ![image](https://github.com/user-attachments/assets/616236c2-5e7c-4ae2-891d-95d6686652e9)
Agregar nuevos libros | Admin | ![image](https://github.com/user-attachments/assets/43afab4c-deca-459d-a7f1-55e6585ca85b) ![image](https://github.com/user-attachments/assets/d62d1815-d5e0-46c7-b379-56b0fb40ea77)
Modificar información de libro existente | Admin | ![image](https://github.com/user-attachments/assets/c231fd4a-8f6a-485c-b913-551ec2eff8f8)
Eliminar un libro del catálogo | Admin | ![image](https://github.com/user-attachments/assets/f347c257-6e72-4686-a98b-a3074a850c19) ![image](https://github.com/user-attachments/assets/19a63024-115a-4147-a14a-0b5fdf4a5ddb) ![image](https://github.com/user-attachments/assets/bd20176b-2cbf-427f-aed0-b067d9c60666)

&nbsp;

### Gestión de usuarios

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Login | Todos |  ![image](https://github.com/user-attachments/assets/220de89e-4ae2-4b71-a6ef-8d6e16e7f2ac)
Una vez instroducidas, se validan las credenciales en el servidor. Si son correctas, el usuario puede acceder 
Logout | Todos | ![image](https://github.com/user-attachments/assets/d0ce1f79-d5b7-4d81-9909-6235a9288c39)
Registrar nuevos usuarios | Todos | ![image](https://github.com/user-attachments/assets/c7fd3383-787d-4d84-add9-97b6b3c8364d)

&nbsp;

### Gestión de préstamos

Acción | Usuario habilitado | Notas  
:-------------------------:|:-------------------------:|:-------------------------:
Tomar prestado un libro | Usuario registrado regular |  ![image](https://github.com/user-attachments/assets/cff1bba9-4dde-4f94-ba01-fe43ce092866) Se reduce el número de copias ![image](https://github.com/user-attachments/assets/fdf3f244-e87a-4d76-aadc-0b3debc75624) Se impide el préstamo cuando no hay copias disponibles ![image](https://github.com/user-attachments/assets/5055363e-671d-4b00-9ac7-8e0189488ed2)
Devolver un libro | Usuario registrado regular | Sólo se devuelven los libros prestados por el usuario, aumentando sus copias una vez devueltos ![image](https://github.com/user-attachments/assets/345debaa-6516-4917-bd9b-20ce9a3e3d0d)
