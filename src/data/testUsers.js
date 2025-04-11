export const testUsers = {
  admin: {
    id: 'ADM001',
    name: 'Administrador Sistema',
    email: 'admin@biblioteca.com',
    password: 'admin123',
    role: 'admin',
    registration: '2024001',
    phone: '(11) 99999-9999',
    department: 'Administração',
    status: 'active'
  },
  librarian: {
    id: 'BIB001',
    name: 'Bibliotecário Principal',
    email: 'bibliotecario@biblioteca.com',
    password: 'bib123',
    role: 'librarian',
    registration: '2024002',
    phone: '(11) 98888-8888',
    department: 'Biblioteca',
    status: 'active'
  },
  teacher: {
    id: 'PROF001',
    name: 'Professor João Silva',
    email: 'professor@escola.com',
    password: 'prof123',
    role: 'teacher',
    registration: '2024003',
    phone: '(11) 97777-7777',
    department: 'Matemática',
    status: 'active'
  },
  student: {
    id: 'ALU001',
    name: 'Aluno Maria Santos',
    email: 'aluno@escola.com',
    password: 'alu123',
    role: 'student',
    registration: '2024004',
    phone: '(11) 96666-6666',
    department: 'Ensino Médio',
    status: 'active'
  },
  staff: {
    id: 'FUNC001',
    name: 'Funcionário Pedro Oliveira',
    email: 'funcionario@escola.com',
    password: 'func123',
    role: 'staff',
    registration: '2024005',
    phone: '(11) 95555-5555',
    department: 'Secretaria',
    status: 'active'
  }
};

// Função auxiliar para verificar credenciais
export const validateCredentials = (email, password) => {
  const user = Object.values(testUsers).find(
    user => user.email === email && user.password === password
  );
  return user || null;
};

// Função para obter usuário por ID
export const getUserById = (id) => {
  return Object.values(testUsers).find(user => user.id === id) || null;
};

// Função para obter usuário por email
export const getUserByEmail = (email) => {
  return Object.values(testUsers).find(user => user.email === email) || null;
};

// Função para obter usuário por matrícula
export const getUserByRegistration = (registration) => {
  return Object.values(testUsers).find(user => user.registration === registration) || null;
}; 