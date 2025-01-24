import { Email } from "../../types/email-type";

export interface UserModel {
  id: string;
  name: string;
  email: Email;
  password: string;
  dateOfBirth: Date;
  registrationDate: Date;
  isAdmin: boolean;
}
