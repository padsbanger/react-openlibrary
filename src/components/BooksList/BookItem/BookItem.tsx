import React, { useEffect } from "react";
import Book from "../../../types/Book";
import { BookSize, generateBookCover } from "../../../utils";

interface BookItemProps {
  book: Book;
}

export const BookItem: React.FC<BookItemProps> = ({ book }) => {
  useEffect(() => {
    fetch(generateBookCover(book, "M"))
      .then((response) => response.blob())
      .then((images) => {
        console.log(images);
        // Then create a local URL for that image and print it
        console.log(URL.createObjectURL(images));
      });
  });

  return (
    <div>
      <img src={generateBookCover(book, "M")} alt={book.title} />
    </div>
  );
};

export default BookItem;
