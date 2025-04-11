import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/global.css';
const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Empréstimos Ativos',
      value: '12',
      description: 'Materiais emprestados',
      icon: '📚',
      link: '/my-loans'
    },
    {
      title: 'Reservas',
      value: '5',
      description: 'Aguardando disponibilidade',
      icon: '⏳',
      link: '/my-reservations'
    },
    {
      title: 'Multas',
      value: 'R$ 0,00',
      description: 'Pagamentos pendentes',
      icon: '💰'
    },
    {
      title: 'Notificações',
      value: '3',
      description: 'Mensagens não lidas',
      icon: '🔔',
      link: '/notifications'
    }
  ];

  const recentActivity = [
    {
      title: 'Livro devolvido',
      description: 'O Senhor dos Anéis - A Sociedade do Anel',
      time: '2 horas atrás',
      icon: '📖'
    },
    {
      title: 'Novo empréstimo',
      description: '1984 - George Orwell',
      time: '1 dia atrás',
      icon: '📚'
    },
    {
      title: 'Reserva confirmada',
      description: 'Dom Casmurro - Machado de Assis',
      time: '2 dias atrás',
      icon: '✅'
    }
  ];

  const quickActions = [
    {
      text: 'Pesquisar Material',
      icon: '🔍',
      link: '/search'
    },
    {
      text: 'Emprestar Livros',
      icon: '✅',
      link: '/borrow-books'
    },
    {
      text: 'Devolver Livros',
      icon: '❌',
      link: '/return-books'
    },
    {
      text: 'Configurações da Conta',
      icon: '⚙️',
      link: '/account-settings'
    }
  ];

  const handleLogout = () => {
    // Implement the logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Painel de Controle</h1>
          <div className="header-actions">
            <div className="logout-container">
              <button className="logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> SAIR
              </button>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              {stat.link ? (
                <Link to={stat.link} className="stat-link">
                  <div className="stat-header">
                    <span className="stat-title">{stat.title}</span>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-description">{stat.description}</div>
                </Link>
              ) : (
                <>
                  <div className="stat-header">
                    <span className="stat-title">{stat.title}</span>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-description">{stat.description}</div>
                </>
              )}
            </div>
          ))}
        </section>

        <section className="quick-actions">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="action-button">
              <span className="action-icon">{action.icon}</span>
              <span className="action-text">{action.text}</span>
            </Link>
          ))}
        </section>

        <section className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Atividade Recente</h2>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>

       

       
      </div>
    </div>
  );
};

export default Dashboard; 