import { useState } from 'react';
import logo from '../Assets/img/Logo-INovaTec-2.0.png'; // Asegúrate de ajustar la ruta de la imagen del logo

const Navbar = () => {
  const [dropdown, setDropdown] = useState({});

  const handleMouseEnter = (menu) => {
    setDropdown({ ...dropdown, [menu]: true });
  };

  const handleMouseLeave = (menu) => {
    setDropdown({ ...dropdown, [menu]: false });
  };

  return (
    <header className='header'>
      <a href="/home" className='logo'><div><img src={logo} alt="Logo" /></div></a>
      <nav className='navbar'>
        <a href="/login">Home</a>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('transferencias')}
          onMouseLeave={() => handleMouseLeave('transferencias')}
        >
          <a href="/">Transferencias y pagos</a>
          {dropdown.transferencias && (
            <div className='dropdown'>
              <a href="/transferencias/nuevo">Nueva transferencia</a>
              <a href="/transferencias/historial">Historial de transferencias</a>
            </div>
          )}
        </div>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('productos')}
          onMouseLeave={() => handleMouseLeave('productos')}
        >
          <a href="/">Mis productos</a>
          {dropdown.productos && (
            <div className='dropdown'>
              <a href="/cuentas">Cuentas</a>
              <a href="/productos/tarjetas">Tarjetas</a>
              <a href="/productos/prestamos">Préstamos</a>
            </div>
          )}
        </div>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('beneficiarios')}
          onMouseLeave={() => handleMouseLeave('beneficiarios')}
        >
          <a href="/">Beneficiarios</a>
          {dropdown.beneficiarios && (
            <div className='dropdown'>
              <a href="/beneficiarios/nuevo">Agregar beneficiario</a>
              <a href="/beneficiarios/lista">Lista de beneficiarios</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
