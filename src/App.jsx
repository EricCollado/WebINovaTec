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
import PrestamosForm from './Components/PrestamosForm/PrestamosForm';
import BeneficiariosForm from './Components/BeneficiariosForm/BeneficiariosForm';
import AddBeneficiarios from './Components/BeneficiariosForm/AddBeneficiarios';

function App() {


  return (
    <ClientProvider>
    <Router>
    <Routes>
    <Route path="/" element={<LoginForm/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/cuentas" element={<CuentasCliente/>} />
      <Route path="/cuentas/transacciones" element={<Cuentas/>} />
      <Route path="/transaccion" element={<TransaccionForm/>} />
      <Route path="/prestamos" element={<PrestamosForm/>} />

      <Route path="/beneficiarios/lista" element={<BeneficiariosForm/>} />
      <Route path="/beneficiarios/nuevo" element={<AddBeneficiarios/>} />
     
      
      

    </Routes>
  </Router>
  </ClientProvider>
  )
}

export default App
