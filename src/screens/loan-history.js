import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';


function LoanHistory() {
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Simulated loan history data - replace with actual API call
  const mockLoanHistory = [
    {
      id: 1,
      title: "Introdução à Programação",
      author: "João Silva",
      borrowedDate: "2023-12-01",
      returnDate: "2023-12-15",
      status: "returned"
    },
    {
      id: 2,
      title: "Banco de Dados Avançado",
      author: "Maria Santos",
      borrowedDate: "2023-11-15",
      returnDate: "2023-12-01",
      status: "returned"
    },
    {
      id: 3,
      title: "Redes de Computadores",
      author: "Carlos Oliveira",
      borrowedDate: "2023-10-01",
      returnDate: "2023-10-20",
      status: "returned"
    }
  ];

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoanHistory(mockLoanHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'period') {
      setSelectedPeriod(value);
    } else if (name === 'status') {
      setSelectedStatus(value);
    }
    // TODO: Implement filter logic
    console.log('Filter changed:', { name, value });
  };

  const handleExport = (format) => {
    // TODO: Implement export logic
    console.log('Exporting to:', format);
  };

  if (loading) {
    return <div className="loading">Carregando histórico...</div>;
  }

  return (
    <div className="loan-history-container">
      <header className="history-header">
        <h1>Histórico de Empréstimos</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard">Painel</Link> {'>'} Histórico de Empréstimos
        </nav>
      </header>

      <main className="history-content">
        <section className="history-filters">
          <form id="historyFilterForm">
            <div className="filter-group">
              <label htmlFor="historyPeriod">Período:</label>
              <select 
                id="historyPeriod" 
                name="period"
                value={selectedPeriod}
                onChange={handleFilterChange}
              >
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 3 meses</option>
                <option value="180">Últimos 6 meses</option>
                <option value="365">Último ano</option>
                <option value="all">Todo o histórico</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="historyStatus">Status:</label>
              <select 
                id="historyStatus" 
                name="status"
                value={selectedStatus}
                onChange={handleFilterChange}
              >
                <option value="all">Todos</option>
                <option value="returned">Devolvidos</option>
                <option value="overdue">Atrasados</option>
                <option value="current">Em Andamento</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">Filtrar</button>
          </form>
        </section>

        <section className="history-summary">
          <div className="summary-card">
            <h3>Total de Empréstimos</h3>
            <span className="count">{loanHistory.length}</span>
          </div>
          <div className="summary-card">
            <h3>Empréstimos no Prazo</h3>
            <span className="count">{loanHistory.filter(loan => loan.status === 'returned').length}</span>
          </div>
          <div className="summary-card">
            <h3>Empréstimos Atrasados</h3>
            <span className="count warning">{loanHistory.filter(loan => loan.status === 'overdue').length}</span>
          </div>
          <div className="summary-card">
            <h3>Média de Dias por Empréstimo</h3>
            <span className="count">14</span>
          </div>
        </section>

        <section className="history-table-section">
          <h2>Histórico Completo</h2>
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Data do Empréstimo</th>
                  <th>Data de Devolução</th>
                  <th>Status</th>
                  <th>Dias</th>
                </tr>
              </thead>
              <tbody id="historyTableBody">
                {loanHistory.map(loan => (
                  <tr key={loan.id} className="history-item">
                    <td>
                      <div className="material-info">
                        <h4>{loan.title}</h4>
                        <p>{loan.author}</p>
                      </div>
                    </td>
                    <td>{loan.borrowedDate}</td>
                    <td>{loan.returnDate}</td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status === 'returned' ? 'Devolvido' : 
                         loan.status === 'overdue' ? 'Atrasado' : 'Em Andamento'}
                      </span>
                    </td>
                    <td>14</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="prev-page">Anterior</button>
            <span className="page-numbers">
              <span className="current-page">1</span> de <span className="total-pages">1</span>
            </span>
            <button className="next-page">Próxima</button>
          </div>
        </section>

        <section className="history-actions">
          <div className="export-options">
            <button 
              className="btn-export" 
              data-format="pdf"
              onClick={() => handleExport('pdf')}
            >
              <i className="icon-pdf"></i>
              Exportar PDF
            </button>
            <button 
              className="btn-export" 
              data-format="excel"
              onClick={() => handleExport('excel')}
            >
              <i className="icon-excel"></i>
              Exportar Excel
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoanHistory; 