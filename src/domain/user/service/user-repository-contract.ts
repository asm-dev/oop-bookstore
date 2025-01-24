import { User } from "../model/user-model";

export interface UserRepository {
  addUser(user: User): void;
  getUserById(userId: string): User | undefined;
}
