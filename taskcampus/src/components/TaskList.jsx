function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
}

function TaskList({ task1, task2, task3 }) {
    return (
        <section className="card">
            <h2 className="section-title">Listado de tareas</h2>
            <ul className="task-list">
                <li className="task-item">
                    {task1}
                    <button onClick={() => showTask(task1)}>
                        Seleccionar
                    </button>
                </li>
                
                <li className="task-item">
                    {task2}
                    <button onClick={() => showTask(task2)}>
                        Seleccionar
                    </button>
                </li>
                
                <li className="task-item">
                    {task3}
                    <button onClick={() => showTask(task3)}>
                        Seleccionar
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default TaskList