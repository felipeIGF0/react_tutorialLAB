import TaskForm from "../components/TaskForm";

const NewTaskView = ({ onAgregar, operacionEnCurso }) => {
  return <TaskForm onAgregar={onAgregar} operacionEnCurso={operacionEnCurso} />;
};

export default NewTaskView;