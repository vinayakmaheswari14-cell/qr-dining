import { Container, Typography, Box, Paper, Grid, Card, CardContent, Divider } from '@mui/material';

const Contact = () => {
  const teamMembers = [
    {
      name: 'Vinayak Maheshwari',
      phone: '820937099',
      role: 'Restaurant Manager',
      icon: '👨‍💼'
    },
    {
      name: 'Charu Mali',
      phone: '9352944264',
      role: 'Head Chef',
      icon: '👩‍🍳'
    },
    {
      name: 'Kashish Soni',
      phone: '8955090665',
      role: 'Customer Service Manager',
      icon: '👩‍💻'
    },
    {
      name: 'Jay Sharma',
      phone: '9424447265',
      role: 'Operations Coordinator',
      icon: '👨‍🔧'
    }
  ];

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
            Contact Viru Jash Restaurant
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1rem' }}>
            Get in touch with us for reservations, inquiries, or feedback
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card slide-in-left" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  🍽️ Restaurant Information
                </Typography>
                
                <Box mb={1.5}>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    📍 Address
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    123 Food Street, Vegetarian Plaza<br />
                    City Center, State - 123456
                  </Typography>
                </Box>

                <Box mb={1.5}>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    📞 Main Phone
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    +91 98765 43210
                  </Typography>
                </Box>

                <Box mb={1.5}>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    📧 Email
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    info@virujashrestaurant.com<br />
                    reservations@virujashrestaurant.com
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    🕒 Operating Hours
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    Monday - Sunday: 11:00 AM - 10:00 PM<br />
                    Kitchen closes at 9:30 PM
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card slide-in-right" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  📞 Quick Contact
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 2 }}>
                  For immediate assistance, call us directly:
                </Typography>

                <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold', mb: 1 }}>
                    📞 Reservations & Inquiries
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    +91 98765 43210
                  </Typography>
                </Box>

                <Box sx={{ bgcolor: '#e8f5e8', p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold', mb: 1 }}>
                    🍽️ Order & Delivery
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    +91 87654 32109
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                  * Call charges may apply as per your network provider
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold', mb: 1 }}>
                  🕒 Best Time to Call:
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  • Reservations: 10:00 AM - 9:00 PM<br />
                  • Orders: 11:00 AM - 9:30 PM<br />
                  • General Inquiries: 10:00 AM - 6:00 PM
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card elevation={4} className="hover-card stagger-item" sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  👥 Meet Our Team
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 3 }}>
                  Our dedicated team is here to serve you and ensure you have the best dining experience.
                </Typography>

                <Grid container spacing={2}>
                  {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper 
                        elevation={2} 
                        className="hover-card"
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          textAlign: 'center',
                          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                          }
                        }}
                      >
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {member.icon}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.9rem', mb: 0.5 }}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>
                          {member.role}
                        </Typography>
                        <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                            📱 +91 {member.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card stagger-item" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  🎉 Special Services
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  🎂 <strong>Birthday Celebrations:</strong> Special arrangements for birthdays
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  👥 <strong>Group Bookings:</strong> Perfect for family gatherings and parties
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  🏢 <strong>Corporate Catering:</strong> Office lunch and event catering
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  📱 <strong>QR Code Ordering:</strong> Contactless menu and ordering system
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  🚗 <strong>Takeaway & Delivery:</strong> Enjoy our food at home
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} className="hover-card stagger-item" sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
                  💬 Feedback & Suggestions
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 2 }}>
                  We value your feedback and continuously strive to improve our service.
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  📧 <strong>Email:</strong> feedback@virujashrestaurant.com
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 1 }}>
                  📱 <strong>WhatsApp:</strong> +91 98765 43210
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem', mb: 2 }}>
                  ⭐ <strong>Google Reviews:</strong> Share your experience online
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                  Your feedback helps us serve you better!
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
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.2rem' }}>
            Thank You for Choosing Viru Jash Restaurant! 🙏
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.95rem', opacity: 0.95 }}>
            We look forward to serving you delicious vegetarian cuisine and creating memorable dining experiences.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;