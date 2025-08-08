import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../services/api';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Typography 
} from '@mui/material';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubscriptions(search);
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
    
    fetchData();
  }, [search]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Subscriptions
      </Typography>
      
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Tariff</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.user_id}</TableCell>
                <TableCell>{sub.tariff}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell>{new Date(sub.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubscriptionList;