import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Solucoes from './pages/Solucoes';
import Parceiros from './pages/Parceiros';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
