import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Clientes } from "../pages/Clientes";
import { Quartos } from "../pages/Quartos"; 
import { Reservas } from "../pages/Reservas";
import Dashboard from "../pages/Dashboard"; 
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthProvider } from "../context/AuthContext";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/clientes" element={<Clientes />} />
             <Route path="/quartos" element={<Quartos />} /> 
             <Route path="/reservas" element={<Reservas />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};