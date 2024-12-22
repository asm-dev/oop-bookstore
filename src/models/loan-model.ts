import { Book } from "./book-model";
import { User } from "./user-model";

export class Loan {
  constructor(
    public book: Book,
    public user: User,
    public loanDate: Date,
    public returnDate: Date
  ) {}
}
