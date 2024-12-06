import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';

interface Product {
  id: number;
  product_name: string;
  description: string;
  annual_subscription_cost_per_user: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" style={{ margin: '20px 0' }}>Products</Typography>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Annual Subscription Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.annual_subscription_cost_per_user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;