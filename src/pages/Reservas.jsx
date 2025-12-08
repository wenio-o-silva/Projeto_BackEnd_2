import { useEffect, useState } from "react";
import api from "../services/api";

export const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [quartos, setQuartos] = useState([]);

  const [novaReserva, setNovaReserva] = useState({ 
    cliente_id: "", 
    quarto_id: "", 
    data_entrada: "", 
    data_saida: "" 
  });


  const loadData = async () => {
    try {

      const [resReservas, resClientes, resQuartos] = await Promise.all([
        api.get("/reservas"),
        api.get("/clientes"),
        api.get("/quartos")
      ]);

      setReservas(resReservas.data);
      setClientes(resClientes.data);
      setQuartos(resQuartos.data);
    } catch (err) {
      alert("Erro ao carregar dados.");
    }
  };

  useEffect(() => { loadData(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservas", novaReserva);
      setNovaReserva({ cliente_id: "", quarto_id: "", data_entrada: "", data_saida: "" });
      loadData(); 
      alert("Reserva realizada com sucesso!");
    } catch (err) {

      alert("Erro: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Cancelar esta reserva?")) {
      try {
        await api.delete(`/reservas/${id}`);
        loadData();
      } catch (err) {
        alert("Erro ao cancelar reserva.");
      }
    }
  };

  return (
    <div>
      <h2>Gerenciar Reservas</h2>

      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '5px' }}>
        <h3>Nova Reserva</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          
          
          <select 
            value={novaReserva.cliente_id} 
            onChange={e => setNovaReserva({...novaReserva, cliente_id: e.target.value})}
            required
          >
            <option value="">Selecione o Cliente...</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome} (CPF: {c.documento})</option>
            ))}
          </select>

          
          <select 
            value={novaReserva.quarto_id} 
            onChange={e => setNovaReserva({...novaReserva, quarto_id: e.target.value})}
            required
          >
            <option value="">Selecione o Quarto...</option>
            {quartos.map(q => (
              <option key={q.id} value={q.id}>Quarto {q.numero} ({q.tipo}) - R${q.preco_diaria}</option>
            ))}
          </select>

          <div>
            <label>Check-in:</label>
            <input 
              type="date" 
              value={novaReserva.data_entrada} 
              onChange={e => setNovaReserva({...novaReserva, data_entrada: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label>Check-out:</label>
            <input 
              type="date" 
              value={novaReserva.data_saida} 
              onChange={e => setNovaReserva({...novaReserva, data_saida: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" style={{ gridColumn: 'span 2', marginTop: '10px' }}>Confirmar Reserva</button>
        </div>
      </form>

      
      <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Cliente</th>
            <th>Quarto</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id}>
              {}
              <td>{reserva.Cliente ? reserva.Cliente.nome : 'Cliente removido'}</td>
              <td>{reserva.Quarto ? `Nº ${reserva.Quarto.numero}` : 'Quarto removido'}</td>
              <td>{new Date(reserva.data_entrada).toLocaleDateString()}</td>
              <td>{new Date(reserva.data_saida).toLocaleDateString()}</td>
              <td>R$ {reserva.valor_total}</td>
              <td>
                <button onClick={() => handleDelete(reserva.id)} style={{ color: 'red' }}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};