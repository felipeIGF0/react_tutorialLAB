import { useState } from "react";

const TaskItem = ({ tarea, onEditar }) => {
  const [editando, setEditando] = useState(false);
  const [textoEdicion, setTextoEdicion] = useState(tarea.titulo);

  const guardarEdicion = () => {
    const textoLimpio = textoEdicion.trim();

    if (textoLimpio === "" || textoLimpio === tarea.titulo) {
      setTextoEdicion(tarea.titulo);
      setEditando(false);
      return;
    }

    onEditar(tarea.id, textoLimpio);
    setEditando(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") guardarEdicion();
  };

  // Si estamos editando → input, si no → texto clickeable
  if (editando) {
    return (
      <input
        type="text"
        value={textoEdicion}
        onChange={(e) => setTextoEdicion(e.target.value)}
        onBlur={guardarEdicion}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{
          flex: 1,
          marginLeft: "10px",
          padding: "4px 8px",
          borderRadius: "6px",
          border: "1px solid #93c5fd",
          fontSize: "0.95rem",
          outline: "none"
        }}
      />
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