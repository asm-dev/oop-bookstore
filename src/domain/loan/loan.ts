import { v4 as uuidv4 } from "uuid";
import { ApplicationError } from "../../types/application-error";
import { User } from "../user/user";
import { Book } from "../book";
import { LoanModel } from "./loan-model";

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

  public static borrowBook(book: Book, user: User): Loan {
    book.borrow(1);
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
