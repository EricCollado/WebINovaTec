import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navbar from '../HomeForm/Navbar';


const CuentasCliente = () => {
  const [cuentas, setCuentas] = useState([]);
  const navigate = useNavigate();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';

  useEffect(() => {
        axios.get('https://localhost:7033/api/Cuentas/Cliente/1', {
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
    }, []);



  return (
    <>
    <Navbar/>
    <Container>
      <Typography variant="h3" align="left" gutterBottom>
        Cuentas
      </Typography>
      <Grid container spacing={3}>
        {cuentas.map((cuenta) => (
          <Grid item xs={12} sm={6} md={4} key={cuenta.cuentaId}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Cuenta ID: {cuenta.cuentaId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Balance: RD$ {cuenta.balance}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate("/cuentas/transacciones")}
                >
                  Ver Transacciones
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}

export default CuentasCliente;
