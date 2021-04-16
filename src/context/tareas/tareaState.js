import React, { useReducer } from "react";

import tareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //Crear State y dispatch

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones

  //Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {
//    console.log(proyecto) 
    try {
       
        const resultado = await clienteAxios.get('/api/tareas', { params : {proyecto}});
  //      console.log(resultado);
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
          });
    } catch (error) {
        console.log(error);
    }
  };
  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
  //  console.log("tarea");
    try {
       await clienteAxios.post("/api/tareas", tarea);
     // console.log(resultado);

      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Valida y muestra un error

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  //Eliminar tarea por ID

  const eliminarTarea = async (id, proyecto) => {
try {
    await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
    dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
} catch (error) {
    console.log(error);
}
  };

  //Editar o modifica una tarea
  const actualizarTarea = async tarea => {
    
 try {
   const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);


  // console.log(resultado)
  dispatch({
    type: ACTUALIZAR_TAREA,
    payload: resultado.data.tarea,
  });
 } catch (error) {
   console.log(error)
 }
  };
  // Extraer una tarea para la edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };



  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,

        //PAsando al context
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
