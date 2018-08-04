import React from 'react';
import BookShelfChanger from './BookShelfOptions';

class Book extends React.Component {
  render() {
    const { book, updateShelf, shelf } = this.props;

    //conditional rendering to show the thumbnail or not
    const displayImage = book.imageLinks ? book.imageLinks.thumbnail : "http://via.placeholder.com/128x193?text=?";

    return (
      <div className="book">
        <div className="book-top">

          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
            }}>

            <img className="book-cover-img"
              src={displayImage}
              alt={book.title}
            />
          </div>

          <BookShelfChanger
            book={book}
            updateShelf={updateShelf}
            shelf={shelf}
          />
        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>

      </div>
    )
  }
}

export default Book;
