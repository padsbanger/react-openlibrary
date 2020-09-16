interface Book {
  title: string;
  author_name: string[];
  key: string;
  first_publish_year: number;
  first_sentence?: string;
  isbn?: string[];
  lcc?: string[];
  lccn?: string[];
  olid?: string[];
}

export type BookSize = "S" | "M" | "L";

export default Book;
