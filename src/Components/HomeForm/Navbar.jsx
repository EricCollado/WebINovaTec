import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/img/Logo-INovaTec-2.0.png'; // Asegúrate de ajustar la ruta de la imagen del logo
import LogoutIcon from '@mui/icons-material/Logout';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Navbar = () => {
  const [dropdown, setDropdown] = useState({});
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();


  const handleMouseEnter = (menu) => {
    setDropdown({ ...dropdown, [menu]: true });
  };

  const handleMouseLeave = (menu) => {
    setDropdown({ ...dropdown, [menu]: false });
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    // eslint-disable-next-line no-undef
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };


  return (
    <header className='header'>
      <a href="/home" className='logo'><div><img src={logo} alt="Logo" /></div></a>
      <nav className='navbar'>
        <div className='nav-item'> 
        <a href="/home">Home</a>
        </div>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('transferencias')}
          onMouseLeave={() => handleMouseLeave('transferencias')}
        >
          <a href="/cuentas/transacciones">Transferencias y pagos</a>
          {dropdown.transferencias && (
            <div className='dropdown'>
              <a href="/transaccion">Nueva transferencia</a>
            </div>
          )}
        </div>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('productos')}
          onMouseLeave={() => handleMouseLeave('productos')}
        >
          <a href="/cuentas">Mis productos</a>
          {dropdown.productos && (
            <div className='dropdown'>
              <a href="/cuentas">Cuentas</a>
              <a href="/prestamos">Préstamos</a>
            </div>
          )}
        </div>
        <div 
          className='nav-item'
          onMouseEnter={() => handleMouseEnter('beneficiarios')}
          onMouseLeave={() => handleMouseLeave('beneficiarios')}
        >
          <a href="/beneficiarios/lista">Beneficiarios</a>
          {dropdown.beneficiarios && (
            <div className='dropdown'>
              <a href="/beneficiarios/nuevo">Agregar beneficiario</a>
              <a href="/beneficiarios/lista">Lista de beneficiarios</a>
            </div>
          )}
        </div>
        
        <div className='nav-item logout' onClick={handleLogoutClick}>
          <LogoutIcon />
        </div>
      </nav>
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirmar Desconexión</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas desconectarte?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">Cancelar</Button>
          <Button onClick={handleLogoutConfirm} color="secondary">Desconectar</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default Navbar;
