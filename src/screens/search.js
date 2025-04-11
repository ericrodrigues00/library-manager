import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search logic
    console.log('Searching for:', searchQuery);
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
              <select className="filter-select">
                <option value="all">Todos os Tipos</option>
                <option value="book">Livros</option>
                <option value="magazine">Revistas</option>
                <option value="thesis">Teses</option>
              </select>

              <select className="filter-select">
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
              searchResults.map((result) => (
                <Link to={`/material/${result.id}`} key={result.id} className="result-item">
                  <div className="result-info">
                    <h3>{result.title}</h3>
                    <p>{result.author}</p>
                    <span className="material-type">{result.type}</span>
                  </div>
                  <div className="result-status">
                    <span className={`status-badge ${result.status}`}>
                      {result.status}
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