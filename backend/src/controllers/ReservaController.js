import { Reserva } from "../database/models/Reserva.js";
import { Cliente } from "../database/models/Cliente.js";
import { Quarto } from "../database/models/Quarto.js";
import { calculateTotal } from "../utils/calculateTotal.js";

class ReservaController {

  validateReserva(data) {
    const errors = [];

    if (!data.cliente_id) {
      errors.push("cliente_id é obrigatório.");
    }

    if (!data.quarto_id) {
      errors.push("quarto_id é obrigatório.");
    }

    if (!data.data_entrada) {
      errors.push("data_entrada é obrigatória.");
    }

    if (!data.data_saida) {
      errors.push("data_saida é obrigatória.");
    }

    // validar formato de datas
    const entrada = new Date(data.data_entrada);
    const saida = new Date(data.data_saida);

    if (isNaN(entrada.getTime())) {
      errors.push("data_entrada inválida.");
    }

    if (isNaN(saida.getTime())) {
      errors.push("data_saida inválida.");
    }

    // validar ordem das datas (entrada < saída)
    if (!isNaN(entrada.getTime()) && !isNaN(saida.getTime())) {
      if (entrada >= saida) {
        errors.push("data_saida deve ser maior que data_entrada.");
      }
    }

    return errors;
  }

  async create(req, res) {
    try {
      const { cliente_id, quarto_id, data_entrada, data_saida } = req.body;

      const errors = this.validateReserva(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ error: "Erro de validação", messages: errors });
      }

      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      const quarto = await Quarto.findByPk(quarto_id);
      if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
      }

      if (!quarto.disponibilidade) {
        return res.status(400).json({ error: "Quarto indisponível" });
      }

      // Calcular valor total
      const valor_total = calculateTotal(
        Number(quarto.preco_diaria),
        data_entrada,
        data_saida
      );

      const reserva = await Reserva.create({
        cliente_id,
        quarto_id,
        data_entrada,
        data_saida,
        valor_total
      });

      return res.status(201).json(reserva);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Cliente },
          { model: Quarto }
        ]
      });

      return res.json(reservas);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
      }

      const errors = this.validateReserva(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ error: "Erro de validação", messages: errors });
      }

      const { cliente_id, quarto_id, data_entrada, data_saida } = req.body;

      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      const quarto = await Quarto.findByPk(quarto_id);
      if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
      }

      // Verificar disponibilidade se trocar o quarto
      if (quarto_id !== reserva.quarto_id && !quarto.disponibilidade) {
        return res.status(400).json({ error: "Quarto indisponível" });
      }

      const valor_total = calculateTotal(
        Number(quarto.preco_diaria),
        data_entrada,
        data_saida
      );

      await reserva.update({
        cliente_id,
        quarto_id,
        data_entrada,
        data_saida,
        valor_total
      });

      return res.json(reserva);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id);

      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
      }

      await reserva.destroy();
      return res.json({ message: "Reserva deletada com sucesso." });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new ReservaController();