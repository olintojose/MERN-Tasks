import React, { useContext } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
//import ListadoTarea from '../tareas/ListadoTareas';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';
import { useEffect } from 'react';

const Proyectos = () => {

        //Extraer la informacion de autenticación
        const authContext = useContext(AuthContext);
        const { usuarioAutenticado } = authContext;

        useEffect(() => {
            usuarioAutenticado();
              // eslint-disable-next-line
         }, [])

    return ( 
      <div className="contenedor-app">
          <Sidebar/>
          <div className="seccion-principal">
              <main>
                  <Barra/>
                  <FormTarea/>

                  <div className="contenedor-tareas">
                      <ListadoTareas/>
                    
                  </div>
              </main>
               
          </div>
      </div>
     );
}
 
export default Proyectos;