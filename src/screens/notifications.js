import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated notification data - replace with actual API call
  const mockNotifications = [
    {
      id: 1,
      type: 'due',
      title: 'Empréstimo próximo ao vencimento',
      message: 'O livro "Introdução à Programação" deve ser devolvido em 3 dias.',
      date: '2024-01-20',
      read: false,
      link: '/my-loans'
    },
    {
      id: 2,
      type: 'reservation',
      title: 'Reserva disponível',
      message: 'O livro "Banco de Dados Avançado" está disponível para retirada.',
      date: '2024-01-19',
      read: true,
      link: '/my-reservations'
    },
    {
      id: 3,
      type: 'system',
      title: 'Manutenção programada',
      message: 'O sistema estará em manutenção no dia 25/01/2024 das 22h às 23h.',
      date: '2024-01-18',
      read: true,
      link: null
    }
  ];

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkAsRead = (notificationId) => {
    // TODO: Implement mark as read logic
    console.log('Marking notification as read:', notificationId);
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read logic
    console.log('Marking all notifications as read');
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDelete = (notificationId) => {
    // TODO: Implement delete logic
    console.log('Deleting notification:', notificationId);
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  if (loading) {
    return <div className="loading">Carregando notificações...</div>;
  }

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <h1>Notificações</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard">Painel</Link> {'>'} Notificações
        </nav>
      </header>

      <main className="notifications-content">
        <section className="notifications-summary">
          <div className="summary-card">
            <h3>Total de Notificações</h3>
            <span className="count">{notifications.length}</span>
          </div>
          <div className="summary-card">
            <h3>Não Lidas</h3>
            <span className="count">{notifications.filter(n => !n.read).length}</span>
          </div>
          <div className="summary-card">
            <h3>Lidas</h3>
            <span className="count">{notifications.filter(n => n.read).length}</span>
          </div>
        </section>

        <section className="notifications-actions">
          <button 
            className="btn-mark-all-read"
            onClick={handleMarkAllAsRead}
            disabled={notifications.filter(n => !n.read).length === 0}
          >
            Marcar todas como lidas
          </button>
        </section>

        <section className="notifications-list">
          <h2>Minhas Notificações</h2>
          {notifications.length === 0 ? (
            <p className="no-notifications">Nenhuma notificação encontrada</p>
          ) : (
            <div className="notification-items">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon">
                    <i className={`icon-${notification.type}`}></i>
                  </div>
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <span className="notification-date">{notification.date}</span>
                  </div>
                  <div className="notification-actions">
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(notification.id)}
                    >
                      Excluir
                    </button>
                    {notification.link && (
                      <Link to={notification.link} className="btn-view">
                        Ver detalhes
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pagination">
          <button className="btn-view">Anterior</button>
          <span className="page-numbers">
            <span className="current-page">1</span> de <span className="total-pages">1</span>
          </span>
          <button className="btn-view">Próxima</button>
        </div>
      </main>
    </div>
  );
}

export default Notifications; 