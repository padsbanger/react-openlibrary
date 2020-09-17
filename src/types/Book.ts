interface Book {
  title: string;
  key: string;
  first_publish_year: number;
  authors?: Author[];
  author_name?: string;
  first_sentence?: string;
  isbn?: string[];
  lcc?: string[];
  lccn?: string[];
  olid?: string[];
  number_of_pages?: number;
  publish_date?: string;
}

export interface Author {
  name: string;
  key: string;
}

export type BookSize = "S" | "M" | "L";

export default Book;
