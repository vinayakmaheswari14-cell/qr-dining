import React from 'react';
import { Container, Typography } from '@mui/material';

const TestPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Test Page
      </Typography>
      <Typography variant="body1">
        This is a simple test page to verify the app is working.
      </Typography>
    </Container>
  );
};

export default TestPage;