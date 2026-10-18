import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
}

const TaskList = ({ tareas, onCompletar, onEliminar, onEditar }) => {
    const [filtro, setFiltro] = useState("todas");

    const tareasFiltradas = tareas.filter((t) => {
      if (filtro === "pendientes") return !t.completada;
      if (filtro === "completadas") return t.completada;
      return true;
    });

    const handleCompletar = (id, completadaActual) => {
      if (onToggle) {
        onToggle(id, completadaActual);
      } else if (onCompletar) {
        onCompletar(id);
      }
    };

    return (
      <div className="card">
        <h2 className="section-title">Listado de tareas</h2>

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button 
            label="📑 Todas" 
            onClick={() => setFiltro("todas")} 
            variant={filtro === "todas" ? "primary" : "secondary"}
          />
          <Button 
            label="⏳ Pendientes" 
            onClick={() => setFiltro("pendientes")} 
            variant={filtro === "pendientes" ? "primary" : "secondary"} 
          />
          <Button 
            label="✅ Completadas" 
            onClick={() => setFiltro("completadas")} 
            variant={filtro === "completadas" ? "primary" : "secondary"} 
          />
        </div>

        {tareasFiltradas.length === 0 && (
          <EmptyState
            icono="📝" mensaje="No hay tareas en esta categoría"
          />
        )}  
        
        <ul className="task-list">
          {tareasFiltradas.map((tarea) => (
            <li key={tarea.id} className="task-item">
              <span>
                <Badge 
                  texto={tarea.completada ? "completada" : "pendiente"}
                  onClick={() => onCompletar(tarea.id)} 
                />
              </span>

              <TaskItem tarea={tarea} onEditar={onEditar} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {tarea.completada ? (<span>✅</span>) : (<span>❌</span>)}
                <Button 
                  label={tarea.completada ? "Desmarcar" : "Completar"} 
                  onClick={() => handleCompletar(tarea.id, tarea.completada)} 
                  variant={tarea.completada ? "success" : "primary"} 
                />
                <Button 
                  label="Eliminar" 
                  onClick={() => onEliminar(tarea.id)} 
                  variant="danger" 
                />
              </div>
            </li>
          ))}
        </ul>   
      </div>
    )
}

export default TaskList