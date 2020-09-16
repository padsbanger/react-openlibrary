import Book from "./types/Book";
import config from "./config";

export type BookSize = "S" | "M" | "L";

interface Style {
  [key: string]: any;
}

export const generateBookCover = (book: Book, size: BookSize) => {
  let validKey = "";
  let validKeyValue = "";
  if (book.lcc && book.lcc?.length) {
    validKey = "lcc";
    validKeyValue = book.lcc[0];
  }
  if (book.lccn && book.lccn?.length) {
    validKey = "lccn";
    validKeyValue = book.lccn[0];
  }
  if (book.isbn && book.isbn?.length) {
    validKey = "isbn";
    validKeyValue = book.isbn[0];
  }
  if (book.olid && book.olid?.length) {
    validKey = "olid";
    validKeyValue = book.olid[0];
  }
  return `${config.COVER_API}${validKey}/${validKeyValue}-${size}.jpg`;
  // console.log(config.SEARCH_API)
};

export default generateBookCover;
