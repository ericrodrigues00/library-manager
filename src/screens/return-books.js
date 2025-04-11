import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateBR } from '../utils/dateUtils';
import '../styles/books-management.css';

function ReturnBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      isbn: '978-8535910681',
      borrowDate: '2024-03-01',
      dueDate: '2024-03-15',
      category: 'Literatura Brasileira'
    },
    {
      id: 2,
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '978-8533613379',
      borrowDate: '2024-03-05',
      dueDate: '2024-03-19',
      category: 'Fantasia'
    },
    {
      id: 3,
      title: 'Memórias Póstumas de Brás Cubas',
      author: 'Machado de Assis',
      isbn: '978-8535910681',
      borrowDate: '2024-03-10',
      dueDate: '2024-03-24',
      category: 'Literatura Brasileira'
    },
    {
      id: 4,
      title: 'Capitães da Areia',
      author: 'Jorge Amado',
      isbn: '978-8535910681',
      borrowDate: '2024-03-12',
      dueDate: '2024-03-26',
      category: 'Literatura Brasileira'
    },
    {
      id: 5,
      title: 'A Hora da Estrela',
      author: 'Clarice Lispector',
      isbn: '978-8535910681',
      borrowDate: '2024-03-15',
      dueDate: '2024-03-29',
      category: 'Literatura Brasileira'
    }
  ]);

  const handleReturn = (bookId) => {
    // TODO: Implement return logic
    console.log('Returning book:', bookId);
    // Remove the book from the borrowed books list
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  return (
    <div className="books-management-container">
      <header className="management-header">
        <h1>Devolver Livros</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/dashboard" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="books-content">
        <div className="books-list">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Data do Empréstimo</th>
                <th>Data de Devolução</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{formatDateBR(book.borrowDate)}</td>
                  <td>{formatDateBR(book.dueDate)}</td>
                  <td>
                    <button
                      className="btn-return"
                      onClick={() => handleReturn(book.id)}
                    >
                      <i className="fas fa-undo"></i> DEVOLVER
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ReturnBooks; 