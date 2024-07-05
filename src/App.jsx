// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/HomeForm/Home'
import Cuentas from './Components/CuentasForm/Cuentas'
import CuentasCliente from './Components/CuentasForm/CuentaCliente';
import { ClientProvider } from './Components/clientID';
import TransaccionForm from './Components/TransaccionForm/TransaccionForm';

function App() {


  return (
    <ClientProvider>
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/cuentas" element={<CuentasCliente/>} />
      <Route path="/cuentas/transacciones" element={<Cuentas/>} />
      <Route path="/transaccion" element={<TransaccionForm/>} />

    </Routes>
  </Router>
  </ClientProvider>
  )
}

export default App
