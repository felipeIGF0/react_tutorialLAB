# Investigación
A continuación habrá una breve explicación de cada tecnología usada

## React
React es una biblioteca de *JavaScript* que nos ayuda a construir componentes. Describe como debe verse un objeto y cual es su contenido mediante una variable y si esta última cambia React inteligentemente modificará sólo este, sin dibujar el componente entero

## JSX
JavaScript XML es una extensión de sintaxis de JavaScript que le permite escribir estructuras similares a HTML en el mismo código. Los navegadores por si sólos no entienden JSX pero herramientas como *Vite* o *Babel* lo compilan

## Props (Properties)
Son los argumentos o datos de entrada que un componente padre le pasa al hijo para personalizarlo o indicarle que mostrar. Va sólo del padre al hijo y no al revés, este último NO debe modificar el props que recibe, sólo leerlo

## Operaciones HTTP
Son solicitudes de red estándar del frontend hacia el servidor o API. 
Las operaciones siguen el modelo REST
- GET : Para consultar datos
- POST : Crear un recurso, guardar una nueva tarea desde un formulario, por ejemplo
- PUT / PATCH : Actualizar un dato
- DELETE : Eliminar

## Fetch, Hooks y Servicios
Estos 3 elementos forman la arquitectura habitual para conectar la interfaz de React con los datos del servidor

### Fetch
La API nativa de JavaScript para enviar solicitudes HTTP asíncronas y recibir respuesta (generalmente JSON)
* Ejemplo:
    const response = await fetch("http://localhost:3001/tasks");
    const tasks = await response.json();

### Hooks
Son funciones especiales proviastas por React que permiten "enganchar" estado y ciclo de vida dentro de los componentes funcionales. Existen 2 de ellos
* useState: Almacenan variables que al ser modificadas obligan a React a redibujar la pantalla
* useEffect: Ejecuta efectos secundarios, como llamar a un servicio, justo cuando el componente aparece en pantalla

### Servicios (Service Layer)
Corresponde a una buena práctica que consiste en aislar las llamadas fetch en un archivo independiente (Ej: tarkService.js)
* Ejemplo:
    // src/services/taskService.js
    const API_URL = "http://localhost:3001/tasks";

    export const taskService = {
        // GET
        getAll: async () => {
          const res = await fetch(API_URL);
          if (!res.ok) throw new Error("Error al obtener tareas");
          return await res.json();
        },

        // POST
        create: async (taskData) => {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });
        if (!res.ok) throw new Error("Error al guardar tarea");
        return await res.json();
      }
    };