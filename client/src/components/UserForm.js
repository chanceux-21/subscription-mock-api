import React, { useState } from 'react';
import { createUser } from '../services/api';
import { Button, TextField, Box, MenuItem } from '@mui/material';

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    account_type: 'carrier'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      alert(`User created! ID: ${response.data.id}`);
    } catch (error) {
      alert('Error creating user: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        select
        label="Account Type"
        name="account_type"
        value={formData.account_type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="carrier">Carrier</MenuItem>
        <MenuItem value="shipper">Shipper</MenuItem>
      </TextField>
      
      <Button type="submit" variant="contained" color="primary">
        Create User
      </Button>
    </Box>
  );
};

export default UserForm;
