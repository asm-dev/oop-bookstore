import { Email, validateEmail } from "../types/email-type";

export interface UserModel {
  name: string;
  email: Email;
  registrationDate: Date;
}

export class User implements UserModel {
  public registrationDate: Date;

  constructor(
    public name: string,
    public email: Email,
    registrationDate?: Date
  ) {
    this.registrationDate = registrationDate || new Date();
  }

  public static create(name: string, email: string): User {
    return new User(name, validateEmail(email), new Date());
  }
}
