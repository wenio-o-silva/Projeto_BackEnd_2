import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Clientes } from "./pages/Clientes";
import { Quartos } from "./pages/Quartos";  
import { Reservas } from "./pages/Reservas"; 


const PrivateRoute = ({ children }) => {
  const { signed, loading } = useContext(AuthContext);
  
  if (loading) return <div>Carregando...</div>;
  
  return signed ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<Login />} />
          
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
             
             
             <Route index element={
               <div style={{ padding: '20px' }}>
                 <h3>Bem-vindo ao Sistema do Hotel</h3>
                 <p>Selecione uma opção no menu acima.</p>
               </div>
             } />
             
             
             <Route path="clientes" element={<Clientes />} />
             <Route path="quartos" element={<Quartos />} />   
             <Route path="reservas" element={<Reservas />} />
             
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;