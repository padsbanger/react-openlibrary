import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Book from "../../../types/Book";
import { generateBookCover, getBookId } from "../../../utils";

interface BookItemProps {
  book: Book;
}

export const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const bookId = getBookId(book);
  const history = useHistory();
  const handleNavigation = () => {
    if (bookId) {
      history.push(`/book/${bookId.id}/${bookId.value}`);
    }
  };
  return (
    <StyledBookItem
      className={!bookId ? "disabled" : ""}
      onClick={handleNavigation}
    >
      {bookId ? (
        <StyledBookCover
          src={generateBookCover(bookId, "M")}
          title={`${book.title} - ${book.author_name}`}
          alt={`${book.title} - ${book.author_name}`}
        />
      ) : null}
      <StyledBookTitle>
        {book.title} - {book.author_name}
      </StyledBookTitle>
    </StyledBookItem>
  );
};

const StyledBookItem = styled.div`
  position: relative;
  min-height: 320px;
  opacity: 1;
  transition: box-shadow 0.3s;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 6px -6px #777;
  }
  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledBookCover = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
`;

const StyledBookTitle = styled.p`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`;

export default BookItem;
