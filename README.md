# Digital bookstore management application

This application is designed to illustrate key principles of Object-Oriented Programming (OOP), such as encapsulation, inheritance and polymorphism, in a practical context. For this project I built a simple Front and Back ecosystem using Node, ExpressJS and Typescript with Webpack.

&nbsp;

## Running the app

1. **Clone** this repository to your machine
2. Install packages and **dependencies** `npm i`
3. In one terminal, start the **server**: `npm run start-server`
4. In another, serve the **front end**: `npm run launch`. This will open the page in our default browser.
5. (_Optional_) You can log in with the user email "user@example.com" and the password "potato", or, if you want admin permissions, use the email "admin@example.com" and the password "admin". Otherwise, you can always create a new user from the "log in" button in the top right corner.

&nbsp;

## Development notes

* *What would I have liked to do when starting the project but didn't?* 

  Follow a "screaming" architecture and, above all, TDD. This approach would have substantially reduced the number of tests needed during development. 

* *Was there anything that went well?*
  
  Thinking first and coding afterwards, setting out from the start a structure of modules and classes that is easy to understand and replicate, since it has allowed for a lot of scalability and made it easy to implement new features.

* *Anything I'd like to do in the future?*.
 
  Iterate to improve the UI, allowing new features, such as being able to borrow and return more than one copy of a book at a time. I would also like to add a linter to ensure code quality.

&nbsp;

### Submission details

This project is related to the submission of an assignment for the UAM Master's in Web Development and Applications. The main focus of this assignment is the use of best practices in a Typescript development environment. For that reason, I have tried to follow clean code and OOP principles at all times. This translates into the following:

- *Ideal Typescript configuration*. We use the best `tsconfig.json` settings for the project, and rely on Webpack to ease transpilation.
- *Use of types, interfaces and classes*. The application's data structure is defined from `domain`, through `features`, all the way to the server. We take advantage of the possibilities TypeScript gives us to properly structure the communication between the different parts of the system.
- *Adherence to Object-Oriented Programming principles*. Many examples can be found in the code, for instance, UserAdmin inheriting from User.
- *Use of interfaces to define contracts*. In the `service` of Loan, Book and User, interfaces are created to ensure the structure of those services.
- *Use of custom decorators*. `loading` marks the start and end of asynchronous processes, and `user-auth` controls access to certain methods depending on the user's role or permission level.

&nbsp;

## Usage

&nbsp;

### Book management

Action | Authorized user | Notes  
:-------------------------:|:-------------------------:|:-------------------------:
Browsing the catalog | Everyone | ![image](https://github.com/user-attachments/assets/616236c2-5e7c-4ae2-891d-95d6686652e9)
Adding new books | Admin | ![image](https://github.com/user-attachments/assets/43afab4c-deca-459d-a7f1-55e6585ca85b) ![image](https://github.com/user-attachments/assets/d62d1815-d5e0-46c7-b379-56b0fb40ea77)
Editing existing book information | Admin | ![image](https://github.com/user-attachments/assets/c231fd4a-8f6a-485c-b913-551ec2eff8f8)
Removing a book from the catalog | Admin | ![image](https://github.com/user-attachments/assets/f347c257-6e72-4686-a98b-a3074a850c19) ![image](https://github.com/user-attachments/assets/19a63024-115a-4147-a14a-0b5fdf4a5ddb) ![image](https://github.com/user-attachments/assets/bd20176b-2cbf-427f-aed0-b067d9c60666)

&nbsp;

### User management

Action | Authorized user | Notes  
:-------------------------:|:-------------------------:|:-------------------------:
Login | Everyone |  ![image](https://github.com/user-attachments/assets/220de89e-4ae2-4b71-a6ef-8d6e16e7f2ac) Once entered, the credentials are validated on the server. If they are correct, the user can log in 
Logout | Everyone | ![image](https://github.com/user-attachments/assets/d0ce1f79-d5b7-4d81-9909-6235a9288c39)
Registering new users | Everyone | ![image](https://github.com/user-attachments/assets/c7fd3383-787d-4d84-add9-97b6b3c8364d)

&nbsp;

### Loan management

Action | Authorized user | Notes  
:-------------------------:|:-------------------------:|:-------------------------:
Borrowing a book | Regular registered user |  ![image](https://github.com/user-attachments/assets/cff1bba9-4dde-4f94-ba01-fe43ce092866) The number of copies is reduced ![image](https://github.com/user-attachments/assets/fdf3f244-e87a-4d76-aadc-0b3debc75624) Borrowing is prevented when no copies are available ![image](https://github.com/user-attachments/assets/5055363e-671d-4b00-9ac7-8e0189488ed2)
Returning a book | Regular registered user | Only books borrowed by the user can be returned, increasing their copies once returned ![image](https://github.com/user-attachments/assets/345debaa-6516-4917-bd9b-20ce9a3e3d0d)
