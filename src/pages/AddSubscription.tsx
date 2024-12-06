import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  product_name: string;
}

const AddSubscription: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<number | null>(null);
  const [product, setProduct] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [noOfUsers, setNoOfUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([
      api.get('/customers/'),
      api.get('/products/')
    ])
    .then(([customersResponse, productsResponse]) => {
      setCustomers(customersResponse.data);
      setProducts(productsResponse.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  const handleSubmit = () => {
    setSubmitting(true);
    api.post('/subscriptions/', {
      customer,
      product,
      subscription_start_date: startDate,
      subscription_end_date: endDate,
      no_of_users_subscribed: noOfUsers,
    })
      .then(response => {
        alert('Subscription added successfully');
        console.log(response);
        setSubmitting(false);
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Subscription</Typography>
      <TextField
        select
        label="Customer"
        value={customer}
        onChange={(e) => setCustomer(Number(e.target.value))}
        fullWidth
        margin="normal"
      >
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Product"
        value={product}
        onChange={(e) => setProduct(Number(e.target.value))}
        fullWidth
        margin="normal"
      >
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.product_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Number of Users"
        type="number"
        value={noOfUsers}
        onChange={(e) => setNoOfUsers(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? <CircularProgress size={24} /> : 'Add Subscription'}
      </Button>
    </Container>
  );
};

export default AddSubscription;