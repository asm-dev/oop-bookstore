export interface BookModel {
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
    public genre?: string
  ) {}

  public static create(
    title: string,
    author: string,
    year: number,
    copiesAvailable: number,
    genre?: string
  ): Book {
    if (copiesAvailable < 0) {
      throw new Error(
        "Para registrar un nuevo libro es necesario disponer de una copia como mínimo"
      );
    }
    return new Book(title, author, year, copiesAvailable, genre);
  }
}
