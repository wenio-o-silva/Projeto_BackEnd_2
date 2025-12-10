import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <h1 style={{fontSize: '2.5rem', color: '#4f46e5'}}>Bem-vindo ao Sistema</h1>
            <p style={{color: '#6b7280', fontSize: '1.1rem'}}>Selecione um módulo para começar</p>
        </div>
        
        <div className="dash-grid">
            <Link to="/clientes" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="stat-card">
                    <span className="stat-icon">👥</span>
                    <span className="stat-title">Gerenciar Clientes</span>
                </div>
            </Link>

            <Link to="/quartos" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="stat-card">
                    <span className="stat-icon">🛏️</span>
                    <span className="stat-title">Gerenciar Quartos</span>
                </div>
            </Link>

            <Link to="/reservas" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="stat-card">
                    <span className="stat-icon">📅</span>
                    <span className="stat-title">Fazer Reservas</span>
                </div>
            </Link>
        </div>
      </div>
    </div>
  );
}