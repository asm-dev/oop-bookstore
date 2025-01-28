import { BookModel } from "./book-model";
import { v4 as uuidv4 } from "uuid";
import { ApplicationError } from "../../types/application-error";

export class Book implements BookModel {
  constructor(
    public title: string,
    public author: string,
    public year: number,
    public copiesAvailable: number,
    public genre?: string,
    public readonly id: string = uuidv4()
  ) {
    if (copiesAvailable < 0) {
      throw new Error(ApplicationError.MINIMUM_COPY);
    }
  }

  public borrow(copiesToDelete: number): void {
    if (this.copiesAvailable <= 0) {
      throw new Error(ApplicationError.NO_COPIES_AVAILABLE);
    }
    const remainingCopies = this.copiesAvailable - copiesToDelete;
    this.copiesAvailable = remainingCopies;
  }

  public returnCopy(): void {
    this.copiesAvailable++;
  }

  public static fromJSON(json: Partial<Book>): Book {
    return new Book(
      json.title ?? "",
      json.author ?? "",
      json.year ?? 0,
      json.copiesAvailable ?? 0,
      json.genre,
      json.id ?? uuidv4()
    );
  }
}
