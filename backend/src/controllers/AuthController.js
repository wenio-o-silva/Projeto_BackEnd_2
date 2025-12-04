import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../database/models/User.js";
import authConfig from "../config/auth.js";

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      const exists = await User.findOne({ where: { username } });
      if (exists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const user = await User.create({ username, password });

      return res.status(201).json({
        id: user.id,
        username: user.username
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
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
}

export default new AuthController();