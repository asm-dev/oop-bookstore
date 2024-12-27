import { User } from "../../models/user-model";

export interface UserRepository {
  addUser(user: User): void;
  getUserById(userId: string): User | undefined;
}
