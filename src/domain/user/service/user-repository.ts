import { User } from "../user";
import { UserRepository } from "./user-repository-contract";

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
