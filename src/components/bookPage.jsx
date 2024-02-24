import React, { useState, useEffect } from 'react';
import "./BookPage.css";
import Logo from "./Images/Kalvium Books-logos_transparent.png";
import axios from "axios";
import { Link } from 'react-router-dom';

function BookPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch books from the API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });
        setBooks(response.data.books);
      } catch (error) {
        console.log('error fetching books', error);
      }
    };
    fetchData();
  }, []);

  // Filter books based on the search term using useEffect
  useEffect(() => {
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  }, [searchTerm, books]);

  // Handle input change in the search bar
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav>
        <div className='logo'><img src={Logo} alt="Kalvium Books Logo" /></div>
        <div className='search-container'>
          <div className='search-bar'>
            <input
              type="text"
              placeholder='Search Your Books'
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='regist'>
          <button className='Register'>
            <Link to="/Form">Register</Link>
          </button>
        </div>
      </nav>
      <div className='grid'>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          searchResults.map(book => (
            <div className='bookDiv' key={book.id}>
              <img src={book.imageLinks.thumbnail} alt={book.title} />
              <h2>{book.title}</h2>
              <h3>{book.subtitle}</h3>
              <h4>
                <h3>Authors:</h3>{book.authors}
              </h4>
              <h4>Ratings🌟: {book.averageRating ? <span>{book.averageRating}/5</span> : "No Rating"}</h4>
              <h3>Free</h3>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default BookPage;
