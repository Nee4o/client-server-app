import React, { use, useState } from "react";
import Constants from "./utilities/Constants";
import getBooks from "./Components/CreateBook";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetBooks from "./Components/GetBooks";
import Home from "./Home";
import CreateBook from "./Components/CreateBook";
import UpdateBook from "./Components/UpdateBook";

export default function App() {
  return (
    <Router>
       <nav className="navbar navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to={"/"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/getBooks"}>Get books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/createBook"}>Create book</NavLink>
            </li>
          </ul>
        </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getBooks" element={<GetBooks />} />
        <Route path="/createBook" element={<CreateBook/>}/>
      </Routes>
    </Router>
  );
}

