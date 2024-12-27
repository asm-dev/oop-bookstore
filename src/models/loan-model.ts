import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { User } from "./user-model";
import { Book } from "./book-model";
import { ApplicationError } from "../types/application-error";
export interface LoanModel {
  id: string;
  bookId: string;
  userId: string;
  loanDate: Date;
  returnDate?: Date;
}

export class Loan implements LoanModel {
  public readonly id: string;
  public readonly loanDate: Date;
  public returnDate?: Date;

  constructor(
    public bookId: string,
    public userId: string,
    loanDate?: Date,
    returnDate?: Date
  ) {
    this.id = uuidv4();
    this.loanDate = loanDate || new Date();
    this.returnDate = returnDate;
  }

  public static create(book: Book, user: User): Loan {
    book.borrowCopy();
    return new Loan(book.id, user.id);
  }

  public returnBook(book: Book): void {
    if (this.returnDate) {
      throw new Error(ApplicationError.ALREADY_RETURNED);
    }
    this.returnDate = new Date();
    book.returnCopy();
  }
}
