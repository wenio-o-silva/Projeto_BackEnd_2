import { useEffect, useState } from "react";
import api from "../api/api";
import { Navbar } from "../components/Navbar";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", email: "", telefone: "", documento: "" });

  const loadClientes = async () => {
    try {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } catch (error) {
      alert("Erro ao carregar clientes");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clientes", novoCliente);
      setNovoCliente({ nome: "", email: "", telefone: "", documento: "" }); // Limpa form
      loadClientes(); // Recarrega lista
    } catch (error) {
      alert("Erro ao criar cliente");
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Tem certeza?")) {
        await api.delete(`/clientes/${id}`);
        loadClientes();
    }
  };

  useEffect(() => { loadClientes(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Gerenciar Clientes</h2>
        
        {/* Formulário */}
        <form onSubmit={handleCreate} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input placeholder="Nome" value={novoCliente.nome} onChange={e => setNovoCliente({...novoCliente, nome: e.target.value})} required />
          <input placeholder="Email" value={novoCliente.email} onChange={e => setNovoCliente({...novoCliente, email: e.target.value})} required />
          <input placeholder="Documento" value={novoCliente.documento} onChange={e => setNovoCliente({...novoCliente, documento: e.target.value})} required />
          <button type="submit">Cadastrar</button>
        </form>

        {/* Lista */}
        <ul>
          {clientes.map(c => (
            <li key={c.id} style={{ marginBottom: '10px' }}>
              {c.nome} ({c.email}) 
              <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px', color: 'red' }}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};