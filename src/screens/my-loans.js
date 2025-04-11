import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/my-loans.css';

function MyLoans() {
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated loan data - replace with actual API call
  const mockLoans = [
    {
      id: 1,
      title: "Introdução à Programação",
      author: "João Silva",
      borrowedDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "active"
    },
    {
      id: 2,
      title: "Banco de Dados Avançado",
      author: "Maria Santos",
      borrowedDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "active"
    }
  ];

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActiveLoans(mockLoans);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRenew = (loanId) => {
    // TODO: Implement renewal logic
    console.log('Renewing loan:', loanId);
  };

  const handleReturn = (loanId) => {
    // TODO: Implement return logic
    console.log('Returning loan:', loanId);
  };

  if (loading) {
    return <div className="loading">Carregando empréstimos...</div>;
  }

  return (
    <div className="my-loans-container">
      <header className="loans-header">
        <h1>Meus Empréstimos</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard">Painel</Link> {'>'} Meus Empréstimos
        </nav>
      </header>

      <main className="loans-content">
        <section className="loans-summary">
          <div className="summary-card">
            <h3>Empréstimos Ativos</h3>
            <span className="count">{activeLoans.length}</span>
          </div>
          <div className="summary-card">
            <h3>Próximo Vencimento</h3>
            <span className="count">15/02/2024</span>
          </div>
          <div className="summary-card">
            <h3>Total de Renovações</h3>
            <span className="count">0</span>
          </div>
        </section>

        <section className="active-loans">
          <h2>Empréstimos Ativos</h2>
          <div className="loans-table">
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Data do Empréstimo</th>
                  <th>Data de Devolução</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map(loan => (
                  <tr key={loan.id} className="loan-item">
                    <td>
                      <div className="material-info">
                        <h4>{loan.title}</h4>
                        <p>{loan.author}</p>
                      </div>
                    </td>
                    <td>{loan.borrowedDate}</td>
                    <td>{loan.dueDate}</td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status === 'active' ? 'Ativo' : 'Atrasado'}
                      </span>
                    </td>
                    <td>
                      <div className="loan-actions">
                        <button 
                          className="btn-renew"
                          onClick={() => handleRenew(loan.id)}
                        >
                          Renovar
                        </button>
                        <button 
                          className="btn-return"
                          onClick={() => handleReturn(loan.id)}
                        >
                          Devolver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="loan-history-link">
          <Link to="/loan-history" className="btn-view-history">
            Ver Histórico Completo
          </Link>
        </section>
      </main>
    </div>
  );
}

export default MyLoans; 