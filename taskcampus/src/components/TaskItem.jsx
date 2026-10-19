import { useState } from "react";

const TaskItem = ({ tarea, onEditar }) => {
  const [editando, setEditando] = useState(false);
  const [textoEdicion, setTextoEdicion] = useState(tarea.titulo);
  const [errorEdicion, setErrorEdicion] = useState("");

  const guardarEdicion = () => {
    const textoLimpio = textoEdicion.trim();

    if (textoLimpio === "") {
      setErrorEdicion("El título no puede estar vacío");
      return;
    }

    if (textoLimpio !== tarea.titulo) {
      onEditar(tarea.id, textoLimpio);
    }
    
    setErrorEdicion("");
    setEditando(false);
  };

  const cancelarEdicion = () => {
    setTextoEdicion(tarea.titulo);
    setErrorEdicion("");
    setEditando(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") guardarEdicion();
    if (e.key === "Escape") cancelarEdicion();
  };

  // Si estamos editando → input, si no → texto clickeable
  if (editando) {
    return (
      <div style={{ flex: 1, marginLeft: "10px" }}>
        <input
          type="text"
          value={textoEdicion}
          onChange={(e) => {
            setTextoEdicion(e.target.value);
            if (errorEdicion) setErrorEdicion("");
          }}
          onBlur={guardarEdicion}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            marginLeft: "10px",
            padding: "4px 8px",
            borderRadius: "6px",
            border: errorEdicion ? "1.5px solid #dc2626" : "1px solid #93c5fd",
            fontSize: "0.95rem",
            outline: "none"
          }}
        />
        {errorEdicion && (
          <p style={{ color: "#dc2626", fontSize: "0.75rem", margin: "2px 0 0 0" }}>
            {errorEdicion}
          </p>
        )}
      </div>
    );
  }

  return (
    <span
      onClick={() => setEditando(true)}
      style={{
        marginLeft: "10px",
        textDecoration: tarea.completada ? "line-through" : "none",
        color: tarea.completada ? "#94a3b8" : "inherit",
        cursor: "pointer"
      }}
      title="Haz clic para editar"
    >
      {tarea.titulo}
    </span>
  );
};

export default TaskItem;