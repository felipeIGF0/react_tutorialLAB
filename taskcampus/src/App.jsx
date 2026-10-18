import { useState, useEffect } from "react";
import './App.css';

import Card from "./components/Card";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import Footer from "./components/Footer";
import AcctionButton from "./components/ActionButton";
import TaskForm from "./components/TaskForm";
import useTareas from "./hooks/useTareas";

const App = () => {
  const { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea } = useTareas();
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

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

      <Card titulo="Resumen de tareas">
        <TaskSummary 
          total={tareas.length}
          completadas={tareas.filter((t) => t.completada).length} 
          pendientes={tareas.filter((t) => !t.completada).length} 
        />
      </Card>
      
      <TaskForm onAgregar={handleAgregarTarea} />

      {cargando && <p className="estado-carga">Cargando tareas...</p>}
      {error && <p className="estado-error">Error: {error}</p>}

      {!cargando && !error && (
        <Card titulo="Mis tareas">
          <TaskList
            tareas={tareas}
            onCompletar={(id) => {
              const tarea = tareas.find((t) => t.id === id); 
              handleToggleCompletada(id, tarea?.completada);
            }}
            onEliminar={setTareaAEliminar}
          />
        </Card>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar estar tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />

      <AcctionButton/>

      <Footer
        footer="Esto es un footer"
      />
    </div>
  )
};

export default App