import Navbar from "../HomeForm/Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; // Importar ícono de retroceso
import './Cuentas.css'; // Importar estilos adicionales

export const Cuentas = () => {
    const [movimientos, setMovimientos] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
    const cuentaId = sessionStorage.cuentaId;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7033/api/Movimientos/Cuenta/${cuentaId}`, {
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

    const handleBackClick = () => {
        navigate('/cuentas');
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="tabla-container">
                    {movimientos.length > 0 ? (
                        <>
                            <Button className="atras"
                                    variant="contained" 
                                    onClick={handleBackClick}
                                    startIcon={<KeyboardBackspaceIcon />} // Ícono de retroceso
                            >
                                {/* Texto opcional para accesibilidad */}
                            </Button>
                            <div className="scrollable-table">
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
                            </div>
                        </>
                    ) : (
                        <Typography variant="h5" color="text.primary">
                            No se encontraron movimientos para esta cuenta.
                        </Typography>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cuentas;
