import React, { useState } from 'react';
import { createUser } from './services/api';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import UserForm from './components/UserForm';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList';
import { login } from './services/api';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login();
      setToken(response.token);
      alert('Logged in successfully!');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Subscription Service
          </Typography>
          {!token ? (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={() => setToken('')}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <UserForm />
        
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Subscription Management
        </Typography>
        {token ? (
          <>
            <SubscriptionForm token={token} />
            <SubscriptionList />
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Please log in to manage subscriptions
          </Typography>
        )}
      </Container>
    </>
  );
}

export default App;