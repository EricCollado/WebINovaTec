import Navbar from "./Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './NavBar.css';

export const Home = () => {
    const [data, setData] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
 // const clienteId = localStorage.getItem('clienteId'); // Obtener el clienteId de localStorage
 const clientIDe = sessionStorage.clientID;

  useEffect(() => {
    axios.get(`https://localhost:5001/api/Clientes/${clientIDe}`, {
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
                                        <TableCell><Typography variant="h6">Usuario</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="h6">Documento de identidad</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Fecha de Registro</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.nombre} {data.apellido}</TableCell>
                                        <TableCell align="center">{data.documentoIdentidad}</TableCell>
                                        <TableCell align="right">{data.fechaRegistro}</TableCell>
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