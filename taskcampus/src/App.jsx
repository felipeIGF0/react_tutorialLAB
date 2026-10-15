import { useState, useEffect } from "react";
import './App.css';

import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import AcctionButton from "./components/ActionButton";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskcampus-tareas");
    return guardadas 
      ? JSON.parse(guardadas)
      : [
        { id: 1, titulo: "Aprender qué es React", completada: false },
        { id: 2, titulo: "Crear un proyecto con Vite", completada: true },
        { id: 3, titulo: "Practicar JSX", completada: false }
      ];
    });

  const [usuario, setUsuario] = useState("Felipe");

  useEffect(() => {
    localStorage.setItem("textcampus-tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  const agregarTarea = (titulo) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      completada: false
    };
  };

  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {...tarea, completada: true}
          : tarea
      )
    )
  }

  const usuarioAnonimo = () => {
    setUsuario("Usuario anonimo");
  };

  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
        usuario={usuario} botonAnonimo={usuarioAnonimo}
      />

      <TaskSummary
        summary="Resumen"
        pending="Tienes completadas: "
        total={tareas.length}
      />

      <TaskForm onAgregar={agregarTarea}/>

      <TaskList
        tareas={tareas} 
        onCompletar={completarTarea}
      />

      <AcctionButton/>

      <Footer
        footer="Esto es un footer"
      />
    </main>
  )
};

export default App