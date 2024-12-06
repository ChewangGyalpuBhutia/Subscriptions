import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
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

const ExtendSubscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleSubmit = () => {
    if (selectedSubscription) {
      setSubmitting(true);
      api.put(`/subscriptions/${selectedSubscription}/`, {
        subscription_end_date: endDate,
      })
        .then(response => {
          alert('Subscription extended successfully');
          setSubmitting(false);
        })
        .catch(error => {
          console.error(error);
          setSubmitting(false);
        });
    }
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
      <Typography variant="h4" gutterBottom>Extend Subscription</Typography>
      <TextField
        select
        label="Subscription"
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
        fullWidth
        margin="normal"
      >
        {subscriptions.map((subscription) => (
          <MenuItem key={subscription.id} value={subscription.id.toString()}>
            {subscription.customer_name} - {subscription.product_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="New End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? <CircularProgress size={24} /> : 'Extend Subscription'}
      </Button>
    </Container>
  );
};

export default ExtendSubscription;