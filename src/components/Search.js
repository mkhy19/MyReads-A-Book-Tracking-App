import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Search extends React.Component {
  state = {
		query: '',
    searchResults: []
	};

	//Update query method
	updateQuery = (query) => {
		this.setState({ query })
		this.updateQueryResults(query);
	}

  //If we find a book, add it in the results
	updateQueryResults = (query) => {
		if (query)
    {
      BooksAPI.search(query).then((searchResults) => {
        //If there no books, make sure searchResults is an array
        	if (searchResults.error)
          {
            this.setState({ searchResults: [] });
          }
          else
          {
            this.setState({ searchResults });
				  }
        });
    }
    else
    {
				this.setState({ searchResults: [] })
		}
	};

  render() {
    const defaultShelf = " ";
		const { searchResults, query } = this.state;
		const { updateShelf, books } = this.props;
		let booksResults;

    //If we find a specific characters in the query
		if (query)
    {
			const match = new RegExp(escapeRegExp(query), 'i');
			booksResults = searchResults.filter((book) => match.test(book.title))
		}
    else
    {
			booksResults = searchResults;
		}
		booksResults.sort(sortBy('title'));

    return (
      <div className="search-books">

				<div className="search-books-bar">
  				{/* {JSON.stringify(this.state)} */}
  				<Link to="/" className="close-search"> Close</Link>
  					<div className="search-books-input-wrapper">
  						<input
  							type="text"
  							placeholder="Search by title or author"
  							onChange={(event) => this.updateQuery(event.target.value)}
  						/>
  					</div>
				</div>

        <div className="search-books-results">
          <ol className="books-grid">
        		{booksResults.map(searchResults => {
  						let searchShelf;
              books.map(book => ( book.id === searchResults.id ? searchShelf = book.shelf : defaultShelf ));

              return (
								<li key={searchResults.id}>
									<Book
										book={searchResults}
										updateShelf={updateShelf}
										shelf={searchShelf}
									/>
							  </li>
						 );
						})}
					</ol>
        </div>

      </div>
    )
  }
}

export default Search;
