import { Loan } from "../loan";

export interface LoanLogModel {
  addLoan(loan: Loan): Promise<void>;
  getActiveLoansByUser(userId: string): Promise<Loan[]>;
  deleteLoan(loanId: string): Promise<void>;
  returnBook(userId: string, bookId: string): Promise<void>;
}
