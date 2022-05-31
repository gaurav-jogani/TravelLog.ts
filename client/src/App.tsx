import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/auth/login';
import { SignUp } from './components/auth/signUp';
import { Dashboard } from './components/dashboard/dashboard';
import { ForgotPassword } from './components/auth/forgotpassword';
import { useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [message,setMessage] = useState<string>('')
  const handleOpen = (severity : AlertColor,message : string) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div className='App'>
      <div><Navbar showToast={handleOpen} navigate={navigate} /></div>
      <div className='containerDiv'>
        <Routes>
          <Route path='/' element={<Dashboard navigate={navigate} showToast={handleOpen} />} />
          <Route path='/login' element={<Login navigate={navigate} showToast={handleOpen} />} />
          <Route path='/signup' element={<SignUp navigate={navigate} showToast={handleOpen} />} />
          <Route path='/forgotpassword' element={<ForgotPassword showToast={handleOpen} navigate={navigate} />} />
          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      </div>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default App;
