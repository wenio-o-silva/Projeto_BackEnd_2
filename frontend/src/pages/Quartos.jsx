import { useEffect, useState } from "react";
import api from "../api/api";
import { Navbar } from "../components/Navbar";

export const Quartos = () => {
  const [quartos, setQuartos] = useState([]);
  // Estados para o formulário
  const [form, setForm] = useState({ numero: "", tipo: "solteiro", preco_diaria: "" });

  const loadQuartos = async () => {
    try {
      const response = await api.get("/quartos");
      setQuartos(response.data);
    } catch (error) {
      console.error("Erro ao carregar quartos");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/quartos", form);
      setForm({ numero: "", tipo: "solteiro", preco_diaria: "" });
      alert("Quarto cadastrado!");
      loadQuartos();
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja excluir este quarto?")) {
      await api.delete(`/quartos/${id}`);
      loadQuartos();
    }
  };

  useEffect(() => { loadQuartos(); }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Gerenciar Quartos</h2>
          <form onSubmit={handleCreate}>
            <div>
                <label>Número do Quarto</label>
                <input 
                    placeholder="Ex: 101" 
                    value={form.numero} 
                    onChange={e => setForm({...form, numero: e.target.value})} 
                    required 
                />
            </div>
            
            <div>
                <label>Tipo</label>
                <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
                    <option value="single">Solteiro </option>
                    <option value="casal">Casal</option>
                    <option value="luxo">Luxo</option>
                </select>
            </div>

            <div>
                <label>Preço Diária (R$)</label>
                <input 
                    type="number" 
                    placeholder="0.00" 
                    value={form.preco_diaria} 
                    onChange={e => setForm({...form, preco_diaria: e.target.value})} 
                    required 
                />
            </div>

            <button type="submit">Salvar Quarto</button>
          </form>
        </div>

        <div className="card">
          <h3>Lista de Quartos</h3>
          <ul>
            {quartos.map(q => (
              <li key={q.id}>
                <div>
                    <strong>Quarto {q.numero}</strong> - {q.tipo.toUpperCase()} 
                    <br/> 
                    <small>R$ {q.preco_diaria} / dia — {q.disponibilidade ? "🟢 Disponível" : "🔴 Ocupado"}</small>
                </div>
                <button className="danger" onClick={() => handleDelete(q.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};