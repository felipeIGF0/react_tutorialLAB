import Button from "./Button";
import Badge from "./Badge";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

const TaskList = ({ 
  tareas, 
  filtro, 
  onCambiarFiltro,
  busqueda, 
  onCambiarBusqueda, 
  onEliminar, 
  onEditar, 
  onToggle,
  operacionEnCurso
}) => {
  return (
    <div className="card">
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => onCambiarBusqueda(e.target.value)}
          placeholder="🔍 Buscar tarea por título..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "0.95rem",
            outline: "none",
            backgroundColor: "#ffffff",
            color: "black"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <Button 
          label="📑 Todas" 
          onClick={() => onCambiarFiltro("todas")} 
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button 
          label="⏳ Pendientes" 
          onClick={() => onCambiarFiltro("pendientes")} 
          variant={filtro === "pendientes" ? "primary" : "secondary"} 
        />
        <Button 
          label="✅ Completadas" 
          onClick={() => onCambiarFiltro("completadas")} 
          variant={filtro === "completadas" ? "primary" : "secondary"} 
        />
      </div>

      {tareas.length === 0 ? (
        <EmptyState
          icono="📝" 
          mensaje={busqueda ? "No hay tareas que coincidan con la búsqueda" : "No hay tareas en esta categoría"}
        />
      ) : ( 
        <ul className="task-list">
          {tareas.map((tarea) => (
            <li key={tarea.id} className="task-item">
              <span>
                <Badge 
                  texto={tarea.completada ? "completada" : "pendiente"}
                  onClick={() => onToggle(tarea.id, tarea.completada)} 
                />
              </span>

              <TaskItem tarea={tarea} onEditar={onEditar} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {tarea.completada ? (<span>✅</span>) : (<span>❌</span>)}
                <Button 
                  label={tarea.completada ? "Desmarcar" : "Completar"} 
                  onClick={() => onToggle(tarea.id, tarea.completada)} 
                  variant={tarea.completada ? "success" : "primary"}
                  disabled={operacionEnCurso}  
                />
                <Button 
                  label="Eliminar" 
                  onClick={() => onEliminar(tarea.id)} 
                  variant="danger" 
                  disabled={operacionEnCurso} 
                />
              </div>
            </li>
          ))}
        </ul> 
      )}
    </div>
  );
};

export default TaskList;