import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Quarto = sequelize.define("Quarto", {
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM("single", "casal", "luxo"),
    allowNull: false
  },
  preco_diaria: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  disponibilidade: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});
