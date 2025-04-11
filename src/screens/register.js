import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registration: '',
    password: '',
    confirmPassword: ''
  });
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
        text: 'Conta criada com sucesso! Você já pode fazer login.'
      });
      setFormData({
        name: '',
        email: '',
        registration: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Falha ao criar conta. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Criar Nova Conta</h1>
        <p>Preencha os dados abaixo para criar sua conta no sistema.</p>
        
        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registration">Matrícula</label>
            <input
              type="text"
              id="registration"
              name="registration"
              value={formData.registration}
              onChange={handleChange}
              placeholder="Digite sua matrícula"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Criando Conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="register-links">
          <Link to="/login">Já tem uma conta? Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 