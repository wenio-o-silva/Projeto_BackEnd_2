import { Cliente } from "../database/models/Cliente.js";

class ClienteController {
  async create(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      return res.status(201).json(cliente);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const clientes = await Cliente.findAll();
      return res.json(clientes);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      await cliente.update(req.body);

      return res.json(cliente);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      await cliente.destroy();

      return res.json({ message: "Cliente deletado com sucesso." });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new ClienteController();