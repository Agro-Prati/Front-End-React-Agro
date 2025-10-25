import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Import components
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Solucoes from './pages/Solucoes';
import Parceiros from './pages/Parceiros';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Profile from './pages/Profile';
import PlanoSafra from './pages/PlanoSafra';
import Aposentadoria from './pages/Aposentadoria';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/plano-safra" element={<PlanoSafra />} />
          <Route path="/aposentadoria" element={<Aposentadoria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas - requerem autenticação */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
