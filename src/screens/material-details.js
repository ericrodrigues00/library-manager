import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { books } from '../data/books';
import '../styles/global.css';
import '../styles/material-details.css';

function MaterialDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoanedByUser, setIsLoanedByUser] = useState(false);
  const [isReservedByUser, setIsReservedByUser] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simulate API call to fetch book details
    const fetchBook = () => {
      const foundBook = books.find(b => b.id === parseInt(id));
      setBook(foundBook);
      // Simulate checking if the book is loaned or reserved by the current user
      setIsLoanedByUser(false); // This would come from the backend in a real app
      setIsReservedByUser(false); // This would come from the backend in a real app
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const handleLoan = () => {
    if (book.available) {
      // Simulate API call to loan the book
      setBook(prev => ({ ...prev, available: false }));
      setIsLoanedByUser(true);
      setSuccessMessage('Livro emprestado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReserve = () => {
    if (!book.available) {
      if (isReservedByUser) {
        // Cancel reservation
        setIsReservedByUser(false);
        setSuccessMessage('Reserva cancelada com sucesso!');
      } else {
        // Make reservation
        setIsReservedByUser(true);
        setSuccessMessage('Livro reservado com sucesso!');
      }
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReturn = () => {
    if (isLoanedByUser) {
      // Simulate API call to return the book
      setBook(prev => ({ ...prev, available: true }));
      setIsLoanedByUser(false);
      setSuccessMessage('Livro devolvido com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const getBookStatus = () => {
    if (isLoanedByUser) return 'borrowed';
    if (isReservedByUser) return 'reserved';
    return book.available ? 'available' : 'borrowed';
  };

  const getStatusText = () => {
    if (isLoanedByUser) return 'Emprestado';
    if (isReservedByUser) return 'Reservado';
    return book.available ? 'Disponível' : 'Emprestado';
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!book) {
    return <div className="error">Material não encontrado</div>;
  }

  return (
    <div className="material-details-container">
      <header className="details-header">
        <h1>Detalhes do Material</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/search" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="material-content">
        <section className="material-info">
          <div className="material-header">
            <h2>{book.title}</h2>
            <span className="material-type">{book.category}</span>
          </div>

          <div className="material-details">
            <div className="detail-group">
              <label>Autor:</label>
              <span>{book.author}</span>
            </div>
            <div className="detail-group">
              <label>Ano de Publicação:</label>
              <span>{book.publishYear}</span>
            </div>
            <div className="detail-group">
              <label>ISBN:</label>
              <span>{book.isbn}</span>
            </div>
          </div>

          <div className="material-status">
            <h3>Status</h3>
            <div className="status-info">
              <span className={`status-badge ${getBookStatus()}`}>
                {getStatusText()}
              </span>
            </div>
          </div>

          <div className="material-actions">
            {book.available ? (
              <button 
                className="btn-loan"
                onClick={handleLoan}
              >
                Emprestar
              </button>
            ) : isLoanedByUser ? (
              <button 
                className="btn-return"
                onClick={handleReturn}
              >
                Devolver
              </button>
            ) : (
              <button 
                className={`btn-reserve ${isReservedByUser ? 'btn-cancel' : ''}`}
                onClick={handleReserve}
              >
                {isReservedByUser ? 'Cancelar Reserva' : 'Reservar'}
              </button>
            )}
          </div>

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </section>

        <section className="material-description">
          <h3>Descrição</h3>
          <p>{book.description}</p>
        </section>
      </main>
    </div>
  );
}

export default MaterialDetails; 