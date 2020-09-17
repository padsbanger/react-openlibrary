import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import config from "../../config";
import generateBookCover, { getAuthors } from "../../utils";
import Book from "../../types/Book";
import Spinner from "../../components/Spinner";

interface RouteParams {
  id: string;
  value: string;
}

export const BookView: React.FC = () => {
  let { id, value } = useParams<RouteParams>();
  const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);
  const [loadingBookData, setLoadingBookData] = useState<boolean>(false);

  const renderBookDetails = () => {
    if (currentBook) {
      console.log(currentBook);
      return (
        <div>
          <ul>
            <li>Title: {currentBook.title}</li>
            <li>Author: {getAuthors(currentBook)}</li>
            <li>Number of pages: {currentBook.number_of_pages}</li>
            <li>Publish date: {currentBook.publish_date}</li>
          </ul>
        </div>
      );
    }
    return null;
  };

  const getBookInfo = () => {
    setLoadingBookData(true);
    fetch(
      `${
        config.SINGLE_BOOK_API
      }${id.toUpperCase()}:${value.toUpperCase()}&format=json&details=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingBookData(false);
        setCurrentBook(
          data[`${id.toUpperCase()}:${value.toUpperCase()}`].details
        );
      })
      .catch((e) => {
        setLoadingBookData(false);
      });
  };

  useEffect(() => {
    getBookInfo();
  }, []);

  console.log(currentBook);

  return (
    <StyledBookContainer>
      <Link to="/">Home</Link>
      {!loadingBookData ? (
        <StyledBookDetails>
          <img
            title={currentBook?.title}
            alt={currentBook?.title}
            src={generateBookCover({ id, value }, "L")}
          />
          {renderBookDetails()}
        </StyledBookDetails>
      ) : (
        <Spinner />
      )}
    </StyledBookContainer>
  );
};

const StyledBookContainer = styled.div`
  margin: 1rem;
`;

const StyledBookDetails = styled.div`
  display: flex;
  margin: 1rem 0;
  img {
    width: 230px;
  }
  ul {
    margin: 0;
    padding: 0 1rem;
    list-style: none;
  }
`;
