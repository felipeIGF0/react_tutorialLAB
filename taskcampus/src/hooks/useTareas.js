import { useState, useEffect } from "react";
import {
    getTareas,
    postTarea,
    putTarea,
    deleteTarea,
    patchTareaTitulo
} from "../services/tareasService";

const useTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [operacionEnCurso, setOperacionEnCurso] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            try {
                const datos = await getTareas(10);
                setTareas(
                    datos.map((t) => ({
                        id: t.id,
                        titulo: t.title,
                        completada: t.completed
                    }))
                );
            } catch (err) {
                setError(err.message);

            } finally {
                setCargando(false);
            }
        };

        cargar();
    }, []);

    const crearTarea = async (titulo) => {
        try {
            const nueva = await postTarea(titulo);
            setTareas((prev) => [
                { 
                  id: Date.now(),
                  titulo: nueva.title,
                  completada: nueva.completed
                }, ...prev
            ]);
        } catch (err) {
            setError(err.message);
        } finally {
            setOperacionEnCurso(false);
        }
    };

    const actualizarTarea = async (id, cambios) => {
        setOperacionEnCurso(true);
        try {
            await putTarea(id, cambios);
            setTareas((prev) =>
              prev.map((t) => (t.id === id ? {...t, ...cambios } : t))
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setOperacionEnCurso(false);
        }
    };

    const eliminarTarea = async (id) => {
        setOperacionEnCurso(true);
        try {
          await deleteTarea(id);
          setTareas((prev) => prev.filter((t) => t.id !== id));       
        } catch (err) {
            setError(err.message);
        } finally {
            setOperacionEnCurso(false);
        }
    };

    const editarTitulo = async (id, nuevoTitulo) => {
        setOperacionEnCurso(true);
        try {
          await patchTareaTitulo(id, nuevoTitulo);
          setTareas((prev) => 
              prev.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t))
          );
        } catch (err) {
            setError(err.message);
        } finally {
            setOperacionEnCurso(false);
        }
    };

    return { tareas, cargando, error, operacionEnCurso, crearTarea, actualizarTarea, eliminarTarea, editarTitulo };
};

export default useTareas;