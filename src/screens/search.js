import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import '../styles/global.css';
import '../styles/search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filteredBooks = books.filter(book => {
      const matchesQuery = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || selectedType === 'book';
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'available' && book.available) ||
        (selectedStatus === 'borrowed' && !book.available);
      
      return matchesQuery && matchesType && matchesStatus;
    });

    setSearchResults(filteredBooks);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setSelectedType(value);
    } else if (name === 'status') {
      setSelectedStatus(value);
    }
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <h1>Buscar Material</h1>
        <Link to="/dashboard" className="back-link">Voltar ao Painel</Link>
      </header>

      <main className="search-content">
        <section className="search-form-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o título, autor, ISBN ou palavras-chave"
                className="search-input"
              />
              <button type="submit" className="search-button">Buscar</button>
            </div>

            <div className="search-filters">
              <select 
                className="filter-select"
                name="type"
                value={selectedType}
                onChange={handleFilterChange}
              >
                <option value="all">Todos os Tipos</option>
                <option value="book">Livros</option>
                <option value="magazine">Revistas</option>
                <option value="thesis">Teses</option>
              </select>

              <select 
                className="filter-select"
                name="status"
                value={selectedStatus}
                onChange={handleFilterChange}
              >
                <option value="all">Todos os Status</option>
                <option value="available">Disponível</option>
                <option value="borrowed">Emprestado</option>
                <option value="reserved">Reservado</option>
              </select>
            </div>
          </form>
        </section>

        <section className="search-results">
          <h2>Resultados da Busca</h2>
          <div className="results-list">
            {searchResults.length === 0 ? (
              <p className="no-results">Nenhum resultado encontrado</p>
            ) : (
              searchResults.map((book) => (
                <Link to={`/material/${book.id}`} key={book.id} className="result-item">
                  <div className="result-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <span className="material-type">{book.category}</span>
                  </div>
                  <div className="result-status">
                    <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                      {book.available ? 'Disponível' : 'Emprestado'}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Search; 