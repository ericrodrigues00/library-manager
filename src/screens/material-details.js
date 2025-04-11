import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MaterialDetails() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch material details using the id
    console.log('Fetching material details for ID:', id);
    setLoading(false);
  }, [id]);

  const handleReserve = () => {
    // TODO: Implement reservation logic
    console.log('Reserving material:', id);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!material) {
    return <div className="error">Material não encontrado</div>;
  }

  return (
    <div className="material-details-container">
      <header className="details-header">
        <h1>Detalhes do Material</h1>
        <Link to="/search" className="back-link">Voltar à Busca</Link>
      </header>

      <main className="material-content">
        <section className="material-info">
          <div className="material-header">
            <h2>{material?.title || 'Título do Material'}</h2>
            <span className="material-type">{material?.type || 'Tipo'}</span>
          </div>

          <div className="material-details">
            <div className="detail-group">
              <label>Autor:</label>
              <span>{material?.author || 'Autor'}</span>
            </div>
            <div className="detail-group">
              <label>Editora:</label>
              <span>{material?.publisher || 'Editora'}</span>
            </div>
            <div className="detail-group">
              <label>Ano de Publicação:</label>
              <span>{material?.year || 'Ano'}</span>
            </div>
            <div className="detail-group">
              <label>ISBN:</label>
              <span>{material?.isbn || 'ISBN'}</span>
            </div>
          </div>

          <div className="material-status">
            <h3>Status</h3>
            <div className="status-info">
              <span className={`status-badge ${material?.status || 'available'}`}>
                {material?.status || 'Disponível'}
              </span>
              <p className="status-details">
                {material?.statusDetails || 'Status details'}
              </p>
            </div>
          </div>

          <div className="material-actions">
            <button 
              className="btn-reserve"
              onClick={handleReserve}
              disabled={material?.status !== 'available'}
            >
              Reservar Material
            </button>
          </div>
        </section>

        <section className="material-description">
          <h3>Descrição</h3>
          <p>{material?.description || 'Descrição do material'}</p>
        </section>

        <section className="material-availability">
          <h3>Disponibilidade</h3>
          <div className="availability-info">
            <p>Total de Exemplares: {material?.totalCopies || 0}</p>
            <p>Exemplares Disponíveis: {material?.availableCopies || 0}</p>
            <p>Próxima Disponibilidade: {material?.nextAvailability || 'N/A'}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MaterialDetails; 