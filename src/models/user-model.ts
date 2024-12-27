import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { Email, validateEmail } from "../types/email-type";
import { Book } from "./book-model";

export interface UserModel {
  id: UUIDTypes;
  name: string;
  email: Email;
  registrationDate: Date;
}
export class User implements UserModel {
  public readonly id: string;
  public readonly registrationDate: Date;

  constructor(
    public name: string,
    public email: Email,
    registrationDate?: Date
  ) {
    this.id = uuidv4();
    this.registrationDate = registrationDate || new Date();
  }

  public static create(name: string, email: string): User {
    return new User(name, validateEmail(email));
  }
}

export class UserAdmin extends User {
  constructor(name: string, email: string) {
    super(name, validateEmail(email));
  }

  public createBook(
    title: string,
    author: string,
    year: number,
    copiesAvailable: number,
    genre?: string
  ): Book {
    // TODO: check if needed
    return new Book(title, author, year, copiesAvailable, genre);
  }

  public removeBook(book: Book): void {
    // TODO: el book service
  }
}
