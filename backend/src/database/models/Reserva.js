import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Cliente } from "./Cliente.js";
import { Quarto } from "./Quarto.js";

export const Reserva = sequelize.define("Reserva", {
  data_entrada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_saida: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

// RELACIONAMENTOS
Cliente.hasMany(Reserva, { foreignKey: "cliente_id" });
Reserva.belongsTo(Cliente, { foreignKey: "cliente_id" });

Quarto.hasMany(Reserva, { foreignKey: "quarto_id" });
Reserva.belongsTo(Quarto, { foreignKey: "quarto_id" });