import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    systemAlerts: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real application, this would be an API call
        setTimeout(() => {
          setStats({
            totalUsers: 1250,
            activeUsers: 876,
            pendingApprovals: 12,
            systemAlerts: 3
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao buscar dados do painel:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Carregando dados do painel...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-content">
        <header className="admin-header">
          <h1>Painel Administrativo</h1>
          <div className="admin-nav">
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> SAIR
            </button>
          </div>
        </header>

        <section className="admin-summary">
          <div className="summary-card">
            <h3>Total de Usuários</h3>
            <span className="count">{stats.totalUsers}</span>
          </div>
          <div className="summary-card">
            <h3>Usuários Ativos</h3>
            <span className="count">{stats.activeUsers}</span>
          </div>
          <div className="summary-card">
            <h3>Aprovações Pendentes</h3>
            <span className="count warning">{stats.pendingApprovals}</span>
          </div>
          <div className="summary-card">
            <h3>Alertas do Sistema</h3>
            <span className="count warning">{stats.systemAlerts}</span>
          </div>
        </section>

        <section className="admin-actions">
          <h2>Ações Rápidas</h2>
          <div className="action-buttons">
            <Link to="/reports" className="action-button">
              <i className="fas fa-chart-bar"></i>
              Gerar Relatório
            </Link>
            <Link to="/library-management" className="action-button">
              <i className="fas fa-cog"></i>
              Gerenciar Acervo
            </Link>
            <Link to="/backup-management" className="action-button">
              <i className="fas fa-database"></i>
              Backup do Banco de Dados
            </Link>
          </div>
        </section>

        <section className="admin-alerts">
          <h2>Alertas do Sistema</h2>
          <div className="alert-list">
            <div className="alert-item high-priority">
              <div className="alert-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="alert-content">
                <h3>Atualização Crítica do Sistema Necessária</h3>
                <p>Correção de segurança disponível para instalação imediata</p>
                <button className="btn-view">Ver Detalhes</button>
              </div>
            </div>
            <div className="alert-item medium-priority">
              <div className="alert-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="alert-content">
                <h3>Backup do Banco de Dados Pendente</h3>
                <p>Backup agendado não foi concluído nas últimas 24 horas</p>
                <button className="btn-view">Ver Detalhes</button>
              </div>
            </div>
            <div className="alert-item low-priority">
              <div className="alert-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="alert-content">
                <h3>Nova Funcionalidade Disponível</h3>
                <p>Versão 2.1.0 foi lançada com novas capacidades</p>
                <button className="btn-view">Ver Detalhes</button>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-recent-activity">
          <h2>Atividades Recentes</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-user-edit"></i>
              </div>
              <div className="activity-content">
                <h3>Perfil de Usuário Atualizado</h3>
                <p>Administrador modificou permissões para João Silva</p>
                <span className="activity-date">2 horas atrás</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="activity-content">
                <h3>Relatório Gerado</h3>
                <p>Relatório mensal de atividade de usuários foi gerado</p>
                <span className="activity-date">5 horas atrás</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="activity-content">
                <h3>Verificação de Segurança Concluída</h3>
                <p>Verificação de segurança do sistema concluída com sucesso</p>
                <span className="activity-date">1 dia atrás</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard; 