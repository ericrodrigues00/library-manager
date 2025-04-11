import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/books-management.css';

function BorrowBooks() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'O Grande Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-8535909555',
      available: true,
      category: 'Literatura Clássica'
    },
    {
      id: 2,
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      isbn: '978-8535909555',
      available: true,
      category: 'Ficção Filosófica'
    },
    {
      id: 3,
      title: 'Cem Anos de Solidão',
      author: 'Gabriel García Márquez',
      isbn: '978-8535909555',
      available: true,
      category: 'Realismo Mágico'
    },
    {
      id: 4,
      title: 'Vidas Secas',
      author: 'Graciliano Ramos',
      isbn: '978-8535910681',
      available: true,
      category: 'Literatura Brasileira'
    },
    {
      id: 5,
      title: 'Admirável Mundo Novo',
      author: 'Aldous Huxley',
      isbn: '978-8535909555',
      available: true,
      category: 'Ficção Científica'
    }
  ]);

  const handleBorrow = (bookId) => {
    // TODO: Implement borrow logic
    console.log('Borrowing book:', bookId);
    // Update the book's availability status
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, available: false } : book
    ));
  };

  return (
    <div className="books-management-container">
      <header className="management-header">
        <h1>Emprestar Livros</h1>
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
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category}</td>
                  <td>
                    <button
                      className="btn-borrow"
                      onClick={() => handleBorrow(book.id)}
                      disabled={!book.available}
                    >
                      <i className="fas fa-book-reader"></i> EMPRESTAR
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

export default BorrowBooks; 