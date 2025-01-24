import { v4 as uuidv4 } from "uuid";
import { Email, validateEmail } from "../../types/email-type";
import { UserModel } from "./user-model";

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
    // #TODO: el email deberia validarse en el constructor de la clase
    return new User(name, validateEmail(email));
  }
}

export class UserAdmin extends User {
  // #TODO: revisar
  constructor(name: string, email: string) {
    super(name, validateEmail(email));
  }
}
