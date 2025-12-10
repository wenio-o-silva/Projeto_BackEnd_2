import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = await login(username, password);
    if (!errorMsg) navigate("/dashboard");
    else setError(errorMsg);
  };

  return (
    <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
        padding: '20px' 
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        
        
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <h1 style={{margin: '0 0 10px 0', color: '#111827', fontSize: '2rem'}}>
               Acesso ao Sistema
            </h1>
            <p style={{margin: 0, color: '#6b7280'}}>
              Hotel Serra Azul - Gestão Simplificada
            </p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            
            
            {error && (
                <div style={{
                    padding: '12px', 
                    background: '#fee2e2', 
                    color: '#991b1b', 
                    borderRadius: '6px', 
                    fontSize: '0.9rem', 
                    textAlign: 'center',
                    border: '1px solid #fecaca',
                    width: '100%' // Garante alinhamento
                }}>
                    {error}
                </div>
            )}
            
            <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{display: 'block', marginBottom: '8px', color: '#374151'}}>Usuário</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Digite seu usuário" 
                    required 
                    style={{ width: '100%' }} 
                />
            </div>
            
            <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{display: 'block', marginBottom: '8px', color: '#374151'}}>Senha</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="••••••" 
                    required 
                    style={{ width: '100%' }} 
                />
            </div>

            <button type="submit" style={{width: '100%', marginTop: '10px', height: '48px', fontSize: '1rem'}}>
                Acessar Sistema
            </button>
        </form>
      </div>
    </div>
  );
};