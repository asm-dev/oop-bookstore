export interface BookModel {
  readonly id: string;
  title: string;
  author: string;
  year: number;
  copiesAvailable: number;
  genre?: string;
}
