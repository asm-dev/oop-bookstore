import { API_ENDPOINTS } from "../../../config/api-endpoints";
import { Loading } from "../../../decorators";
import { ApplicationError } from "../../../types/application-error";
import { Loan } from "../loan";
import { LoanLogModel } from "./loan-log-model";

const API_URL = API_ENDPOINTS.LOANS;

export class LoanLogService implements LoanLogModel {
  @Loading
  public async addLoan(loan: Loan): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loan),
    });

    if (!response.ok) throw new Error(ApplicationError.ADD_LOAN);
  }

  @Loading
  public async getActiveLoansByUser(userId: string): Promise<Loan[]> {
    const response = await fetch(`${API_URL}?userId=${userId}`);

    if (!response.ok) throw new Error(ApplicationError.GET_ACTIVE_LOANS);

    const loans: Loan[] = await response.json();

    return loans.filter((loan) => !loan.returnDate);
  }

  @Loading
  public async deleteLoan(loanId: string): Promise<void> {
    const response = await fetch(`${API_URL}/${loanId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(ApplicationError.DELETE_LOAN);
  }

  @Loading
  public async returnBook(userId: string, bookId: string): Promise<void> {
    const response = await fetch(`${API_URL}/return`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        bookId: bookId,
        returnDate: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(ApplicationError.RETURN_BOOK);
  }
}
