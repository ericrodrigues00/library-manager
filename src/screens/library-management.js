import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/library-management.css';
import '../styles/global.css';




function LibraryManagement() {
  const [activeTab, setActiveTab] = useState('materials');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Introdução à Programação',
      author: 'João Silva',
      isbn: '978-85-12345-67-8',
      category: 'Computação',
      copies: 5,
      available: 3,
      location: 'Estante A, Prateleira 1'
    },
    {
      id: 2,
      title: 'Banco de Dados Avançado',
      author: 'Maria Santos',
      isbn: '978-85-98765-43-2',
      category: 'Computação',
      copies: 3,
      available: 2,
      location: 'Estante A, Prateleira 2'
    }
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    copies: 1,
    location: ''
  });

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      const material = {
        ...newMaterial,
        id: materials.length + 1,
        available: newMaterial.copies
      };
      setMaterials([...materials, material]);
      setNewMaterial({
        title: '',
        author: '',
        isbn: '',
        category: '',
        copies: 1,
        location: ''
      });
      setLoading(false);
      setSuccessMessage('Material adicionado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleDeleteMaterial = (id) => {
    setLoading(true);
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      setMaterials(materials.filter(material => material.id !== id));
      setLoading(false);
      setSuccessMessage('Material removido com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleLogout = () => {
    // Implement the logout logic here
  };

  return (
    <div className="library-management-container">
      <header className="management-header">
        <h1>Gerenciamento da Biblioteca</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/dashboard" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="management-content">
        <nav className="management-tabs">
          <button 
            className={`tab ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Materiais
          </button>
        </nav>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error">
            {errorMessage}
          </div>
        )}

        <div className="management-panel">
          {activeTab === 'materials' && (
            <div className="materials-section">
              <section className="add-material">
                <h2>Adicionar Novo Material</h2>
                <form onSubmit={handleAddMaterial} className="material-form">
                  <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleMaterialChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="author">Autor:</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={newMaterial.author}
                      onChange={handleMaterialChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={newMaterial.isbn}
                      onChange={handleMaterialChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Categoria:</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={newMaterial.category}
                      onChange={handleMaterialChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="copies">Número de Cópias:</label>
                    <input
                      type="number"
                      id="copies"
                      name="copies"
                      value={newMaterial.copies}
                      onChange={handleMaterialChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Localização:</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newMaterial.location}
                      onChange={handleMaterialChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-add" disabled={loading}>
                    {loading ? 'Adicionando...' : 'Adicionar Material'}
                  </button>
                </form>
              </section>

              <section className="materials-list">
                <h2>Materiais Cadastrados</h2>
                <div className="materials-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Categoria</th>
                        <th>Cópias</th>
                        <th>Disponíveis</th>
                        <th>Localização</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map(material => (
                        <tr key={material.id}>
                          <td data-label="Título">{material.title}</td>
                          <td data-label="Autor">{material.author}</td>
                          <td data-label="ISBN">{material.isbn}</td>
                          <td data-label="Categoria">{material.category}</td>
                          <td data-label="Cópias">{material.copies}</td>
                          <td data-label="Disponíveis">{material.available}</td>
                          <td data-label="Localização">{material.location}</td>
                          <td data-label="Ações">
                            <button 
                              className="btn-edit"
                              onClick={() => {/* TODO: Implement edit */}}
                            >
                              Editar
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => handleDeleteMaterial(material.id)}
                              disabled={loading}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default LibraryManagement; 