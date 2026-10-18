import { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/todos"

const useTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const res = await fetch(`${API_URL}?_limit=10`);

                if (!res.ok) throw new Error(`Error al cargar tareas: ${res.status}`);

                const data = await res.json();

                const tareasAdaptadas = data.map((t) => ({
                    id: t.id,
                    titulo: t.title,
                    completada: t.completed
                }));

                setTareas(tareasAdaptadas);

            } catch (err) {
                setError(err.message);

            } finally {
                setCargando(false);
            }
        };

        cargarTareas();
    }, []);

    const crearTarea = async (titulo) => {
        try {
            const res = await fetch (API_URL, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    title: titulo,
                    completed: false,
                    userId: 1
                }),
            });

            if (!res.ok) throw new Error("Error al crear la tarea");

            const nueva = await res.json();
            const tareaLocal = {
                id: Date.now(),
                titulo: nueva.title,
                completada: nueva.completed
            };

            setTareas((prev) => [tareaLocal, ...prev]);
        } catch (err) {
            setError(err.message);
        }
    };

    const actualizarTarea = async (id, cambios) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cambios)
            });

            if (!res) throw new Error("Error al actualizar la tarea");

            setTareas((prev) =>
              prev.map((t) => (t.id === id ? {...t, ...cambios } : t))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Error al eliminar la tarea");
            
            setTareas((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const editarTitulo = async (id, nuevoTitulo) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: nuevoTitulo })
            });

            if (!res.ok) throw new Error("Error al editar tarea");

            setTareas((prev) => 
                prev.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea, editarTitulo };
};

export default useTareas;