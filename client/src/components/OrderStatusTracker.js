import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Chip } from '@mui/material';
import { CheckCircle, Restaurant, LocalShipping, DoneAll } from '@mui/icons-material';

const OrderStatusTracker = ({ status, compact = false }) => {
  const getActiveStep = (status) => {
    switch (status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'served': return 3;
      default: return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      case 'served': return 'default';
      case 'canceled': return 'error';
      default: return 'default';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'placed':
        return '🎉 Order received! Kitchen will start preparing soon.';
      case 'preparing':
        return '👨‍🍳 Your order is being prepared by our chefs.';
      case 'ready':
        return '🔔 Order ready! Please collect from counter.';
      case 'served':
        return '✅ Order completed! Enjoy your meal!';
      case 'canceled':
        return '❌ Order canceled. Please contact staff.';
      default:
        return '📋 Tracking your order...';
    }
  };

  const currentStep = getActiveStep(status);

  if (compact) {
    return (
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Chip 
            label={status.charAt(0).toUpperCase() + status.slice(1)} 
            color={getStatusColor(status)}
            className="pulse"
          />
          <Typography variant="body1" className="slide-in-left">
            {getStatusMessage(status)}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom textAlign="center" className="gradient-text">
        📊 Order Progress
      </Typography>
      
      <Stepper activeStep={currentStep} alternativeLabel className="stagger-item">
        <Step completed={currentStep > 0}>
          <StepLabel 
            icon={currentStep >= 0 ? <CheckCircle color={currentStep > 0 ? "success" : "primary"} /> : undefined}
          >
            Order Received
          </StepLabel>
        </Step>
        <Step completed={currentStep > 1}>
          <StepLabel 
            icon={currentStep >= 1 ? <Restaurant color={currentStep > 1 ? "success" : "primary"} /> : undefined}
          >
            Preparing
          </StepLabel>
        </Step>
        <Step completed={currentStep > 2}>
          <StepLabel 
            icon={currentStep >= 2 ? <LocalShipping color={currentStep > 2 ? "success" : "primary"} /> : undefined}
          >
            Ready
          </StepLabel>
        </Step>
        <Step completed={currentStep > 3}>
          <StepLabel 
            icon={currentStep >= 3 ? <DoneAll color="success" /> : undefined}
          >
            Served
          </StepLabel>
        </Step>
      </Stepper>

      <Box mt={3} textAlign="center">
        <Typography variant="h6" className="floating">
          {getStatusMessage(status)}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderStatusTracker;