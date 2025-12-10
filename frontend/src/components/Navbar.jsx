import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav style={{ 
      background: '#111827', 
      color: 'white', 
      padding: '0 2rem', 
      height: '64px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
      <h3 style={{margin:0, fontSize: '1.2rem', letterSpacing: '-0.5px'}}>
    🏨 Sis<span style={{color:'#6366f1'}}>Hotel Serra Azul</span>
        </h3>
        <div style={{display: 'flex', gap: '1rem'}}>
           <Link to="/dashboard" style={{color: '#d1d5db', textDecoration: 'none', fontWeight: 500}}>Home</Link>
           <Link to="/clientes" style={{color: '#d1d5db', textDecoration: 'none', fontWeight: 500}}>Clientes</Link>
           <Link to="/quartos" style={{color: '#d1d5db', textDecoration: 'none', fontWeight: 500}}>Quartos</Link>
           <Link to="/reservas" style={{color: '#d1d5db', textDecoration: 'none', fontWeight: 500}}>Reservas</Link>
        </div>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <span style={{color: '#9ca3af', fontSize: '0.9rem'}}>Olá, {user?.username}</span>
        <button onClick={logout} style={{background: '#dc2626', padding: '6px 12px', fontSize: '0.8rem'}}>Sair</button>
      </div>
    </nav>
  );
};