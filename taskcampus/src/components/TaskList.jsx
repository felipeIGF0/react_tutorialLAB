function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
}

function TaskList({ task1, task2, task3 }) {
    return (
        <section>
            <ul>
                <li>
                    {task1}
                    <button onClick={() => showTask(task1)}>
                        Seleccionar
                    </button>
                </li>
                
                <li>
                    {task2}
                    <button onClick={() => showTask(task2)}>
                        Seleccionar
                    </button>
                </li>
                
                <li>
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