import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'routes/AuthContext';
import img1 from './Login.png';

function Login() {
  const login=process.env.REACT_APP_BASE_URL
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    phone_no: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    phone_no: '',
    password: '',
    server: '' // Added a server field for server errors
  });

  const { isLoggedIn } = useContext(AuthContext);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({});

    // if (values.email.trim() === '') {
    //   setErrors((prev) => ({ ...prev, email: 'Email is required.' }));

    //   return;
    // }

    if (values.password === '') {
      setErrors((prev) => ({ ...prev, password: 'Password is required.' }));

      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, values)
      .then((res) => {
        console.log(res.data);

        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          // Assuming you receive the user role from the API response
          const userRole = res.data.email; // Replace 'role' with the actual field name in your API response

          // Set the user role to local storage or state
          localStorage.setItem('userRole', res.data.user_type);

          const loginTime = new Date(); // Get the current login time
          console.log("time",loginTime);
          // Update the 'values' object with the login time
          values.loginTime = loginTime;
          values.name = res.data.user_name;
          console.log("valuae",values)
          axios
            .post(`${process.env.REACT_APP_BASE_URL}/api/userlog`, values) // Send login time to the server
            .then((logResponse) => {
              console.log('User log created:', logResponse.data);
              navigate('/');
              window.location.reload();
            })
            .catch((logError) => {
              console.log('Failed to create user log:', logError);
              navigate('/');
              window.location.reload();
            });
        } else {
          console.log('Login failed: Invalid response');
          setErrors((prev) => ({ ...prev, server: 'Invalid response from server' }));
        }
      })
      .catch((err) => {
        console.log('Login failed:', err.response?.data || 'An error occurred.');
        setErrors((prev) => ({ ...prev, server: err.response?.data.message || 'An error occurred.' }));
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/pages/login/login3');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <div>
            <img
              src={img1}
              class="image"
              alt="pop"
              marginleft="250px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70px"
            />
          </div>

          <h2 style={{ color: '#7D0000', fontFamily: 'poppins' }}>VINSUP GMS</h2>

          <TextField
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="Mobile No"
            name="phone_no"
            value={values.phone_no}
            onChange={handleInput}
            style={{ width: '300px' }}
            error={!!errors.phone_no}
            helperText={errors.phone_no}
          />
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInput}
            style={{ width: '300px' }}
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              // <-- This is where the toggle button is added
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <br />

          <Button type="submit" variant="contained" style={{ backgroundColor: '#7D0000' }}>
            Login
          </Button>

          {errors.server && (
            <Typography variant="body1" color="error" marginTop={2}>
              {errors.server}
            </Typography>
          )}

          {errors.phone_no && (
            <Typography variant="body1" color="error" marginTop={2}>
              {errors.phone_no}
            </Typography>
          )}
        </Box>
      </form>
    </div>
  );
}

export default Login;
