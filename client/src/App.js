import React, { use, useState } from "react";
import Constants from "./utilities/Constants";
import getBooks from "./Components/GET";

export default function App() {
  const [books, setBooks] = useState([]);

  function getBooks() {
    fetch(Constants.API_URL_GET_ALL_BOOKS, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(booksFromServer => {
        setBooks(booksFromServer);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getBook(){
    fetch(Constants.API_URL_GET_BOOK,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(booksFromServer => {
      console.log(booksFromServer);
    })
    .catch((error) => {
      alert(error);
    });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div><h1>Hello!</h1></div>

          <div className="mt-5">
            <button onClick={getBooks} className="btn btn-dark btn-lg mx-3 my-3">Get books</button>
          </div>
          {renderBooksTable()}
        </div>
      </div>
    </div>
  );
  function renderBooksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Author</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td scope="row">{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.author.name + " " + book.author.fathername + " " + book.author.surname}</td>
                <td>
                  <button className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setBooks([])} className="btn btn-dark btn-lg mx-3 my-3">Empty React posts</button>
        <button onClick={() => getBook} className="btn btn-dark btn-lg mx-3 my-3">Get one book</button>
      </div>
    );
  }
}

