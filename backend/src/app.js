import express from "express";
import cors from "cors"; // <--- Importante
import authRoutes from "./routes/auth.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import quartoRoutes from "./routes/quarto.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

// Libera o acesso para o Frontend
app.use(cors()); 
app.use(express.json());

// Rotas Públicas
app.use("/auth", authRoutes);

// Rotas Privadas (Protegidas)
app.use(authMiddleware);
app.use("/clientes", clienteRoutes);
app.use("/quartos", quartoRoutes);
app.use("/reservas", reservaRoutes);

export default app;