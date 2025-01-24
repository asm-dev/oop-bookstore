import { v4 as uuidv4 } from "uuid";
import { ApplicationError } from "../../../types/application-error";

export interface BookModel {
  readonly id: string;
  title: string;
  author: string;
  year: number;
  copiesAvailable: number;
  genre?: string;
}

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

  public borrowCopy(): void {
    if (this.copiesAvailable <= 0) {
      throw new Error(ApplicationError.NO_COPIES_AVAILABLE);
    }
    this.copiesAvailable--;
  }

  public returnCopy(): void {
    this.copiesAvailable++;
  }
}
