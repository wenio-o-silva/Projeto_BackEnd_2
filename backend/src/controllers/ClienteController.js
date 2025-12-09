import { Cliente } from "../database/models/Cliente.js";

class ClienteController {

  validateCliente(data) {
    const errors = [];

    if (!data.nome || data.nome.trim() === "") {
      errors.push("Nome é obrigatório.");
    }

    if (!data.email || data.email.trim() === "") {
      errors.push("Email é obrigatório.");
    }

    if (
      data.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      errors.push("Email inválido.");
    }

    if (!data.telefone || data.telefone.trim() === "") {
      errors.push("Telefone é obrigatório.");
    }

    if (!data.documento || data.documento.trim() === "") {
      errors.push("Documento é obrigatório.");
    }

    return errors;
  }

  async create(req, res) {
    try {
      const errors = this.validateCliente(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
      }

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

      // validação manual antes de atualizar
      const errors = this.validateCliente(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          messages: errors
        });
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