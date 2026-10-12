import Header from "./components/Header"
import TaskSummary from "./components/TaskSummary"
import TaskList from "./components/TaskList"
import Footer from "./components/Footer"
import AcctionButton from "./components/ActionButton"

function App() {
  function reviewTasks() {
    alert('Tienes 3 tareas pendientes, por favor revisar')
  }

  const task = ['Aprender qué es React', 'Crear un proyecto con Vite', 'Practicar JSX']

  return (
    <main>
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      <TaskSummary
        summary="Resumen"
        pending="Tienes 3 tareas pendientes"
      />

      <TaskList
        task1={task[0]}
        task2={task[1]}
        task3={task[2]}
      />

      <AcctionButton onReview={reviewTasks}/>

      <Footer
        footer="Esto es un footer"
      />
    </main>
  )
}

export default App