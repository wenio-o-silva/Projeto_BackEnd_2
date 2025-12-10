import app from "./app.js";
import { sequelize } from "./config/database.js";
import { User } from "./database/models/User.js"; // Importando o Model

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("📌 Banco conectado!");

    // Sincroniza e cria tabelas se não existirem
    await sequelize.sync({ alter: true });

    // --- CRIAÇÃO AUTOMÁTICA DO ADMIN ---
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      await User.create({ username: "admin", password: "123" });
      console.log("✅ Usuário ADMIN criado: (admin / 123)");
    }
    // ------------------------------------

    app.listen(PORT, () =>
      console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error("❌ Erro fatal:", err.message);
  }
}

start();