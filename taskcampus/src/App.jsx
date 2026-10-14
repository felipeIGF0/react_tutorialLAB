import { useState } from "react";
import './App.css'

import Header from "./components/Header"
import TaskSummary from "./components/TaskSummary"
import TaskList from "./components/TaskList"
import Footer from "./components/Footer"
import AcctionButton from "./components/ActionButton"

const App = () => {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender qué es React", completada: false },
    { id: 2, titulo: "Crear un proyecto con Vite", completada: true },
    { id: 3, titulo: "Practicar JSX", completada: false }
  ])

  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {...tarea, completada: true}
          : tarea
      )
    )
  }

  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />

      <TaskSummary
        summary="Resumen"
        pending="Tienes completadas: "
        total={tareas.length}
      />

      <TaskList
        tareas={tareas} onCompletar={completarTarea}
      />

      <AcctionButton/>

      <Footer
        footer="Esto es un footer"
      />
    </main>
  )
}

export default App