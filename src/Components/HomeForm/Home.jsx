import Navbar from "./Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './NavBar.css';

export const Home = () => {
    const [data, setData] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
 // const clienteId = localStorage.getItem('clienteId'); // Obtener el clienteId de localStorage

  useEffect(() => {
    axios.get('https://localhost:7033/api/Cuentas/1', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <>
            <Navbar />
            <div className="main-container">
                <div className="tabla-container">
                    {data && (
                        <TableContainer component={Paper} className="tablaBalance">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="h6">Cliente</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Balance</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Fecha de Registro</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.clienteNombre} {data.clienteApellido}</TableCell>
                                        <TableCell align="right">RD$ {data.balance}</TableCell>
                                        <TableCell align="right">{data.fechaCreacion}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
        </>
);
};



export default Home;