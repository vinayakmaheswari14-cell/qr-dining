import React from 'react';
import { Fab, Badge, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const FloatingCartButton = ({ onClick }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  if (itemCount === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Fab
        color="primary"
        size="medium"
        onClick={onClick}
        className="animated-button pulse"
        sx={{
          width: 48,
          height: 48,
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
            transform: 'scale(1.1)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Badge 
          badgeContent={itemCount} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.75rem',
              fontWeight: 'bold',
              minWidth: '18px',
              height: '18px',
            }
          }}
        >
          <ShoppingCart sx={{ fontSize: '1.4rem' }} />
        </Badge>
      </Fab>
    </Box>
  );
};

export default FloatingCartButton;