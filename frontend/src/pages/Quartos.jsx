import { useEffect, useState } from "react";
import api from "../services/api";

export const Quartos = () => {
  const [quartos, setQuartos] = useState([]);
  const [novoQuarto, setNovoQuarto] = useState({ 
    numero: "", 
    tipo: "single", 
    preco_diaria: "" 
  });

  const loadQuartos = async () => {
    try {
      const res = await api.get("/quartos");
      setQuartos(res.data);
    } catch (err) {
      alert("Erro ao buscar quartos.");
    }
  };

  useEffect(() => { loadQuartos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/quartos", novoQuarto);
      setNovoQuarto({ numero: "", tipo: "single", preco_diaria: "" }); 
      loadQuartos(); 
      alert("Quarto cadastrado!");
    } catch (err) {
      alert("Erro: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este quarto?")) {
      try {
        await api.delete(`/quartos/${id}`);
        loadQuartos();
      } catch (err) {
        alert("Erro ao excluir. Verifique se não há reservas neste quarto.");
      }
    }
  };

  return (
    <div>
      <h2>Gerenciar Quartos</h2>

      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          
          <input 
            placeholder="Número do Quarto (ex: 101)" 
            value={novoQuarto.numero} 
            onChange={e => setNovoQuarto({...novoQuarto, numero: e.target.value})} 
            required 
          />

          <select 
            value={novoQuarto.tipo} 
            onChange={e => setNovoQuarto({...novoQuarto, tipo: e.target.value})}
          >
            <option value="single">Single</option>
            <option value="casal">Casal</option>
            <option value="luxo">Luxo</option>
          </select>

          <input 
            type="number"
            placeholder="Preço Diária (R$)" 
            value={novoQuarto.preco_diaria} 
            onChange={e => setNovoQuarto({...novoQuarto, preco_diaria: e.target.value})} 
            required 
          />

          <button type="submit">Salvar Quarto</button>
        </div>
      </form>
      <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Número</th>
            <th>Tipo</th>
            <th>Diária</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {quartos.map(quarto => (
            <tr key={quarto.id}>
              <td>{quarto.numero}</td>
              <td>{quarto.tipo.toUpperCase()}</td>
              <td>R$ {quarto.preco_diaria}</td>
              <td style={{ color: quarto.disponibilidade ? 'green' : 'red' }}>
                {quarto.disponibilidade ? 'Livre' : 'Ocupado'}
              </td>
              <td>
                <button onClick={() => handleDelete(quarto.id)} style={{ color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};