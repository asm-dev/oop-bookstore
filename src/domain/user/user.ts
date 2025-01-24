import { v4 as uuidv4 } from "uuid";
import { Email, validateEmail } from "../../types/email-type";
import { UserModel } from "./user-model";

export class User implements UserModel {
  public readonly id: string;
  public readonly registrationDate: Date;
  public readonly isAdmin: boolean;

  constructor(
    public name: string,
    public email: Email,
    public password: string,
    public dateOfBirth: Date,
    registrationDate?: Date,
    isAdmin: boolean = false
  ) {
    this.id = uuidv4();
    this.registrationDate = registrationDate || new Date();
    this.isAdmin = isAdmin;
  }

  public static create(
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date
  ): User {
    return new User(name, validateEmail(email), password, dateOfBirth);
  }
}

export class UserAdmin extends User {
  constructor(
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    registrationDate?: Date
  ) {
    super(
      name,
      validateEmail(email),
      password,
      dateOfBirth,
      registrationDate,
      true
    );
  }
}
