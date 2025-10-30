import React, { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
  </div>
);

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tables, setTables] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [itemsRes, categoriesRes, tablesRes] = await Promise.all([
        axios.get('/api/menu/items'),
        axios.get('/api/menu/categories'),
        axios.get('/api/tables')
      ]);

      setMenuItems(itemsRes.data.items);
      setCategories(categoriesRes.data);
      setTables(tablesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ fontSize: '1.4rem', mt: 2 }}>
          Access Denied - Admin Only
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, py: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '1.8rem', fontWeight: 600, mb: 2 }}>
        Admin Dashboard
      </Typography>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="Menu Items" sx={{ fontSize: '0.9rem', minHeight: 40 }} />
        <Tab label="Categories" sx={{ fontSize: '0.9rem', minHeight: 40 }} />
        <Tab label="Tables & QR Codes" sx={{ fontSize: '0.9rem', minHeight: 40 }} />
        <Tab label="Analytics" sx={{ fontSize: '0.9rem', minHeight: 40 }} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', mb: 1 }}>
          Menu Items Management
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          Total Items: {menuItems.length}
        </Typography>
        {/* Add menu item management UI here */}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', mb: 1 }}>
          Categories Management
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          Total Categories: {categories.length}
        </Typography>
        {/* Add category management UI here */}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', mb: 1 }}>
          Tables & QR Codes
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          Total Tables: {tables.length}
        </Typography>
        {/* Add table management UI here */}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', mb: 1 }}>
          Analytics
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          Analytics dashboard coming soon...
        </Typography>
      </TabPanel>
    </Container>
  );
};

export default AdminDashboard;