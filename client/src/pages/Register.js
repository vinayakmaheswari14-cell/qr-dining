import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'customer' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData.name, formData.email, formData.password, formData.role);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2, py: 2 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
          Register
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2, fontSize: '0.85rem' }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
            sx={{ 
              '& .MuiInputLabel-root': { fontSize: '0.9rem' },
              '& .MuiInputBase-input': { fontSize: '0.9rem' }
            }}
          />
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel sx={{ fontSize: '0.9rem' }}>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              sx={{ fontSize: '0.9rem' }}
            >
              <MenuItem value="customer" sx={{ fontSize: '0.9rem' }}>Customer</MenuItem>
              <MenuItem value="staff" sx={{ fontSize: '0.9rem' }}>Staff</MenuItem>
              <MenuItem value="admin" sx={{ fontSize: '0.9rem' }}>Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1, py: 1, fontSize: '0.9rem' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;