import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Button,
  Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
} from '@mui/material';
import { CheckCircle, Cancel, AccountBalanceWallet } from '@mui/icons-material';
import Navbar from '../HomeForm/Navbar';
import './TransaccionForm.css';

const TransaccionForm = () => {
  const [cuentas, setCuentas] = useState([]);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [beneficiarioID, setBeneficiarioID] = useState('');
  const [monto, setMonto] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikp1YW4iLCJyb2xlIjoiQWRtaW4iLCJDbGllbnRlSUQiOiIxIiwibmJmIjoxNzIwMDM3NzQ0LCJleHAiOjE3MjA5MDE3NDQsImlhdCI6MTcyMDAzNzc0NCwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.4ijDafv4X7qmmbyGLAulJn2zg5zJVVhJ-f__0JenYrQ';
  const clientIDe = sessionStorage.getItem('clientID');

  useEffect(() => {
    axios.get(`https://localhost:7033/api/Cuentas/Cliente/${clientIDe}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    })
    .then(response => {
      setCuentas(response.data.$values || []);
    })
    .catch(error => {
      console.error('Error fetching cuentas:', error);
    });

    if (tipoCuenta === 'Terceros en el banco') {
      axios.get('https://localhost:7033/api/Beneficiarios', {
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
    }
  }, [clientIDe, tipoCuenta]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError('');
        setTipoCuenta('');
        setCuentaOrigen('');
        setCuentaDestino('');
        setBeneficiarioID('');
        setMonto('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleTipoCuentaChange = (event) => {
    setTipoCuenta(event.target.value);
    if (event.target.value !== 'Terceros en el banco') {
      setBeneficiarioID('');
    }
  };

  const handleCuentaOrigenChange = (event) => {
    setCuentaOrigen(event.target.value);
  };

  const handleCuentaDestinoChange = (event) => {
    setCuentaDestino(event.target.value);
  };

  const handleBeneficiarioChange = (event) => {
    setBeneficiarioID(event.target.value);
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
    handleCloseDialog();

    const cuenta = cuentas.find(cuenta => cuenta.cuentaId === cuentaOrigen);

    if (parseFloat(monto) > cuenta.balance) {
      setError('El monto a transferir es mayor que el saldo de la cuenta de origen.');
      return;
    }

    const transaccion = {
      cuentaID: cuentaOrigen,
      monto: parseFloat(monto),
      fechaTransaccion: new Date().toISOString(),
      cuentaDestinoID: tipoCuenta === 'Entre mis cuentas' ? cuentaDestino : 0,
      beneficiarioID: tipoCuenta === 'Terceros en el banco' ? beneficiarioID : 0,
      tipoTransaccionID: tipoCuenta === 'Entre mis cuentas' ? 3 : 4
    };

    axios.post('https://localhost:7033/api/Transacciones', transaccion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setSuccess(true);
    })
    .catch(error => {
      console.error('Error realizando la transacción:', error);
      setError('Hubo un error al realizar la transacción');
    });
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
      <Navbar />
      <Container className="container">
        {error && (
          <Alert severity="error" onClose={() => setError('')} className="alert">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="alert">
            <AlertTitle>Success</AlertTitle>
            Transacción realizada con éxito.
          </Alert>
        )}
        <Typography variant="h4" component="h1" gutterBottom>
          Cuenta Origen
        </Typography>
        <form className="form">
          <FormControl variant="outlined" className="form-control">
            <InputLabel id="cuenta-origen-label">Seleccione la cuenta de origen</InputLabel>
            <Select
              labelId="cuenta-origen-label"
              value={cuentaOrigen}
              onChange={handleCuentaOrigenChange}
            >
              {cuentas.map(cuenta => (
                <MenuItem key={cuenta.cuentaId} value={cuenta.cuentaId}>
                  {getAccountType(cuenta.tipoCuentaID)} - Balance: RD$ {cuenta.balance}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h4" component="h1" gutterBottom className="form-title" style={{ textAlign: 'left' }}>
            Cuenta Destino
          </Typography>
          <FormControl variant="outlined" className="form-control">
            <InputLabel id="tipo-cuenta-label">Seleccione el tipo de cuenta</InputLabel>
            <Select
              labelId="tipo-cuenta-label"
              value={tipoCuenta}
              onChange={handleTipoCuentaChange}
              className="form-select"
            >
              <MenuItem value="Entre mis cuentas">Entre mis cuentas</MenuItem>
              <MenuItem value="Terceros en el banco">Terceros en el banco</MenuItem>
            </Select>
          </FormControl>

          {tipoCuenta === 'Entre mis cuentas' && (
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="cuenta-destino-label">Seleccione la cuenta destino</InputLabel>
              <Select
                labelId="cuenta-destino-label"
                value={cuentaDestino}
                onChange={handleCuentaDestinoChange}
                className="form-select"
              >
                {cuentas.map(cuenta => (
                  <MenuItem key={cuenta.cuentaId} value={cuenta.cuentaId}>
                    {getAccountType(cuenta.tipoCuentaID)} - Balance: RD$ {cuenta.balance}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {tipoCuenta === 'Terceros en el banco' && (
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="beneficiario-label">Seleccione el beneficiario</InputLabel>
              <Select
                labelId="beneficiario-label"
                value={beneficiarioID}
                onChange={handleBeneficiarioChange}
                className="form-select"
              >
                {beneficiarios.map(beneficiario => (
                  <MenuItem key={beneficiario.beneficiarioID} value={beneficiario.beneficiarioID}>
                    {beneficiario.nombre} - Cuenta ID: {beneficiario.cuentaID}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl variant="outlined" className="form-control">
            <TextField
              label="Monto a transferir"
              value={monto}
              onChange={handleMontoChange}
              type="number"
              className="form-input"
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            className="form-button"
            endIcon={<AccountBalanceWallet />}
            onClick={handleOpenDialog}
          >
            Realizar Transferencia
          </Button>
        </form>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmar Transferencia</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea realizar la transferencia de RD$ {monto} desde la cuenta {cuentaOrigen} a la cuenta {cuentaDestino}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" startIcon={<Cancel />}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary" startIcon={<CheckCircle />}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default TransaccionForm;
