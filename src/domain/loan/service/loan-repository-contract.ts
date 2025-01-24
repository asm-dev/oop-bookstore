import { Loan } from "../model/loan-model";

export interface LoanRepository {
  addLoan(loan: Loan): void;
  getLoansByUserId(userId: string): Loan[];
  returnLoan(loanId: string): void;
}
