import { Loan } from "../../models/loan-model";

export interface LoanRepository {
  addLoan(loan: Loan): void;
  getLoansByUserId(userId: string): Loan[];
  returnLoan(loanId: string): void;
}
