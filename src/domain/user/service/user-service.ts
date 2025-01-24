import { validateEmail } from "../../../types/email-type";
import { User } from "../user";
import { UserRepository } from "./user-repository-contract";

export class UserService {
  constructor(private data: UserRepository) {}

  public async login(email: string, password: string): Promise<User | null> {
    const user = await this.data.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  public async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = new User(name, validateEmail(email), password);
    await this.data.addUser(user);
    return user;
  }
}
