import { User } from "../user";

export interface UserRepository {
  addUser(user: User): void;
  getUserById(userId: string): User | undefined;
}
