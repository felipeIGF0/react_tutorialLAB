import { useState } from "react";

function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
}

const TaskList = ({ tareas, onCompletar }) => {
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    return (
        <div className="card">
            <h2 className="section-title">Listado de tareas</h2>

            <button 
              className="task-button"
              onClick={() => setMostrarDetalle(!mostrarDetalle)}>
                {mostrarDetalle ? "Ocultar detalle": "Ver detalle"}
            </button>

            {mostrarDetalle && (
                    <ul className="task-list">
                        {tareas.map((tarea) => (
                            <li className="task-item" key={tarea.id}>
                                <span>{tarea.titulo}</span> 
                                {tarea.completada ? 
                                    ":)" : ":("
                                }

                                <button className="task-button" onClick={() => onCompletar(tarea.id)}>
                                    Seleccionar
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }            
        </div>
    )
}

export default TaskList