import { v4 as uuidv4 } from "uuid";
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
}
