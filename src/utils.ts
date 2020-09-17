import config from "./config";
import Book, { Author } from "./types/Book";

export type BookSize = "S" | "M" | "L";

export const getBookId = (book: Book) => {
  const validKeys: Array<Extract<keyof Book, string>> = [
    "lcc",
    "lccn",
    "isbn",
    "olid",
  ];
  const validKey = validKeys.find((x) => x in book);
  const validKeyValue = validKey && (book[validKey] as []);
  if (validKeyValue && validKeyValue.length) {
    return {
      id: validKey,
      value: validKeyValue.splice(0)[0],
    };
  }
  return null;
};

// I have basically gave up here, please roast me.
export const generateBookCover = (bookId: any, size: BookSize) => {
  return `${config.COVER_API}${bookId.id}/${bookId.value}-${size}.jpg`;
};

export const getAuthors = (book: Book) => {
  return book.authors?.map((author: Author) => author.name).join(", ");
};

export default generateBookCover;
