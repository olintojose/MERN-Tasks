import React, { useState  } from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'




const NuevaCuenta = (props) => {

    //Extraer los valores del context
const alertaContext = useContext(AlertaContext);
const { alerta, mostrarAlerta } = alertaContext;


 const  authContext  = useContext(AuthContext);
 const { mensaje, autenticado, registrarUsuario } = authContext;

 //En casi que el usuario de haya autenticado o registrado o sea un registro duplicado 

 useEffect (() =>  {
    if (autenticado ){
        props.history.push('/proyectos')
    }
    if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
      // eslint-disable-next-line
 }, [mensaje, autenticado, props.history]);


    //State para iniciar sesion
    const [ usuario, guardarUsuario ] = useState ({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    //Extraer de usuario
    const { nombre, email, password, confirmar } = usuario;

    const onChange= e => {
        guardarUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion
     
    const onSubmit = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos deben ser llenados', 'alerta-error');
            return;
        }
        //Password minimo 6 caracteres
        if (password.length < 6 ){
            mostrarAlerta('Password debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }
        
        // Verificar  que ambos pass sean iguales

        if (password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }
        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }
    return ( 
    <div className="form-usuario">
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
        <div className="contenedor-form sombra-dark">
            <h1>Obtener cuenta</h1>
            <form
                onSubmit={onSubmit}
            >
                 <div className="campo-form">
                    <label htmlfor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlfor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlfor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Tu password"
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlfor="confirmar">Confirmar Password</label>
                    <input
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        value={confirmar}
                        placeholder="Confirmar password"
                        onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <input type="submit" className="btn btn-primario btn-block"
                    value="Registrarme" />
                </div>
            </form>
            <Link to = {'/'} className="enlace-cuenta">
                Iniciar sesión
            </Link>
        </div>
    </div>
     );
}
 
export default NuevaCuenta;