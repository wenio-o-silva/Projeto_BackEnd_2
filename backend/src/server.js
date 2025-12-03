import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("📌 Banco conectado com sucesso!");

    // força criação das tabelas (ideal para testes)
    await sequelize.sync({ alter: true });

    app.listen(PORT, () =>
      console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err.message);
  }
}

start();