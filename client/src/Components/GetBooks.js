import React, { use, useState } from "react";
import Constants from "../utilities/Constants";
import CreateBook from "./CreateBook";
import UpdateBook from "./UpdateBook";

export default function GetBooks() {
    const [books, setBooks] = useState([]);
    const [showingCreateNewBookForm, setShowingCreateNewBookForm] = useState(false);
    const [bookCurrentlyUpdated, setBookCurrentlyUpdated] = useState(null);

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

    function deleteBook(id) {
        fetch(`${Constants.API_URL_DELETE_BOOK}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(booksFromServer => {
                console.log(booksFromServer);
                onBookDeleted(id);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function getBook() {
        fetch(Constants.API_URL_GET_BOOK, {
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
                    {(showingCreateNewBookForm === false && bookCurrentlyUpdated === null) && (
                        <div>
                            <button onClick={getBooks} className="btn btn-outline-primary btn-lg mx-3 my-3">Get books</button>
                            <button onClick={() => setShowingCreateNewBookForm(true)} className="btn btn-dark btn-lg mx-3 my-3">Create book</button>
                        </div>
                    )}
                    {(books.length > 0 && showingCreateNewBookForm === false && bookCurrentlyUpdated === null) && renderBooksTable()}
                    {showingCreateNewBookForm && <CreateBook onBookCreated={onBookCreated} />}
                    {bookCurrentlyUpdated !== null && <UpdateBook book={bookCurrentlyUpdated} onBookUpdated={onBookUpdated} />}
                </div>
            </div>
        </div>
    );
    function renderBooksTable() {
        return (
            <div className="table table-responsive mt-5 ">
                <table className="table table-bordered mt-5 border-dark">
                    <caption>Список книг</caption>
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
                                    <button onClick={() => setBookCurrentlyUpdated(book)} className="btn btn-outline-primary btn-lg mx-3 my-3">Update</button>
                                    <button onClick={() => { if (window.confirm(`Are you sure want to delete the book tited "${book.title}"?`)) deleteBook(book.id) }} className="btn btn-outline-danger btn-lg">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setBooks([])} className="btn btn-dark btn-lg mx-3 my-3">Empty React books</button>
            </div>
        );
    }
    function onBookCreated(createdBook) {
        setShowingCreateNewBookForm(false);
        if (createdBook === null) return;
        alert(`Book successfully created. Title - "${createdBook.title}"`);
        getBooks();
    }

    function onBookUpdated(updatedBook) {
        setBookCurrentlyUpdated(null);
        if (updatedBook === null) return;

        let booksCopy = [...books];
        const index = booksCopy.findIndex((booksCopy, currentIndex) => {
            if (booksCopy.id === updatedBook.id) {
                return true;
            }
        });
        if (index !== -1) booksCopy[index] = updatedBook;

        setBooks(booksCopy);
        alert(`Book successfully updated. Title - "${updatedBook.title}"`);
    }

    function onBookDeleted(id){

        let booksCopy = [...books];
        const index = booksCopy.findIndex((booksCopy, currentIndex) => {
            if (booksCopy.id === id) {
                return true;
            }
        });
        if (index !== -1) booksCopy.splice(index, 1);
        setBooks(booksCopy);
        alert(`Book successfully deleted.`);
    }
}