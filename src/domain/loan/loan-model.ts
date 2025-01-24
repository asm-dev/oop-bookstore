export interface LoanModel {
  id: string;
  bookId: string;
  userId: string;
  loanDate: Date;
  returnDate?: Date;
}
