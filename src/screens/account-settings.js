import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/account-settings.css';

function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao.silva@example.com',
    registration: '2024001',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    language: 'pt-BR',
    theme: 'light'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Senha alterada com sucesso!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Preferências atualizadas com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="account-settings-container">
      <header className="settings-header">
        <h1>Configurações da Conta</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard">Painel</Link> {'>'} Configurações
        </nav>
      </header>

      <main className="settings-content">
        <nav className="settings-tabs">
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil
          </button>
          <button 
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Segurança
          </button>
          <button 
            className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferências
          </button>
        </nav>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error">
            {errorMessage}
          </div>
        )}

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="settings-form">
              <h2>Informações do Perfil</h2>
              
              <div className="form-group">
                <label htmlFor="name">Nome Completo:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="registration">Matrícula:</label>
                <input
                  type="text"
                  id="registration"
                  name="registration"
                  value={profileData.registration}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Endereço:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Cidade:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">Estado:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={profileData.state}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">CEP:</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="settings-form">
              <h2>Alterar Senha</h2>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Senha Atual:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handlePreferencesSubmit} className="settings-form">
              <h2>Preferências</h2>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange}
                  />
                  Receber notificações por e-mail
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={preferences.smsNotifications}
                    onChange={handlePreferenceChange}
                  />
                  Receber notificações por SMS
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="language">Idioma:</label>
                <select
                  id="language"
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="theme">Tema:</label>
                <select
                  id="theme"
                  name="theme"
                  value={preferences.theme}
                  onChange={handlePreferenceChange}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Preferências'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default AccountSettings; 