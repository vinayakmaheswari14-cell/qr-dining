import React, { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Chip, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const DatabaseViewer = () => {
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDatabaseData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchDatabaseData = async () => {
    try {
      const response = await axios.get('/api/debug/db-overview');
      setDbData(response.data);
    } catch (error) {
      console.error('Error fetching database data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  if (user?.role !== 'admin') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" color="error" textAlign="center">
          Access Denied
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
          Only administrators can access the database viewer.
        </Typography>
      </Container>
    );
  }

  if (loading) return <Typography>Loading database data...</Typography>;
  if (!dbData) return <Typography>Failed to load database data</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Database Viewer
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        View all collections and data in your MongoDB database
      </Typography>

      {Object.entries(dbData.collections).map(([collectionName, collection]) => (
        <Accordion key={collectionName} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">
                {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
              </Typography>
              <Chip label={`${collection.count} records`} color="primary" size="small" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                maxHeight: '400px',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {formatJson(collection.data)}
              </pre>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default DatabaseViewer;