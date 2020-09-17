import Book from "./types/Book";
import { getAuthors, getBookId } from "./utils";

const BookMock1: Book = {
  title: "Some title",
  lccn: ["123"],
  first_publish_year: 1234,
  key: "key",
  authors: [{ name: "Michal", key: "/key" }],
};

const BookMock2: Book = {
  title: "Some title",
  isbn: ["123"],
  first_publish_year: 1234,
  key: "key",
  authors: [],
};

const BookMock3: Book = {
  title: "Some title",
  first_publish_year: 1234,
  key: "key",
  authors: [],
};

const BookIdMock1 = { id: "lccn", value: "123" };
const BookIdMock2 = { id: "isbn", value: "123" };

test("Should return book id values", () => {
  expect(getBookId(BookMock1)).toStrictEqual(BookIdMock1);
  expect(getBookId(BookMock2)).toStrictEqual(BookIdMock2);
  expect(getBookId(BookMock3)).toBe(null);
});

test("Should return authors string", () => {
  expect(getAuthors(BookMock1)).toStrictEqual("Michal");
  expect(getAuthors(BookMock2)).toStrictEqual("");
});
