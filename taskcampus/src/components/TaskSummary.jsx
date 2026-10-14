import { useState } from "react";

const TaskSummary = ({ summary, pending, total }) => {
    const [completadas, setCompletadas] = useState(total);
    const marcarCompletada = () => {setCompletadas(completadas + 1);}

    return (
        <div className="card">
            <h2 className="section-title">{summary}</h2>
            <p>{pending} <strong>{completadas}</strong></p>
            <button className="task-button" onClick={marcarCompletada}>Completar una tarea</button>
        </div>
    )
}

export default TaskSummary