import React, { useState, useEffect } from 'react';
import logo from './img/logotipoEstetica1.png';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Importar archivo de estilos CSS
import { useUser } from './UserContext';
import { Breadcrumb } from 'react-bootstrap';
import  Breadcrumbs from './Breadcrumbs';

const Header = () => {
    const { user } = useUser();
    const [sidebar, setSidebar] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false); // Nuevo estado para mostrar información del usuario
    const [isScrolled, setIsScrolled] = useState(false); // Nuevo estado para controlar si se ha desplazado el encabezado

    useEffect(() => {
        // Función para controlar el scroll
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Agregar el event listener para el scroll
        window.addEventListener("scroll", handleScroll);

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
           <header className={`header ${sidebar ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
  
           <div className='header2' style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Breadcrumbs />
                </div>
                <div>
                  {user ? (
                    <div style={{display: "flex"}}>
                      <li style={{listStyle:'none'}} className='username'>{user.Nombre}</li>
                      <li style={{listStyle:'none'}}><Link to='./Perfil'>PERFIL</Link></li>
                    </div>
                  ) : (
                    <div style={{display: "flex"}}>
                      <li style={{listStyle:'none'}} className={location.pathname === '/login' ? 'active' : ''}>
                        <Link to='./login1'>LOGIN</Link>
                      </li>
                      <li style={{listStyle:'none'}}><Link to='/registro'>REGISTRARSE</Link></li>
                    </div>
                  )}
                </div>
            </div>


                <div className='container flex'>
                    <div className='logo'>
                        <img src={logo} alt='' />
                    </div>
                    <div className='nav'>
                        <ul className={sidebar ? "nav-links-sidebar" : "nav-links"} onClick={() => setSidebar(false)}>
                            <li><Link to='/'>INICIO</Link></li>
                            <li><Link to='/Quienes-Somos'>QUIENES SOMOS</Link></li>
                            <li><Link to='/servicio'>SERVICIOS</Link></li>
                            <li><Link to='/Productos'>TIENDA</Link></li>
                            <li><Link to='/Citas'>CITAS</Link></li>
                            
                            {/* Aquí puedes agregar tu lógica de autenticación personalizada si es necesario */}
                        </ul>
                    </div>
                </div>
            </header>
            <div className="content-under-header">
                {/* Aquí va tu contenido que quieres que se vea a través del encabezado */}
            </div>
        </>
    );
};

export default Header;
