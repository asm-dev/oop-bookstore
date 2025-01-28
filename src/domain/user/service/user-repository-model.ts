import { User } from "../user";

export interface UserRepositoryModel {
  addUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  login(email: string, password: string): Promise<User | undefined>;
}
