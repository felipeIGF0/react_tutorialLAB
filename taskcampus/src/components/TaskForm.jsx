import { useState } from "react";

const TaskForm = ({ onAgregar }) => {
    const [titulo, setTitulo] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (titulo.trim() === "") {
            setError("El titulo de la tarea no puede estar vacio.");
            return;
        }

        onAgregar(titulo.trim());
        setTitulo("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="card">
          <h2 className="section-title">Agregar nueva tarea</h2>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input 
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Estudiar para prueba de física"
              style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }} 
            />

            <button className="task-button" type="submit">Agregar</button>
          </div>

          {error && <p style={{ color: "red", fontSize: "0.875rem"}}>{error}</p>}
        </form>
    );
};

export default TaskForm;