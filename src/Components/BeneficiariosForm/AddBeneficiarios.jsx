import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, AlertTitle } from '@mui/material';
import Navbar from '../HomeForm/Navbar';
import './Beneficiarios.css';

export const AddBeneficiarios = () => {
  const [nombre, setNombre] = useState('');
  const [cuentaID, setCuentaID] = useState('');
  const [usuarioID, setUsuarioID] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
        setNombre('');
        setCuentaID('');
        setUsuarioID('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async () => {
    const data = { nombre, cuentaID, usuarioID };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';

    try {
      await axios.post('https://localhost:5001/api/Beneficiarios', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error('Error al registrar beneficiario:', error);
      setError(true);
    }
  };

  const handleConfirm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmSubmit = () => {
    handleSubmit();
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container className="add-beneficiarios-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Beneficiario
        </Typography>
        <form className="form">
          <TextField
            className="form-control"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className="form-control"
            label="Cuenta ID"
            value={cuentaID}
            onChange={(e) => setCuentaID(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className="form-control"
            label="Usuario ID"
            value={usuarioID}
            onChange={(e) => setUsuarioID(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            fullWidth
            className="submit-button"
          >
            Registrar Beneficiario
          </Button>
        </form>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Confirmar Registro</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas registrar este beneficiario?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(false)} className="alert">
            <AlertTitle>Success</AlertTitle>
            El beneficiario ha sido registrado exitosamente.
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError(false)} className="alert">
            <AlertTitle>Error</AlertTitle>
            Error al registrar el beneficiario. Verifica que el Cuenta ID y el Usuario ID sean correctos.
          </Alert>
        )}
      </Container>
    </>
  );
}

export default AddBeneficiarios;
