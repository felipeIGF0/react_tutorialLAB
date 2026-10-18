import { useState } from "react";

const TaskSummary = ({ total, completadas, pendientes }) => {
    return (
      <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "48px",
      padding: "8px 0"
    }}>

      <div style={{ textAlign: "center" }}>
        <span style={{ display: "block", fontSize: "1.75rem", fontWeight: "bold", color: "#1d4ed8" }}>
          {total}
        </span>
        <span className="task-summary">
          Total
        </span>
      </div>

      <div style={{ textAlign: "center" }}>
        <span style={{ display: "block", fontSize: "1.75rem", fontWeight: "bold", color: "#16a34a" }}>
          {completadas}
        </span>
        <span className="task-summary">
          Completadas
        </span>
      </div>


      <div style={{ textAlign: "center" }}>
        <span style={{ display: "block", fontSize: "1.75rem", fontWeight: "bold", color: "#f59e0b" }}>
          {pendientes}
        </span>
        <span className="task-summary">
          Pendientes
        </span>
      </div>
    </div>
    );
};

export default TaskSummary;