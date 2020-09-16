import React from "react";
import styled from "styled-components";
import Book from "../../types/Book";
import BookItem from "./BookItem/BookItem";

interface BooksListProps {
  books: Book[];
}

export const BooksList: React.FC<BooksListProps> = ({ books }) => {
  return (
    <BooksContainer>
      {books.map((book: Book) => {
        return <BookItem key={book.key} book={book} />;
      })}
    </BooksContainer>
  );
};

const BooksContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export default BooksList;
