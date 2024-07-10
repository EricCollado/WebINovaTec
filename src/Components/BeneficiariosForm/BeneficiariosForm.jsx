import './Beneficiarios.css';
import Navbar from '../HomeForm/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Grid, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const BeneficiariosForm = () => {
    const [beneficiarios, setBeneficiarios] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
  
    useEffect(() => {
      axios.get('https://localhost:5001/api/Beneficiarios', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/plain'
        }
      })
      .then(response => {
        setBeneficiarios(response.data.$values);
      })
      .catch(error => {
        console.error('Error fetching beneficiarios:', error);
      });
    }, []);
  
    return (
      <>
        <Navbar />
        <Container className="beneficiarios-container">
          <Grid container spacing={4}>
            {beneficiarios.length > 0 ? (
              beneficiarios.map((beneficiario) => (
                <Grid item xs={12} sm={6} md={4} key={beneficiario.beneficiarioID}>
                  <Card className="beneficiario-card">
                    <CardContent>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
                        <AccountCircleIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h5" component="div">
                        Beneficiario ID: {beneficiario.beneficiarioID}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Nombre: {beneficiario.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cuenta ID: {beneficiario.cuentaID}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="text.secondary">
                No hay beneficiarios disponibles.
              </Typography>
            )}
          </Grid>
        </Container>
      </>
    );
}

export default BeneficiariosForm;
