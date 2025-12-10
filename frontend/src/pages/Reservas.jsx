import { useEffect, useState } from "react";
import api from "../api/api";
import { Navbar } from "../components/Navbar";

export const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [form, setForm] = useState({ cliente_id: "", quarto_id: "", data_entrada: "", data_saida: "" });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
      const [res, cli, qua] = await Promise.all([
          api.get("/reservas"),
          api.get("/clientes"),
          api.get("/quartos")
      ]);
      setReservas(res.data);
      setClientes(cli.data);
      setQuartos(qua.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservas", form);
      alert("✅ Reserva realizada com sucesso!");
      setForm({ cliente_id: "", quarto_id: "", data_entrada: "", data_saida: "" });
      refreshData();
    } catch (error) {
      alert("❌ " + (error.response?.data?.error || "Erro ao criar reserva"));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        
        {/* Card do Formulário */}
        <div className="card">
          <h2>📅 Nova Reserva</h2>
          <form onSubmit={handleCreate}>
            <div className="form-group">
                <label>Hóspede</label>
                <select 
                    value={form.cliente_id} 
                    onChange={e => setForm({...form, cliente_id: e.target.value})} 
                    required
                >
                    <option value="">Selecione...</option>
                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome} - CPF: {c.documento}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label>Quarto</label>
                <select 
                    value={form.quarto_id} 
                    onChange={e => setForm({...form, quarto_id: e.target.value})} 
                    required
                >
                    <option value="">Selecione...</option>
                    {quartos.map(q => (
                        <option key={q.id} value={q.id} disabled={!q.disponibilidade} style={{color: q.disponibilidade ? 'black' : '#ccc'}}>
                            Quarto {q.numero} ({q.tipo}) - R$ {q.preco_diaria} {!q.disponibilidade && "⛔ Ocupado"}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Check-in</label>
                <input type="date" value={form.data_entrada} onChange={e => setForm({...form, data_entrada: e.target.value})} required />
            </div>

            <div className="form-group">
                <label>Check-out</label>
                <input type="date" value={form.data_saida} onChange={e => setForm({...form, data_saida: e.target.value})} required />
            </div>

            <button type="submit">Confirmar Reserva</button>
          </form>
        </div>

        {/* Card da Lista */}
        <div className="card">
            <h2>Histórico de Reservas</h2>
            <ul>
            {reservas.length === 0 && <p style={{color: '#666', fontStyle: 'italic'}}>Nenhuma reserva encontrada.</p>}
            
            {reservas.map(r => (
                <li key={r.id}>
                    <div className="info-group">
                        <strong>{r.Cliente?.nome || "Cliente Removido"}</strong>
                        <small>Quarto: {r.Quarto?.numero} • Entrada: {r.data_entrada} • Saída: {r.data_saida}</small>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <span className="tag success" style={{fontSize: '1rem'}}>R$ {r.valor_total}</span>
                    </div>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
};