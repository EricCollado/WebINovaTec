import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../../src/assets/img/Logo-INovaTec-2.0.png"
import { useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('https://localhost:7033/api/auth/login', {
            username,
            password
          });
    
          // Guarda el token en el almacenamiento local o en el estado de la aplicación
          const { token} = response.data;
          localStorage.setItem('authToken', token);

    
          // Redirige al usuario a la página principal o realiza alguna otra acción
          navigate('/home')
        } catch (error) {
            toast.error('Usuario o contraseña incorrectos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
      };
  return (
    <div className='wrapper'>
        <div className='form-box- login'>
      <form onSubmit={handleLogin}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>Inicio de Sesión</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Usuario' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input 
            type="password" 
            placeholder='Contraseña' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
        </div>


        <div className='remember-forgot'>
          <label><input type='checkbox' /> Recuerdame</label>
          <a href='#'>¿Olvidaste tu Contraseña?</a>
        </div>
        <button type='submit'>Iniciar Sesión</button>

        <div className='register-link'>
          <p>¿No tienes una cuenta? <a href="#">Registrarse</a></p>
        </div>
      </form>
      <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm