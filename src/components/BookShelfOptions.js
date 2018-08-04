import React from 'react';

class BookShelfChanger extends React.Component {
  render() {
    const { book, shelf, updateShelf } = this.props;

    return (
      <div className="book-shelf-changer">
        <select
          value={shelf || "none"}
          onChange={(event) => updateShelf(book, event.target.value)}>
          <option value="move">Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger;
