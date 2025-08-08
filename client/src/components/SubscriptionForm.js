import React, { useState } from 'react';
import { createSubscription } from '../services/api';
import { Button, TextField, Box, MenuItem } from '@mui/material';

const SubscriptionForm = ({ token }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    tariff: 'pro'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSubscription(formData, token);
      alert(`Subscription created! ID: ${response.data.id}`);
    } catch (error) {
      alert('Error creating subscription: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <TextField
        label="User ID"
        name="user_id"
        type="number"
        value={formData.user_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        select
        label="Tariff"
        name="tariff"
        value={formData.tariff}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="basic">Basic</MenuItem>
        <MenuItem value="pro">Pro</MenuItem>
        <MenuItem value="premium">Premium</MenuItem>
      </TextField>
      
      <Button type="submit" variant="contained" color="primary">
        Create Subscription
      </Button>
    </Box>
  );
};

export default SubscriptionForm;