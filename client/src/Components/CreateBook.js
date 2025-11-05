import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function CreateBook(props) {
    const initialFormData = Object.freeze({
        title: "Book x",
        genre: "roman",
        authorId: 1
    });
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookToCreate = {
            id: 0,
            title: formData.title,
            genre: formData.genre,
            authorId: formData.authorId
        };


        fetch(Constants.API_URL_CREATE_BOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookToCreate)
        })
            .then(response => response.json())
            .then(responsFromServer => {
                console.log(responsFromServer);
            })
            .catch((error) => {
                alert(error);
            });
        props.onBookCreated(bookToCreate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new book</h1>
            <div className="mt-5">
                <label className="h3 form-label">Book title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Book genre</label>
                <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Book author</label>
                <input value={formData.authorId} name="authorId" type="number" className="form-control" onChange={handleChange} />
            </div>
            <button onClick={handleSubmit} className="btn btn-success btn-lg mx-3 my-3">Submit</button>
            <button onClick={() => props.onBookCreated(null)} className="btn btn-outline-danger btn-lg">Cancel</button>
        </form>
    );
}


