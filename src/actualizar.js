import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import imagen from './img/logotipo jas.jpeg';

export default function Actualizar() {
  const navigate = useNavigate();

  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');


  const [password,setPassword]=useState('')

  const data = new FormData();
  data.append('Correo', correo);
  data.append('Contrasena', password);

  const handleSubmit = (event) => {
    event.preventDefault();

      fetch(
        'https://apicasadelmarisco.azurewebsites.net/' +
          'api/CasaDelMarisco/RecuperarContrasena?Correo=' +
          correo+ "&Contrasena=" + password,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'La Contraseña a sido modificada con exito') {
            // Navegar a la página Token con el correo como parámetro 
            navigate('/login1');
          } else if (result === 'Error en las credenciales que proporciono') {
            
          }
        });
  
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Actualizar Contraseña</p>
        <label className="loginText">
          Ingrese su nueva  contraseña
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Contraseña nueva :
          </label>
          <input
           
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          
            required
          />
         
          <br />

          <button className="btn btn-warning text2" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}