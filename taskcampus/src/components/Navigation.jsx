import Button from "./Button";

const Navigation = ({ vistaActiva, onCambiarVista }) => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "24px"
    }}>
      <Button
        label="📊 Resumen"
        onClick={() => onCambiarVista("resumen")}
        variant={vistaActiva === "resumen" ? "primary" : "secondary"}
      />
      <Button
        label="📋 Mis Tareas"
        onClick={() => onCambiarVista("tareas")}
        variant={vistaActiva === "tareas" ? "primary" : "secondary"}
      />
      <Button
        label="➕ Nueva Tarea"
        onClick={() => onCambiarVista("nueva")}
        variant={vistaActiva === "nueva" ? "primary" : "secondary"}
      />
    </nav>
  );
};

export default Navigation;