import { useState } from "react";

const TaskSummary = ({ summary, pending, total }) => {
    return (
        <div className="card">
            <h2 className="section-title">{summary}</h2>
            <p>{pending} <strong>{total}</strong></p>
        </div>
    )
}

export default TaskSummary