import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CustomerList from './pages/CustomerList';
import ProductList from './pages/ProductList';
import SubscriptionList from './pages/SubscriptionList';
import AddSubscription from './pages/AddSubscription';
import ExtendSubscription from './pages/ExtendSubscription';
import EndSubscription from './pages/EndSubscription';
import RevenueReport from './pages/RevenueReport';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            XYZ Enterprises
          </Typography>
          <Button color="inherit" href="/">Customers</Button>
          <Button color="inherit" href="/products">Products</Button>
          <Button color="inherit" href="/subscriptions">Subscriptions</Button>
          <Button color="inherit" href="/add-subscription">Add Subscription</Button>
          <Button color="inherit" href="/extend-subscription">Extend Subscription</Button>
          <Button color="inherit" href="/end-subscription">End Subscription</Button>
          <Button color="inherit" href="/revenue-report">Revenue Report</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/add-subscription" element={<AddSubscription />} />
          <Route path="/extend-subscription" element={<ExtendSubscription />} />
          <Route path="/end-subscription" element={<EndSubscription />} />
          <Route path="/revenue-report" element={<RevenueReport />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;