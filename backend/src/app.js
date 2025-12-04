import express from "express";
import authRoutes from "./routes/auth.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import quartoRoutes from "./routes/quarto.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/quartos", quartoRoutes);
app.use("/reservas", reservaRoutes);

export default app;