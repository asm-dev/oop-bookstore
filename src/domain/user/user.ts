import { v4 as uuidv4 } from "uuid";
import { Email, validateEmail } from "../../types/email-type";
import { UserModel } from "./user-model";

export class User implements UserModel {
  public readonly id: string;
  public readonly registrationDate: Date;

  constructor(
    public name: string,
    public email: Email,
    public password: string,
    registrationDate?: Date
  ) {
    this.id = uuidv4();
    this.registrationDate = registrationDate || new Date();
  }

  public static create(name: string, email: string, password: string): User {
    return new User(name, validateEmail(email), password);
  }
}

export class UserAdmin extends User {
  constructor(name: string, email: string, password: string) {
    super(name, validateEmail(email), password);
  }
}
