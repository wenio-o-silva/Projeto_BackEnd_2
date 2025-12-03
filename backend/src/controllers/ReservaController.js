import { Reserva } from "../database/models/Reserva.js";
import { Cliente } from "../database/models/Cliente.js";
import { Quarto } from "../database/models/Quarto.js";
import { calculateTotal } from "../utils/calculateTotal.js";

class ReservaController {

  async create(req, res) {
    try {
      const { cliente_id, quarto_id, data_entrada, data_saida } = req.body;

      // Verificar cliente
      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      // Verificar quarto
      const quarto = await Quarto.findByPk(quarto_id);
      if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
      }

      // Verificar disponibilidade simples
      if (!quarto.disponibilidade) {
        return res.status(400).json({ error: "Quarto indisponível" });
      }

      // Calcular valor total
      const valor_total = calculateTotal(
        Number(quarto.preco_diaria),
        data_entrada,
        data_saida
      );

      // Criar reserva
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

      await reserva.update(req.body);
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