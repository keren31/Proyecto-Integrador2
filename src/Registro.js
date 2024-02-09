import React, { useState } from 'react';
import './registro.css'
import imagen from './img/imagen1.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Registro = () => {
  const navigate = useNavigate();
  const [nombre,setNombre]= useState('')
  const [ApellidoP,setApellidoP]= useState('')
  const [ApellidoM,setApellidoM]= useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [telefono, setTelefono] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  
  ///mensajes de error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [apellidoMError, setApellidoMError] = useState('');
  const [apellidoPError, setApellidoPError] = useState('');
  const [fechaError, setFechaError] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
    
      const data = new FormData();
      data.append("Nombre", nombre);
      data.append("ApellidoPaterno", ApellidoP);
      data.append("ApellidoMaterno", ApellidoM);
      data.append("Correo", email);
      data.append("Telefono", telefono);
      data.append("Contrasena", password);
      data.append("FechaNacimiento", fechaNac);
      const formData = new FormData();
      
      
    
    // Validar campos antes de enviar el formulario
    if (validateEmail(email)==true && validatePassword(password)==true && validatePassword2(password2) && validateApellidoM(ApellidoM)==true && validateApellidoP(ApellidoP)==true && validateNombre(nombre) && validateTelefono(telefono)&& validateFecha(fechaNac) ) {
      console.log('Formulario enviado:', { email, password });
      formData.append("Correo", email);
      fetch(
        "https://apicasadelmarisco.azurewebsites.net/" +
          "api/CasaDelMarisco/VerificarCorreo?Correo=" +
          email,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if(result=='Correo Existe'){
            setEmailError('Este correo ya existe');
          }else{
            fetch(
              "https://apicasadelmarisco.azurewebsites.net/" +
                "api/CasaDelMarisco/AgregarUsuarios?Nombre=" +
                nombre +
                "&ApellidoPaterno=" +
                ApellidoP +
                "&ApellidoMaterno=" +
                ApellidoM +
                "&Correo=" +
                email +
                "&Telefono=" +
                telefono +
                "&Contrasena=" +
                password + 
                "&FechaNacimiento"
                + fechaNac,
              {
                method: "POST",
                body: data,
              }
            )
              .then((res) => res.json())
              .then((result) => {
                window.location.href='/login1'
              }); 
          }
        });  
    } else {
      console.log('Formulario no válido');
    }
  };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    //validaciones jsjsjjs
    const validateNombre =(nombre)=>{
      if(nombre==''){
       setNombreError('No puede estar vacio')
       return false;

      }else{
        if(nombre.length<2){
          setNombreError('minimo de 2 caracteres')
          return false;
        }else{
          const nombreRegex = /^[a-zA-Z\s]+$/;
          if (nombreRegex.test(nombre)){
            setNombreError('');
            return true;
          }
          else{
            setNombreError('No puede contener numeros');
            return false;
          }
        }
      }
      
    }
    const validateApellidoP =(ApellidoP)=>{
      const nombreRegex2 = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
      if(ApellidoP==''){
        setApellidoPError('No puede estar vacio')
        return false;
       }else{
         if(ApellidoP.length<5){
          setApellidoPError('minimo de 5 caracteres')
          return false;
         }else{
           const nombreRegex2 = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
           if (nombreRegex2.test(ApellidoP)){
            setApellidoPError('');
             return true;
           }
           else{
            setApellidoPError('No puede contener numeros');
             return false;
           }
         }
      }
    }
    const validateApellidoM =(ApellidoM)=>{
      const nombreRegex3 = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
      if(ApellidoM==''){
        setApellidoMError('No puede estar vacio')
        return false;
       }else{
         if(ApellidoM.length<5){
          setApellidoMError('minimo de 5 caracteres')
          return false;
         }else{
           const nombreRegex3 = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
           if (nombreRegex3.test(ApellidoM)){
            setApellidoMError('');
             return true;
           }
           else{
            setApellidoMError('No puede contener numeros');
             return false;
           }
         }
      }
    }

    const validateEmail = (email) => {
     if(email==''){
      setEmailError('No puede estar vacio')
      return false;
     }else{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setEmailError('');
        return true;
      } else {
        setEmailError('Correo electrónico no válido');
        return false;
      }
     }
    };

    function checkPasswordStrength(password, minChar, level) {
      const lowcase = /[a-z]/.test(password);
      const uppcase = /[A-Z]/.test(password);
      const numbers = /\d/.test(password);
      const special = /[^a-zA-Z\d]/.test(password);
    
      let passed = true;
      switch (level) {
        case 5:
          passed = passed && special;
        case 4:
          passed = passed && uppcase;
        case 3:
          passed = passed && numbers;
        case 2:
          passed = passed && lowcase;
        case 1:
          passed = passed && (lowcase || uppcase || numbers);
        case 0:
          passed = passed && password.length >= minChar;
          break;
        default:
          passed = false;
      }
      return passed;
    }
    
  
    const validatePassword = (password) => {
      if(password==''){
        setPasswordError('no puede estar vacio')
        return false;
      }else{
        if(password.length<8){
          setPasswordError('minimo de 8 caracteres');
          return false;
        }else{ 
          const passwordValidate= checkPasswordStrength(password,8,5);
          if(passwordValidate){
            setPasswordError('')
            return true;
          }else{
            setPasswordError('Debe tener almenos una mayuscula, minuscula, numero y caracter especial')
            return false;

          }
        }
      }
    };
    const validatePassword2=(password2)=>{
      if(password2==password){
        setPasswordError2('')
        return true;  

      }else{
        setPasswordError2('no son iguales las contraseñas')
        return false;
      }
    };
   
    const validateTelefono = (telefono)=>{
      const telefonoRegex=/^\d{10}$/;
      if(telefono==('')){
        setTelefonoError('no puede estar vacio')
        return false;
      }else if (telefonoRegex.test(telefono)){
        setTelefonoError('');
        return true;
      }else{
        setTelefonoError('Teléfono debe tener exactamente 10 números');
        return false;
      }
    };

    const validateFecha = (fechaNac) => {
      if (fechaNac.trim() === '') {
        setFechaError('No puede estar vacío');
        return false;
      } else {
        const fechaNacimiento = new Date(fechaNac);
        const fechaHoy = new Date();
        const edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaHoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) {
          edad--;
        }
        if (edad < 18) {
          setFechaError('Debe ser mayor de 18 años');
          return false;
        } else {
          setFechaError('');
          return true;
        }
      }
    };
    

    return (
      <div className="registro-form-containerRegistro">
    <div className="registro-image-containerRegistro">
      <img src={imagen} alt="Registro" className="registro-imageRegistro" />
    </div>
    <div className="registro-formRegistro">
      <p className='loginTitulo'>Crear Cuenta/Resgistarse</p>
      <label className='loginText'>Bienvenidos a la Estetica Canina Platon ingresa los datos para crear una cuenta con nosotros.</label>
      <form onSubmit={handleSubmit} className='formulario'>
       <div>
        <label htmlFor="nombre" className='RegistroLabel'>Nombre* :</label>
          <input
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onBlur={() => validateNombre(nombre)}
            className={nombreError ? 'input-error' : ''}
            required
          />
           {nombreError && <p className="error-message">{nombreError}</p>}
       </div>
       
       <div>
          <label htmlFor="apaellidoP" className='RegistroLabel'>Apellido Paterno :</label>
          <input
            required
            id="apellidoP"
            name="apellidoP"
            value={ApellidoP}
            onChange={(e) => setApellidoP(e.target.value)}
            onBlur={() => validateApellidoP(ApellidoP)}
            className={apellidoPError ? 'input-error' : ''}
     
          />
          {apellidoPError && <p className="error-message">{apellidoPError}</p>}
        </div>

        <div>
          <label htmlFor="apellidoM" className='RegistroLabel'>Apellido Materno :</label>
          <input
            required
            id="apellidoM"
            name="apellidoM"
            value={ApellidoM}
            onChange={(e) => setApellidoM(e.target.value)}
            onBlur={() => validateApellidoM(ApellidoM)}
            className={apellidoMError ? 'input-error' : ''}
          />
          {apellidoMError && <p className="error-message">{apellidoMError}</p>}
        </div>

       <div>
          <label htmlFor="email" className='RegistroLabel'>Correo* :</label>
          <input
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            className={emailError ? 'input-error' : ''}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div>
            <label htmlFor="password" className='RegistroLabel'>Contraseña :</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                required
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                className={passwordError ? 'input-error' : ''}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div>
            <label htmlFor="password2" className='RegistroLabel'>Repetir contraseña :</label>
            <div className="password-input">
              <input
                type={showPassword2 ? "text" : "password"}
                id="password2"
                name="password2"
                value={password2}
                required
                onChange={(e) => setPassword2(e.target.value)}
                onBlur={() => validatePassword2(password2)}
                className={passwordError2 ? 'input-error' : ''}
              />
              <FontAwesomeIcon
                icon={showPassword2 ? faEyeSlash : faEye}
                className="password-icon"
                onClick={togglePasswordVisibility2}
              />
            </div>
            {passwordError2 && <p className="error-message">{passwordError2}</p>}
          </div>
        <div>
          <label htmlFor="telefono" className='RegistroLabel'>Telefono* :</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={telefono}
            required
            onChange={(e) => setTelefono(e.target.value)}
            onBlur={() => validateTelefono(telefono)}
            className={telefonoError ? 'input-error' : ''}
          />
          {telefonoError && <p className="error-message">{telefonoError}</p>}
        </div>
        <div >
          <label htmlFor="fecha" className='RegistroLabel'>Fecha de nacimiento :</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
            onBlur={() => validateFecha(fechaNac)}
            className={fechaError ? 'input-error' : ''}
          />
          {fechaError && <p className="error-message">{fechaError}</p>}
        </div>
       
        <label to='/terminos'className='recuerdame'>
          <input
            type="checkbox"
           className='cuadro'
          />
         <Link to='/terminos'> Acepta los terminos y condiciones</Link>
        </label>
          
      
        <button  className='btn btn-warning text2' type="submit">Registro</button><br/>
        
      </form>
    </div>
  </div>
    );
  };
export default Registro;