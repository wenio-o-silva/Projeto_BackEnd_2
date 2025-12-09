import { Quarto } from "../database/models/Quarto.js";

class QuartoController {

  validateQuarto(data) {
    const errors = [];

    if (!data.numero || data.numero.trim() === "") {
      errors.push("Número do quarto é obrigatório.");
    }

    const tiposValidos = ["single", "casal", "luxo"];
    if (!data.tipo || !tiposValidos.includes(data.tipo)) {
      errors.push("Tipo inválido. Valores válidos: single, casal, luxo.");
    }

    if (data.preco_diaria == null || data.preco_diaria === "") {
      errors.push("Preço da diária é obrigatório.");
    } else if (isNaN(data.preco_diaria) || Number(data.preco_diaria) <= 0) {
      errors.push("Preço da diária deve ser um número maior que zero.");
    }

    if (typeof data.disponibilidade !== "boolean") {
      errors.push("Disponibilidade deve ser true ou false.");
    }

    return errors;
  }

  async create(req, res) {
    try {
      const errors = this.validateQuarto(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
      }

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

      const errors = this.validateQuarto(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
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