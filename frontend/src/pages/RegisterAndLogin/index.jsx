import React, { useState, useContext } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';
import { useLoginMutation, useRegisterMutation } from '../../redux/services/users';
import { MyContext } from '../../App.jsx';

function AuthForm({onLogin}) {
 
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Login state and hooks
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {


      const response = await login(loginData).unwrap();

      console.log(response);

      
      localStorage.setItem('token', response.token);
    

      onLogin();

      navigate('/');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  // Register state and hooks
  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerData).unwrap();
      console.log('User registered successfully:', response);
      setIsLogin(true); // Switch to login form after successful registration
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  if (isLoginLoading || isRegisterLoading) return <div>Loading...</div>;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="icon-container">
          <IconButton onClick={toggleForm}>
            {isLogin ? <PersonAdd fontSize="large" /> : <Login fontSize="large" />}
          </IconButton>
        </div>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <h2>LOGIN</h2>
            <TextField
              id="login-email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <TextField
              id="login-password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
            <Link to="/forgotpassword">Forgot password? Click Here</Link>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <h2>SIGNUP</h2>
            <TextField
              id="register-fullname"
              name="fullname"
              label="Full Name"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={registerData.fullname}
              onChange={handleRegisterChange}
            />
            <TextField
              id="register-email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <TextField
              id="register-password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <TextField
              id="register-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              required
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
