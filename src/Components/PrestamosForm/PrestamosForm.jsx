import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../clientID';
import Navbar from '../HomeForm/Navbar';
import './PrestamosForm.css';

const PrestamosForm = () => {
  const [prestamos, setPrestamos] = useState([]);
  const navigate = useNavigate();
  const { clientID } = useContext(ClientContext);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
  const clientIDe = sessionStorage.getItem('clientID');

  useEffect(() => {
    axios.get(`https://localhost:7033/api/Prestamos/Cliente/${clientIDe}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    })
    .then(response => {
      setPrestamos(response.data.$values);
    })
    .catch(error => {
      console.error('Error fetching prestamos:', error);
    });
  }, [clientID]);

  const handlePagarPrestamo = (prestamoId) => {
    // Almacenar prestamoId en sessionStorage
    sessionStorage.setItem('prestamoId', prestamoId);

    // Redirigir al componente de pago de préstamos
    navigate('/prestamos');
  };

  const formatMonto = (monto) => {
    return monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  return (
    <>
      <Navbar />
      <Container className="prestamos-container">
        {prestamos.length > 0 ? (
          prestamos.map((prestamo) => (
            <Card className="prestamo-card" key={prestamo.prestamoId}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Préstamo ID: {prestamo.prestamoId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monto: RD$ {formatMonto(prestamo.monto)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha del Préstamo: {formatFecha(prestamo.fechaPrestamo)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de Vencimiento: {formatFecha(prestamo.fechaVencimiento)}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handlePagarPrestamo(prestamo.prestamoId)}
                  sx={{ mt: 2 }}
                >
                  Pagar Préstamo
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">
            No hay préstamos disponibles.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default PrestamosForm;
