import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateTimeBR } from '../utils/dateUtils';
import '../styles/backup-management.css';

function BackupManagement() {
  const [backupSchedule, setBackupSchedule] = useState({
    frequency: 'daily',
    time: '23:00',
    retention: '30'
  });

  const [lastBackup, setLastBackup] = useState({
    date: '2024-03-15 23:00:00',
    size: '2.5 GB',
    status: 'success',
    type: 'automated'
  });

  const [manualBackupStatus, setManualBackupStatus] = useState('idle');

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setBackupSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement backup schedule update
    console.log('Backup schedule updated:', backupSchedule);
  };

  const handleManualBackup = () => {
    setManualBackupStatus('running');
    // TODO: Implement manual backup logic
    setTimeout(() => {
      setManualBackupStatus('success');
      setLastBackup({
        date: new Date().toISOString(),
        size: '2.5 GB',
        status: 'success',
        type: 'manual'
      });
    }, 2000);
  };

  return (
    <div className="backup-management-container">
      <header className="management-header">
        <h1>Gerenciamento de Backup</h1>
        <div className="header-actions">
          <div className="back-container">
            <Link to="/dashboard" className="back-button">
              <i className="fas fa-arrow-left"></i> VOLTAR
            </Link>
          </div>
        </div>
      </header>

      <main className="backup-content">
        <section className="backup-status">
          <h2>Último Backup</h2>
          <div className="status-card">
            <div className="status-info">
              <p><strong>Data:</strong> {formatDateTimeBR(lastBackup.date)}</p>
              <p><strong>Tamanho:</strong> {lastBackup.size}</p>
              <p><strong>Status:</strong> 
                <span className={`status-badge ${lastBackup.status}`}>
                  {lastBackup.status === 'success' ? 'Sucesso' : 'Falha'}
                </span>
              </p>
              <p><strong>Tipo:</strong> {lastBackup.type === 'automated' ? 'Automático' : 'Manual'}</p>
            </div>
            <button 
              className="btn-backup"
              onClick={handleManualBackup}
              disabled={manualBackupStatus === 'running'}
            >
              {manualBackupStatus === 'running' ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Backup em Andamento...
                </>
              ) : (
                <>
                  <i className="fas fa-download"></i> Realizar Backup Manual
                </>
              )}
            </button>
          </div>
        </section>

        <section className="backup-schedule">
          <h2>Agendar Backup</h2>
          <form onSubmit={handleScheduleSubmit} className="schedule-form">
            <div className="form-group">
              <label htmlFor="frequency">Frequência:</label>
              <select
                id="frequency"
                name="frequency"
                value={backupSchedule.frequency}
                onChange={handleScheduleChange}
              >
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">Horário:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={backupSchedule.time}
                onChange={handleScheduleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="retention">Retenção (dias):</label>
              <input
                type="number"
                id="retention"
                name="retention"
                value={backupSchedule.retention}
                onChange={handleScheduleChange}
                min="1"
                max="365"
              />
            </div>

            <button type="submit" className="btn-schedule">
              <i className="fas fa-save"></i> Salvar Agendamento
            </button>
          </form>
        </section>

        <section className="backup-history">
          <h2>Histórico de Backups</h2>
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Tamanho</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDateTimeBR(lastBackup.date)}</td>
                  <td>{lastBackup.type === 'automated' ? 'Automático' : 'Manual'}</td>
                  <td>{lastBackup.size}</td>
                  <td>
                    <span className={`status-badge ${lastBackup.status}`}>
                      {lastBackup.status === 'success' ? 'Sucesso' : 'Falha'}
                    </span>
                  </td>
                </tr>
                {/* Add more history rows here */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BackupManagement; 