import { Container, Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';

const About = () => {
  return (
    <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 3 }}>
        <Paper 
          elevation={6} 
          className="bounce-in"
          sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.8rem' }}>
            About Viru Jash Restaurant
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1rem' }}>
            Pure Vegetarian Indian Cuisine & Modern Dining Experience
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card slide-in-left" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  🍽️ Our Story
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 2 }}>
                  Established with a passion for authentic Indian vegetarian cuisine, Viru Jash Restaurant 
                  has been serving delicious, wholesome meals that celebrate the rich culinary heritage of India.
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Our journey began with a simple mission: to provide fresh, flavorful vegetarian dishes 
                  that bring families together and create memorable dining experiences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card slide-in-right" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  🌱 Our Values
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🌱 <strong>100% Vegetarian:</strong> Pure vegetarian cuisine with no compromise
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🥬 <strong>Fresh Ingredients:</strong> Daily sourced fresh vegetables and spices
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  👨‍🍳 <strong>Authentic Recipes:</strong> Traditional cooking methods and family recipes
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  💚 <strong>Healthy Living:</strong> Promoting wellness through nutritious meals
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card stagger-item" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  ⭐ What Makes Us Special
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  ⚡ <strong>QR Code Ordering:</strong> Modern technology for seamless dining
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🍽️ <strong>Diverse Menu:</strong> From North Indian to South Indian specialties
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  👥 <strong>Family Friendly:</strong> Warm atmosphere for all age groups
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  💰 <strong>Affordable Pricing:</strong> Quality food at reasonable prices
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card stagger-item" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  🍛 Our Specialties
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🍛 <strong>Dal Makhani:</strong> Rich, creamy black lentils slow-cooked to perfection
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🧀 <strong>Paneer Tikka:</strong> Grilled cottage cheese with aromatic spices
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 1 }}>
                  🍚 <strong>Vegetable Biryani:</strong> Fragrant basmati rice with mixed vegetables
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  🍨 <strong>Traditional Desserts:</strong> Authentic Gulab Jamun and Kulfi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper 
          elevation={4} 
          className="slide-in-left"
          sx={{ 
            p: 3, 
            mt: 3, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.2rem' }}>
            🎯 Our Mission
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.95 }}>
            To serve authentic, healthy, and delicious vegetarian food that nourishes the body and soul, 
            while creating a warm and welcoming environment where every guest feels like family.
          </Typography>
        </Paper>

        <Paper 
          elevation={4} 
          className="slide-in-right"
          sx={{ 
            p: 3, 
            mt: 3, 
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.2rem' }}>
            🏪 Visit Us Today!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.95rem', mb: 2 }}>
            Experience the authentic taste of India with our carefully crafted vegetarian dishes.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
            Open Daily: 11:00 AM - 10:00 PM | Dine-in • Takeaway • QR Code Ordering
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;