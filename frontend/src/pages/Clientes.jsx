import { useEffect, useState } from "react";
import api from "../services/api";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", email: "", telefone: "", documento: "" });

  // Carregar clientes
  const loadClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (err) {
      alert("Erro ao buscar clientes");
    }
  };

  useEffect(() => { loadClientes(); }, []);

  // Criar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clientes", novoCliente);
      setNovoCliente({ nome: "", email: "", telefone: "", documento: "" });
      loadClientes(); 
    } catch (err) {
      alert("Erro ao cadastrar: " + err.response?.data?.error);
    }
  };

  // Deletar cliente
  const handleDelete = async (id) => {
    if (confirm("Tem certeza?")) {
      await api.delete(`/clientes/${id}`);
      loadClientes();
    }
  };

  return (
    <div>
      <h2>Gerenciar Clientes</h2>
      
      {}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'grid', gap: '10px', maxWidth: '400px' }}>
        <input placeholder="Nome" value={novoCliente.nome} onChange={e => setNovoCliente({...novoCliente, nome: e.target.value})} required />
        <input placeholder="Email" value={novoCliente.email} onChange={e => setNovoCliente({...novoCliente, email: e.target.value})} required />
        <input placeholder="Documento" value={novoCliente.documento} onChange={e => setNovoCliente({...novoCliente, documento: e.target.value})} />
        <button type="submit">Cadastrar</button>
      </form>

      {}
      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};