import { User } from "../user";
import { ApplicationError } from "../../../types/application-error";
import { API_ENDPOINTS } from "../../../config/api-endpoints";

export interface UserRepositoryModel {
  addUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  login(email: string, password: string): Promise<User | undefined>;
}

const API_URL = API_ENDPOINTS.USERS;
export class UserRepositoryService implements UserRepositoryModel {
  public async addUser(user: User): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error(ApplicationError.SAVE_USER);
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    const response = await fetch(`${API_URL}/${userId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(ApplicationError.GET_USER_BY_ID);
    }

    const user = await response.json();

    return new User(
      user.name,
      user.email,
      user.password,
      user.dateOfBirth,
      user.registrationDate,
      user.isAdmin
    );
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const response = await fetch(`${API_URL}/${email}`);

      if (!response.ok) {
        if (response.status === 404) {
          console.error(`${ApplicationError.GET_USER_BY_EMAIL}`);
        }
        throw new Error(ApplicationError.GET_USER_BY_EMAIL);
      }

      const user = await response.json();

      return new User(
        user.name,
        user.email,
        user.password,
        new Date(user.dateOfBirth),
        new Date(user.registrationDate),
        user.isAdmin
      );
    } catch (error) {
      throw error;
    }
  }

  public async login(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const user = await this.getUserByEmail(email);
      if (user && user.password === password) {
        return user;
      }
    } catch (error) {
      console.error(`${ApplicationError.LOGIN}: ${error}`);
    }
  }
}
