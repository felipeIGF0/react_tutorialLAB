import { useState, useEffect } from "react";
import './App.css';

import Header from "./components/Header";
import Card from "./components/Card";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import useTareas from "./hooks/useTareas";

import Navigation from "./components/Navigation";
import SummaryView from "./views/SummaryView";
import TaskView from "./views/TaskView";
import NewTaskView from "./views/NewTaskView";

const App = () => {
  const { 
    tareas, 
    cargando, 
    error, 
    operacionEnCurso,
    crearTarea, 
    actualizarTarea, 
    eliminarTarea,
    editarTitulo
  } = useTareas();

  const [vistaActiva, setVistaActiva] = useState("resumen");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  const tareasFiltradas = tareas.filter((t) => {
    const coincideEstado = 
      filtro === "todas" ? true :
      filtro === "completadas" ? t.completada :
      !t.completada;
      
    const tituloTarea = (t.titulo || "").toLowerCase();
    const textoBusqueda = (busqueda || "").toLowerCase();
    const coincideTexto = tituloTarea.includes(textoBusqueda);

    return coincideEstado && coincideTexto; 
  });

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAgregarTarea = (titulo) => {
    crearTarea(titulo);
  };

  const handleToggleCompletada = (id, completadaActual) => {
    actualizarTarea(id, { completada: !completadaActual });
  };

  const handleConfirmarEliminacion = () => {
    eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />

      <Navigation
        vistaActiva={vistaActiva}
        onCambiarVista={setVistaActiva}
      />

      {vistaActiva === "resumen" && (
        <SummaryView
          total={tareas.length}
          completadas={tareas.filter((t) => t.completada).length}
          pendientes={tareas.filter((t) => !t.completada).length}
          mostrando={tareasFiltradas.length}
          filtroActual={filtro}
        />
      )}

      {vistaActiva === "tareas" && (
        <TaskView
          tareas={tareasFiltradas}
          filtro={filtro}
          onCambiarFiltro={setFiltro}
          busqueda={busqueda}
          onCambiarBusqueda={setBusqueda}
          onToggle={handleToggleCompletada}
          onEliminar={setTareaAEliminar}
          onEditar={editarTitulo}
          cargando={cargando}
          error={error}
          operacionEnCurso={operacionEnCurso}
        />
      )}

      {vistaActiva === "nueva" && (
        <NewTaskView 
          onAgregar={async (titulo) => {
            await crearTarea(titulo);
            setVistaActiva("tareas");
          }}
          operacionEnCurso={operacionEnCurso} 
        />
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar estar tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  )
};

export default App