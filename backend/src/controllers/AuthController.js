import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../database/models/User.js";
import authConfig from "../config/auth.js";

class AuthController {

  // 🔹 Função interna de validação manual
  validateRegister(data) {
    const errors = [];

    if (!data.username || data.username.trim() === "") {
      errors.push("Username é obrigatório.");
    }

    if (!data.password || data.password.trim() === "") {
      errors.push("Senha é obrigatória.");
    }

    if (data.password && data.password.length < 4) {
      errors.push("A senha deve conter pelo menos 4 caracteres.");
    }

    return errors;
  }

  validateLogin(data) {
    const errors = [];

    if (!data.username || data.username.trim() === "") {
      errors.push("Username é obrigatório.");
    }

    if (!data.password || data.password.trim() === "") {
      errors.push("Senha é obrigatória.");
    }

    return errors;
  }

  // ---------------------------------------------------------
  async register(req, res) {
    try {
      // 🔹 Validação manual
      const errors = this.validateRegister(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
      }

      const { username, password } = req.body;

      // Verificar se já existe
      const exists = await User.findOne({ where: { username } });
      if (exists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criar usuário
      const user = await User.create({ username, password });

      return res.status(201).json({
        id: user.id,
        username: user.username
      });

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // ---------------------------------------------------------
  async login(req, res) {
    try {
      // 🔹 Validação manual
      const errors = this.validateLogin(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
      }

      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // Gerar token
      const token = jwt.sign(
        { id: user.id },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      );

      return res.json({
        id: user.id,
        username: user.username,
        token
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ---------------------------------------------------------
  async logout(req, res) {
    return res.json({ message: "Logout realizado com sucesso." });
  }
}

export default new AuthController();