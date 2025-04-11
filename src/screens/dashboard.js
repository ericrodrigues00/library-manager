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
      icon: '📚'
    },
    {
      title: 'Reservas',
      value: '5',
      description: 'Aguardando disponibilidade',
      icon: '⏳'
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
      icon: '🔔'
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
      text: 'Meus Empréstimos',
      icon: '📚',
      link: '/my-loans'
    },
    {
      text: 'Minhas Reservas',
      icon: '⏳',
      link: '/my-reservations'
    },
    {
      text: 'Notificações',
      icon: '🔔',
      link: '/notifications'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Bem-vindo(a)!</h1>
            <p className="dashboard-subtitle">Aqui está um resumo da sua atividade na biblioteca</p>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-description">{stat.description}</div>
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