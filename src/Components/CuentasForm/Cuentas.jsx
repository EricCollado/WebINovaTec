import Navbar from "../HomeForm/Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Cuentas.css'; // Importamos los estilos adicionales

export const Cuentas = () => {
    const [movimientos, setMovimientos] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';

    useEffect(() => {
        axios.get('https://localhost:7033/api/Movimientos/Cuenta/1', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'text/plain'
            }
        })
        .then(response => {
            setMovimientos(response.data.$values);
        })
        .catch(error => {
            console.error('Error fetching movimientos:', error);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="tabla-container">
                    {movimientos.length > 0 && (
                        <TableContainer component={Paper} className="tablaMovimientos">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Descripción</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Monto</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="h6">Fecha de Transacción</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movimientos.map((movimiento) => (
                                        <TableRow key={movimiento.movimientoID}>
                                            <TableCell>{movimiento.tipoTransaccion.nombre}</TableCell>
                                            <TableCell align="right">{movimiento.tipoTransaccion.descripcion}</TableCell>
                                            <TableCell align="right">RD$ {movimiento.monto}</TableCell>
                                            <TableCell align="right">{new Date(movimiento.fechaTransaccion).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cuentas;