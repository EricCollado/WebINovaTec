import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Container, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Button,
  Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  IconButton
} from '@mui/material';
import { ClientContext } from '../clientID';
import { CheckCircle, Cancel, AccountBalanceWallet } from '@mui/icons-material';
import Navbar from '../HomeForm/Navbar';
import './TransaccionForm.css';

const TransaccionForm = () => {
  const [cuentas, setCuentas] = useState([]);
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { clientID } = useContext(ClientContext);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
  const clientIDe = sessionStorage.getItem('clientID');

  useEffect(() => {
    console.log('Fetching cuentas for clientID:', clientIDe);
    axios.get(`https://localhost:7033/api/Cuentas/Cliente/${clientIDe}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    })
    .then(response => {
      console.log('Response data:', response.data);
      setCuentas(response.data.$values || []);
    })
    .catch(error => {
      console.error('Error fetching cuentas:', error);
    });
  }, [clientIDe]);

  const handleTipoCuentaChange = (event) => {
    setTipoCuenta(event.target.value);
  };

  const handleCuentaOrigenChange = (event) => {
    setCuentaOrigen(event.target.value);
  };

  const handleCuentaDestinoChange = (event) => {
    setCuentaDestino(event.target.value);
  };

  const handleMontoChange = (event) => {
    setMonto(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const transaccion = {
      cuentaID: 0, // Debe asignarse de acuerdo a tu lógica de negocio
      tipoTransaccionID: 3, // Este es un ejemplo, ajusta según tu lógica
      monto: parseFloat(monto),
      fechaTransaccion: new Date().toISOString(),
      cuentaOrigenID: cuentaOrigen,
      cuentaDestinoID: cuentaDestino
    };

    console.log('Transacción:', transaccion);

    // Realizar la llamada a la API para hacer la transacción
    axios.post('https://localhost:7033/api/Transacciones', transaccion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Transacción realizada:', response.data);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error => {
      console.error('Error realizando la transacción:', error);
      alert('Hubo un error al realizar la transacción');
    });

    handleCloseDialog();
  };

  return (
    <>
      <Navbar />
      <Container className="container">
        {success && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Transacción realizada con éxito.
          </Alert>
        )}
        <Typography variant="h4" component="h1" gutterBottom>
          Cuenta Origen
        </Typography>
        <FormControl variant="standard"className="form-control select-container">
          <InputLabel id="cuenta-origen-label">Seleccione la cuenta de origen</InputLabel>
          <Select
            labelId="cuenta-origen-label"
            value={cuentaOrigen}
            onChange={handleCuentaOrigenChange}
            MenuProps={{
              classes: { paper: 'select-menu' }
            }}
          >
            {cuentas.length > 0 ? (
              cuentas.map(cuenta => (
                <MenuItem key={cuenta.cuentaId} value={cuenta.cuentaId}>
                  {cuenta.cuentaId} - Balance: RD$ {cuenta.balance}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay cuentas disponibles.</MenuItem>
            )}
          </Select>
        </FormControl>

        <Typography variant="h4" component="h1" gutterBottom>
          Cuenta Destino
        </Typography>
        <FormControl variant="standard"className="form-control select-container">
          <InputLabel id="tipo-cuenta-label">Seleccione el tipo de cuenta</InputLabel>
          <Select
            labelId="tipo-cuenta-label"
            value={tipoCuenta}
            onChange={handleTipoCuentaChange}
            MenuProps={{
              classes: { paper: 'select-menu' }
            }}
          >
            <MenuItem value="Entre mis cuentas">Entre mis cuentas</MenuItem>
            <MenuItem value="Otros bancos">Otros bancos</MenuItem>
            <MenuItem value="Terceros Popular">Terceros en el banco</MenuItem>
          </Select>
        </FormControl>

        {tipoCuenta === 'Entre mis cuentas' && (
          <div>
            <FormControl variant="standard" className="form-control select-container">
              <InputLabel id="cuenta-destino-label">Seleccione la cuenta destino</InputLabel>
              <Select
                labelId="cuenta-destino-label"
                value={cuentaDestino}
                onChange={handleCuentaDestinoChange}
                MenuProps={{
                  classes: { paper: 'select-menu' }
                }}
              >
                {cuentas.length > 0 ? (
                  cuentas.map(cuenta => (
                    <MenuItem key={cuenta.cuentaId} value={cuenta.cuentaId}>
                      {cuenta.cuentaId} - Balance: RD$ {cuenta.balance}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay cuentas disponibles.</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl variant="standard"className="form-control amount-input-container">
              <TextField
                label="Monto a transferir"
                value={monto}
                onChange={handleMontoChange}
                type="number"
                InputLabelProps={{
                  className: 'input-label'
                }}
                InputProps={{
                  className: 'input'
                }}
              />
            </FormControl>
            <Button variant="contained" className="submit-button" onClick={handleOpenDialog}>
              Realizar Transferencia
            </Button>
          </div>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            <AccountBalanceWallet fontSize="large" style={{ marginRight: '8px' }} />
            Confirmar Transferencia
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea realizar la transferencia de RD$ {monto} desde la cuenta {cuentaOrigen} a la cuenta {cuentaDestino}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" startIcon={<Cancel />}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="success" startIcon={<CheckCircle />}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default TransaccionForm;
