import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
        <strong>Olá, {user?.username}</strong>
        <Link to="/dashboard/clientes">Clientes</Link>
        <Link to="/dashboard/quartos">Quartos</Link>
        <Link to="/dashboard/reservas">Reservas</Link>
        <button onClick={logout} style={{ marginLeft: 'auto' }}>Sair</button>
      </nav>
      
      <div style={{ padding: '20px' }}>
        {/* Aqui serão renderizadas as rotas filhas */}
        <Outlet /> 
      </div>
    </div>
  );
};