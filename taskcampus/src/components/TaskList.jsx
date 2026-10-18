import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

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
            <Button label="Todas" onClick={() => setFiltro("todas")} variant="primary" />
            <Button label="Pendientes" onClick={() => setFiltro("pendientes")} variant="primary" />
            <Button label="Completadas" onClick={() => setFiltro("completadas")} variant="primary" />
          </div>

          <button 
            className="task-button"
            onClick={() => setMostrarDetalle(!mostrarDetalle)}>
              {mostrarDetalle ? "Ocultar detalle": "Ver detalle"}
          </button>

          {mostrarDetalle && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                  {tareasFiltradas.map((tarea) => (
                      <li 
                        key={tarea.id}
                        className="task-item" 
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <span
                          style={{
                              textDecoration: tarea.completada ? "line-through" : "none",
                              color: tarea.completada ? "#94a3b80" : "inherit",}}>
                            <Badge texto={tarea.completada ? "completada" : "pendiente"} />
                            {tarea.titulo}
                        </span>
                        {tarea.completada ? 
                            ":)" : ":("
                        }
                        <Button label="Completar" onClick={() => onCompletar(tarea.id)} variant="primary" />

                        <Button label="Eliminar" onClick={() => onEliminar(tarea.id)} variant="danger" />
                      </li>
                  ))}
              </ul>
          )}

          {tareasFiltradas.length === 0 && (<p>No hay tareas en esta categoría</p>)}     
        </div>
    )
}

export default TaskList