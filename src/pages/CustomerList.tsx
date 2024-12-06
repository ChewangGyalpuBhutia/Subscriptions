import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';

interface Customer {
  id: number;
  customer_id: string;
  name: string;
  pan: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginTop: '20px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const CustomerList: React.FC = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/customers/')
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={classes.loader}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" style={{marginTop: 20}}>Customers</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customer table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>PAN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.pan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerList;