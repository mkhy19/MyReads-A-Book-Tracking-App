import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Search from './components/Search'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
     books: []
   }

   //to get books from BookAPI
   componentDidMount(){
     BooksAPI.getAll().then(books => {
       this.setState({ books });
     })
   }

    //update bookshelf
    updateShelf = (book, shelf) => {
      book.shelf = shelf;
      BooksAPI.update(book,shelf).then(() => {
        this.setState((state) => ({
          books: state.books.filter((b) => b.title !== book.title).concat([book])
        }));
      });
    };



  render() {
    const { books } = this.state;
    
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }
    books.sort(sortBy('title'));

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {/* Search form */}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
      
            <div className="list-books-content">
              { Object.keys(shelves).map((shelf) =>
                <BookShelf key={shelf}
                  shelfTitle={shelves[shelf][0]}
                  books={ this.state.books }
                  shelf={shelves[shelf][1]}
                  onShelfChange={ () => { this.changeShelf() } }
                />
              )}
            </div>
          </div>
        )}/>

        <Route path='/search' render={() => (
          <Search
            updateShelf={this.updateShelf}
            books={books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
