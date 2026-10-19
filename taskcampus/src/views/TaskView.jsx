import Card from "../components/Card";
import TaskList from "../components/TaskList";

const TaskView = ({ 
  tareas, 
  filtro, 
  onCambiarFiltro, 
  busqueda,
  onCambiarBusqueda,
  onToggle, 
  onEliminar, 
  onEditar, 
  cargando, 
  error,
  operacionEnCurso={operacionEnCurso}
}) => {
  if (cargando) return <p className="estado-carga">Cargando tareas...</p>;
  if (error) return <p className="estado-error">Error: {error}</p>;

  return (
    <Card titulo="Mis tareas">
      <TaskList
        tareas={tareas}
        filtro={filtro}
        onCambiarFiltro={onCambiarFiltro}
        busqueda={busqueda}
        onCambiarBusqueda={onCambiarBusqueda}
        onToggle={onToggle}
        onEliminar={onEliminar}
        onEditar={onEditar}
        operacionEnCurso={operacionEnCurso}
      />
    </Card>
  );
};

export default TaskView;