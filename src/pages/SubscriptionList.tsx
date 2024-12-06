import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';

interface Subscription {
  id: number;
  customer_name: string;
  product_name: string;
  subscription_start_date: string;
  subscription_end_date: string;
  no_of_users_subscribed: number;
}

const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/subscriptions/')
      .then(response => {
        setSubscriptions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

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
      <Typography variant="h4" style={{ margin: '20px 0' }}>Subscriptions</Typography>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="subscription table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>No. of Users Subscribed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.customer_name}</TableCell>
                <TableCell>{subscription.product_name}</TableCell>
                <TableCell>{subscription.subscription_start_date}</TableCell>
                <TableCell>{subscription.subscription_end_date}</TableCell>
                <TableCell>{subscription.no_of_users_subscribed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SubscriptionList;