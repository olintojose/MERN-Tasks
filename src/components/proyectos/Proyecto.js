import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtener el State del proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  // obtener la funcion del context de tarea
//console.log(proyecto);
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  // Funcion para agregar el proyecto Actual

  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar proyecto actual
    obtenerTareas(id); //Filtra las tareass cuando se da click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
       onClick={() => seleccionarProyecto(proyecto._id) }
      >{proyecto.nombre}       </button>
    </li>
  );
};

export default Proyecto;
