import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateCredentials } from '../data/testUsers';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';
import '../styles/global.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDebugPanelCollapsed, setIsDebugPanelCollapsed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = validateCredentials(email, password);
    
    if (user) {
      // Use the login function from AuthContext
      login(user);
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'librarian':
          navigate('/library-management');
          break;
        case 'teacher':
        case 'student':
        case 'staff':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      setError('Email ou senha inválidos');
    }
  };

  const debugLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/admin', label: 'Admin Dashboard' },
    { path: '/library-management', label: 'Library Management' },
    { path: '/search', label: 'Search' },
    { path: '/my-loans', label: 'My Loans' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/reports', label: 'Reports' },
    { path: '/account-settings', label: 'Account Settings' },
    { path: '/register', label: 'Register' },
    { path: '/forgot-password', label: 'Forgot Password' }
  ];

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Sistema de Gerenciamento de Biblioteca</h1>
        <h2>Login</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
          
          <div className="additional-buttons">
            <button 
              type="button" 
              className="btn-register"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueci a senha
            </button>
            
            <button 
              type="button" 
              className="btn-register"
              onClick={() => navigate('/register')}
            >
              Registrar
            </button>
          </div>
          
        </form>

        <div className="login-help">
          <p>Contas de teste disponíveis:</p>
          <ul>
            <li>Admin: admin@biblioteca.com / admin123</li>
            <li>Bibliotecário: bibliotecario@biblioteca.com / bib123</li>
            <li>Professor: professor@escola.com / prof123</li>
            <li>Aluno: aluno@escola.com / alu123</li>
            <li>Funcionário: funcionario@escola.com / func123</li>
          </ul>
        </div>
      </div>

      {/* Debug Panel */}
      <div className={`debug-panel ${isDebugPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="debug-panel-header">
          <span className="debug-panel-title">Debug Panel</span>
          <button 
            className="debug-toggle"
            onClick={() => setIsDebugPanelCollapsed(!isDebugPanelCollapsed)}
          >
            {isDebugPanelCollapsed ? '▲' : '▼'}
          </button>
        </div>
        <div className="debug-links">
          {debugLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="debug-link"
              onClick={() => {
                // Auto-login with admin credentials for testing
                const adminUser = {
                  email: 'admin@biblioteca.com',
                  password: 'admin123',
                  role: 'admin'
                };
                login(adminUser);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login; 