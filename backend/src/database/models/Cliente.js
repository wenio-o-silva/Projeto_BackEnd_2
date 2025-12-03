import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Cliente = sequelize.define("Cliente", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
});
