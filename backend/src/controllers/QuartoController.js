import { Quarto } from "../database/models/Quarto.js";

class QuartoController {
  async create(req, res) {
    try {
      const quarto = await Quarto.create(req.body);
      return res.status(201).json(quarto);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const quartos = await Quarto.findAll();
      return res.json(quartos);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const quarto = await Quarto.findByPk(id);
      if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
      }

      await quarto.update(req.body);
      return res.json(quarto);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const quarto = await Quarto.findByPk(id);
      if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
      }

      await quarto.destroy();
      return res.json({ message: "Quarto deletado com sucesso." });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new QuartoController();