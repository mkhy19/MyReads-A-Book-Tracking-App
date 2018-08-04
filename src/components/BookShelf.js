import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {

  render() {
    const { books, shelfTitle, shelf, updateShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelf).map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={shelf}
                  updateShelf={updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  shelfTitle: PropTypes.string.isRequired,
}

export default BookShelf
