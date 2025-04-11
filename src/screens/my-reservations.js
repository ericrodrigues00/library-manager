import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/my-reservations.css';

function MyReservations() {
  const [activeReservations, setActiveReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated reservation data - replace with actual API call
  const mockReservations = [
    {
      id: 1,
      title: "Algoritmos e Estruturas de Dados",
      author: "Carlos Oliveira",
      reservationDate: "20/01/2025",
      estimatedAvailability: "12/04/2025",
      status: "waiting",
      queuePosition: 3,
      totalInQueue: 5
    }
  ];

  React.useEffect(() => {
    // Simulate API call
    try {
      setTimeout(() => {
        setActiveReservations(mockReservations);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Erro ao carregar reservas. Por favor, tente novamente mais tarde.");
      setLoading(false);
      console.error("Error loading reservations:", err);
    }
  }, []);

  // Calculate average queue position
  const calculateAverageQueuePosition = () => {
    if (activeReservations.length === 0) return 0;
    
    const waitingReservations = activeReservations.filter(res => res.status === 'waiting');
    if (waitingReservations.length === 0) return 0;
    
    const totalPosition = waitingReservations.reduce((sum, res) => sum + res.queuePosition, 0);
    return Math.round(totalPosition / waitingReservations.length);
  };

  const handleCancel = (reservationId) => {
    // TODO: Implement cancellation logic
    console.log('Cancelling reservation:', reservationId);
  };

  if (loading) {
    return <div className="loading">Carregando reservas...</div>;
  }

  if (error) {
    return (
      <div className="my-reservations-container">
        <div className="error-message">
          <h2>Erro</h2>
          <p>{error}</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (activeReservations.length === 0) {
    return (
      <div className="my-reservations-container">
        <header className="reservations-header">
          <h1>Minhas Reservas</h1>
          <div className="header-actions">
            <div className="back-container">
              <Link to="/dashboard" className="back-button">
                <i className="fas fa-arrow-left"></i> VOLTAR
              </Link>
            </div>
          </div>
        </header>
        
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h2>Nenhuma reserva encontrada</h2>
          <p>Você não possui reservas ativas no momento.</p>
          <Link to="/search" className="btn-primary">
            Pesquisar Materiais
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reservations-container">
      <header className="reservations-header">
        <h1>Minhas Reservas</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/dashboard" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="reservations-content">
        <section className="reservations-summary">
          <div className="summary-card">
            <h3>Reservas Ativas</h3>
            <span className="count">{activeReservations.length}</span>
          </div>
          <div className="summary-card">
            <h3>Próxima Disponibilidade</h3>
            <span className="count">25/01/2024</span>
          </div>
          <div className="summary-card">
            <h3>Posição Média na Fila</h3>
            <span className="count">{calculateAverageQueuePosition()}</span>
          </div>
          <div className="summary-card">
            <h3>Total de Reservas</h3>
            <span className="count">{activeReservations.length}</span>
          </div>
        </section>

        <section className="active-reservations">
          <h2>Reservas Ativas</h2>
          <div className="reservations-table">
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Data da Reserva</th>
                  <th>Disponibilidade Estimada</th>
                  <th>Status</th>
                  <th>Posição na Fila</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {activeReservations.map(reservation => (
                  <tr key={reservation.id} className="reservation-item">
                    <td>
                      <div className="material-info">
                        <h4>{reservation.title}</h4>
                        <p>{reservation.author}</p>
                      </div>
                    </td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.estimatedAvailability}</td>
                    <td>
                      <span className={`status-badge ${reservation.status}`}>
                        {reservation.status === 'waiting' ? 'Aguardando' : 'Disponível'}
                      </span>
                    </td>
                    <td>
                      {reservation.status === 'waiting' ? (
                        <div className="queue-position">
                          <span className="position-number">{reservation.queuePosition}</span>
                        </div>
                      ) : (
                        <span className="position-available">Disponível</span>
                      )}
                    </td>
                    <td>
                      <div className="reservation-actions">
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancel(reservation.id)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

       
      </main>
    </div>
  );
}

export default MyReservations; 