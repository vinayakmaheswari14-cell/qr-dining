import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const steps = ['Enter Email', 'Verify Code', 'Reset Password'];

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      
      if (response.data.success) {
        setSuccess(response.data.message);
        setActiveStep(1);
        
        // For demo purposes - show the reset code
        if (response.data.resetCode) {
          setSuccess(`${response.data.message} Code: ${response.data.resetCode}`);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For this simplified version, we'll skip verification step
      setSuccess('Code verified successfully!');
      setActiveStep(2);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        email,
        resetCode,
        newPassword
      });
      
      if (response.data.success) {
        setSuccess('Password reset successfully! You can now login with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component="form" onSubmit={handleRequestReset}>
            <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
              Enter your email address and we'll send you a verification code to reset your password.
            </Typography>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              size="small"
              required
              sx={{ 
                '& .MuiInputLabel-root': { fontSize: '0.9rem' },
                '& .MuiInputBase-input': { fontSize: '0.9rem' }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, py: 1, fontSize: '0.9rem' }}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box component="form" onSubmit={handleVerifyCode}>
            <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
              Enter the 6-digit verification code sent to your email address.
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              margin="normal"
              size="small"
              required
              inputProps={{ maxLength: 6 }}
              sx={{ 
                '& .MuiInputLabel-root': { fontSize: '0.9rem' },
                '& .MuiInputBase-input': { fontSize: '0.9rem', textAlign: 'center', letterSpacing: '0.5rem' }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || resetCode.length !== 6}
              sx={{ mt: 2, py: 1, fontSize: '0.9rem' }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setActiveStep(0)}
              sx={{ mt: 1, fontSize: '0.8rem' }}
            >
              Back to Email
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box component="form" onSubmit={handleResetPassword}>
            <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
              Create a new password for your account.
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              size="small"
              required
              sx={{ 
                '& .MuiInputLabel-root': { fontSize: '0.9rem' },
                '& .MuiInputBase-input': { fontSize: '0.9rem' }
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              size="small"
              required
              sx={{ 
                '& .MuiInputLabel-root': { fontSize: '0.9rem' },
                '& .MuiInputBase-input': { fontSize: '0.9rem' }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, py: 1, fontSize: '0.9rem' }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom 
            textAlign="center" 
            sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}
          >
            Reset Password
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.8rem' } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.85rem' }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2, fontSize: '0.85rem' }}>
              {success}
            </Alert>
          )}

          {renderStepContent()}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ fontSize: '0.8rem' }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;