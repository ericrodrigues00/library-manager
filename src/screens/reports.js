import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/reports.css';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock report data based on selected report type
      let mockData = {};
      
      if (selectedReport === 'loans') {
        mockData = {
          title: 'Relatório de Empréstimos',
          period: `${dateRange.startDate} a ${dateRange.endDate}`,
          summary: {
            totalLoans: 45,
            activeLoans: 30,
            overdueLoans: 5,
            returnedLoans: 10
          },
          details: [
            { id: 1, user: 'João Silva', material: 'Introdução à Programação', date: '2024-01-15', status: 'Ativo' },
            { id: 2, user: 'Maria Santos', material: 'Banco de Dados Avançado', date: '2024-01-10', status: 'Ativo' },
            { id: 3, user: 'Carlos Oliveira', material: 'Redes de Computadores', date: '2024-01-05', status: 'Atrasado' }
          ]
        };
      } else if (selectedReport === 'materials') {
        mockData = {
          title: 'Relatório de Materiais',
          period: `${dateRange.startDate} a ${dateRange.endDate}`,
          summary: {
            totalMaterials: 500,
            availableMaterials: 380,
            borrowedMaterials: 120,
            mostBorrowed: 'Introdução à Programação'
          },
          details: [
            { id: 1, title: 'Introdução à Programação', author: 'João Silva', copies: 5, available: 2 },
            { id: 2, title: 'Banco de Dados Avançado', author: 'Maria Santos', copies: 3, available: 1 },
            { id: 3, title: 'Redes de Computadores', author: 'Carlos Oliveira', copies: 4, available: 3 }
          ]
        };
      } else if (selectedReport === 'users') {
        mockData = {
          title: 'Relatório de Usuários',
          period: `${dateRange.startDate} a ${dateRange.endDate}`,
          summary: {
            totalUsers: 150,
            activeUsers: 120,
            newUsers: 10,
            inactiveUsers: 20
          },
          details: [
            { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo', loans: 3 },
            { id: 2, name: 'Maria Santos', email: 'maria@example.com', status: 'Ativo', loans: 2 },
            { id: 3, name: 'Carlos Oliveira', email: 'carlos@example.com', status: 'Inativo', loans: 0 }
          ]
        };
      }
      
      setReportData(mockData);
      setLoading(false);
    }, 1500);
  };

  const handleExport = (format) => {
    // TODO: Implement export logic
    console.log('Exporting report to:', format);
  };

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1>Relatórios</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/dashboard" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="reports-content">
        <section className="report-generator">
          <h2>Gerar Relatório</h2>
          <form onSubmit={handleGenerateReport} className="report-form">
            <div className="form-group">
              <label htmlFor="reportType">Tipo de Relatório:</label>
              <select 
                id="reportType" 
                value={selectedReport}
                onChange={handleReportChange}
                required
              >
                <option value="">Selecione um relatório</option>
                <option value="loans">Relatório de Empréstimos</option>
                <option value="materials">Relatório de Materiais</option>
                <option value="users">Relatório de Usuários</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Data Inicial:</label>
              <input 
                type="date" 
                id="startDate" 
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Data Final:</label>
              <input 
                type="date" 
                id="endDate" 
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <button type="submit" className="btn-generate" disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Relatório'}
            </button>
          </form>
        </section>

        {reportData && (
          <section className="report-results">
            <div className="report-header">
              <h2>{reportData.title}</h2>
              <p className="report-period">Período: {reportData.period}</p>
              <div className="report-actions">
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
            </div>

            <div className="report-summary">
              <h3>Resumo</h3>
              <div className="summary-cards">
                {Object.entries(reportData.summary).map(([key, value]) => (
                  <div key={key} className="summary-card">
                    <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                    <span className="count">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-details">
              <h3>Detalhes</h3>
              <div className="details-table">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(reportData.details[0]).map(key => (
                        <th key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.details.map(item => (
                      <tr key={item.id}>
                        {Object.values(item).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Reports; 