import { useState, useEffect } from "react";
import './App.css';

import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import AcctionButton from "./components/ActionButton";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskcampus-tareas");
    return guardadas ? JSON.parse(guardadas) : []
      // : [
      //   { id: 1, titulo: "Aprender qué es React", completada: false },
      //   { id: 2, titulo: "Crear un proyecto con Vite", completada: true },
      //   { id: 3, titulo: "Practicar JSX", completada: false }
      // ];
  });

  useEffect(() => {
    const hayDatosLocales = localStorage.getItem("taskcampus-tareas");

    // if (hayDatosLocales) return;

    const cargarDesdeAPI = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed
        }));

        setTareas(tareasAdaptadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDesdeAPI();
  }, []);

  useEffect(() => {
    localStorage.setItem("taskcampus-tareas", JSON.stringify(tareas));
  }, [tareas]);

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

  // useEffect(() => {
  //   localStorage.setItem("textcampus-tareas", JSON.stringify(tareas));
  // }, [tareas]);

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  const agregarTarea = async (titulo) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      completada: false
    };

    setTareas(() => [...tareas, nuevaTarea]);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, completed: false, userId: 1 })
      });

      const data = await response.json();
      console.log("Tarea creada en el servidor:", data);
    } catch (err) {
      console.error("Error al crear tarea en servidor:", err);
    }
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

  const [usuario, setUsuario] = useState("Felipe");
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

      {/* <TaskSummary
        summary="Resumen"
        pending="Tienes completadas: "
        total={pendientes}
      /> */}

      <TaskForm onAgregar={agregarTarea}/>

      <TaskList
        tareas={tareas} 
        onCompletar={completarTarea}
        cargando={cargando}
        error={error}
      />

      <AcctionButton/>

      <Footer
        footer="Esto es un footer"
      />
    </main>
  )
};

export default App