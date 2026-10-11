function App() {
  const appName = 'TaskCampus'
  const description = 'Aplicación para gestionar tareas académicas'
  const task = ['Aprender qué es React', 'Crear un proyecto con Vite', 'Practicar JSX']

  return (
    <main>
      <h1>{appName}</h1>
      <p>{description}</p>

      <section>
        <h2>Primeras tareas</h2>
        <ul>
          <li>{task[0]}</li>
          <li>{task[1]}</li>
          <li>{task[2]}</li>
        </ul>
      </section>
    </main>
  )
}

export default App