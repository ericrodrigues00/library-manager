import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/forgot-password.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({
        type: 'success',
        text: 'Instruções de redefinição de senha foram enviadas para seu e-mail.'
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Falha ao enviar instruções. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Esqueci a Senha</h1>
        <p>Digite seu endereço de e-mail ou número de matrícula e enviaremos instruções para redefinir sua senha.</p>
        
        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail ou Número de Matrícula</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail ou número de matrícula"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Redefinir Senha'}
          </button>
        </form>
        
        <div className="forgot-password-links">
          <Link to="/login">Voltar para o Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 