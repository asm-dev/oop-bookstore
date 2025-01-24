import { Email } from "../../types/email-type";

export interface UserModel {
  id: string;
  name: string;
  email: Email;
  password: string;
  registrationDate: Date;
}
