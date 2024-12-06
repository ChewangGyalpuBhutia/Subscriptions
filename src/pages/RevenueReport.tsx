import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';

const RevenueReport: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/revenue/')
      .then(response => {
        setRevenue(response.data.total_revenue);
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
      <Typography variant="h4" gutterBottom>Revenue Report</Typography>
      <Typography variant="h6">Total Revenue: ${revenue.toFixed(2)}</Typography>
    </Container>
  );
};

export default RevenueReport;