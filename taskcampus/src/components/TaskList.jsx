import { useState } from "react";

function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
}

const TaskList = ({ tareas, onCompletar, error }) => {
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [filtro, setFiltro] = useState("todas");

    const tareasFiltradas = tareas.filter((t) => {
        if (filtro === "pendientes") return !t.completada;
        if (filtro === "completadas") return t.completada;
        return true;
    });

    return (
        <div className="card">
          <h2 className="section-title">Listado de tareas</h2>

          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <button className="task-button" onClick={() => setFiltro("todas")}>Todas</button>
            <button className="task-button" onClick={() => setFiltro("pendientes")}>Pendientes</button>
            <button className="task-button" onClick={() => setFiltro("completadas")}>Completas</button>
          </div>

          <button 
            className="task-button"
            onClick={() => setMostrarDetalle(!mostrarDetalle)}>
              {mostrarDetalle ? "Ocultar detalle": "Ver detalle"}
          </button>

            {mostrarDetalle && (
                <ul className="task-list">
                    {tareasFiltradas.map((tarea) => (
                        <li className="task-item" key={tarea.id}>
                          <span>{tarea.titulo}</span> 
                          {tarea.completada ? 
                              ":)" : ":("
                          }
                          <button className="task-button" onClick={() => onCompletar(tarea.id)}>
                              Seleccionar
                          </button>
                        </li>
                    ))}
                </ul>
            )}

            {tareasFiltradas.length === 0 && (<p>No hay tareas en esta categoría</p>)}     
        </div>
    )
}

export default TaskList