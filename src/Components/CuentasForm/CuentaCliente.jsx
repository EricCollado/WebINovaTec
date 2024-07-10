import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../clientID';
import Navbar from '../HomeForm/Navbar';

const CuentasCliente = () => {
  const [cuentas, setCuentas] = useState([]);
  const navigate = useNavigate();
  const { clientID } = useContext(ClientContext);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
  const clientIDe = sessionStorage.clientID;
  
  useEffect(() => {
    console.log(clientID);
    axios.get(`https://localhost:5001/api/Cuentas/Cliente/${clientIDe}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    })
    .then(response => {
      setCuentas(response.data.$values);
    })
    .catch(error => {
      console.error('Error fetching movimientos:', error);
    });
  }, [clientID]);

  const handleVerTransacciones = (cuentaId) => {
    // Almacenar cuentaId en sessionStorage
    sessionStorage.setItem('cuentaId', cuentaId);
    
    // Redirigir al componente de transacciones
    navigate('/cuentas/transacciones');
  };

  const getAccountType = (tipoCuentaID) => {
    if (tipoCuentaID === 1) {
      return "Cuenta Corriente";
    } else if (tipoCuentaID === 2) {
      return "Cuenta de ahorros";
    } else {
      return "Tipo de cuenta desconocido";
    }
  };

  return (
    <>
      <Navbar/>
      <Container className="main-container">
        <div className="card-container">
          {cuentas.length > 0 ? (
            cuentas.map((cuenta) => (
              <div className="card-item" key={cuenta.cuentaId}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {getAccountType(cuenta.tipoCuentaID)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Balance: RD$ {cuenta.balance}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleVerTransacciones(cuenta.cuentaId)}
                    >
                      Ver Transacciones
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              No hay cuentas disponibles.
            </Typography>
          )}
        </div>
      </Container>
    </>
  );
};

export default CuentasCliente;
