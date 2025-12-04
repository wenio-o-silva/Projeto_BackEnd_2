import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import bcrypt from "bcrypt";

export const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Antes de salvar, gerar hash da senha
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});