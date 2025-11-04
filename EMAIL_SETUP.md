# 📧 Email Setup Guide for Viru Jash Restaurant

This guide will help you set up email functionality for password reset and welcome emails.

## 🚀 Quick Setup

### 1. Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env file**:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### 2. Alternative Email Services

#### **SendGrid** (Production Recommended)
```bash
npm install @sendgrid/mail
```
```env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_USER=noreply@yourdomain.com
```

#### **AWS SES** (Enterprise)
```bash
npm install aws-sdk
```
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
EMAIL_USER=noreply@yourdomain.com
```

## 🔧 Configuration

### Environment Variables
Add these to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com          # Your email address
EMAIL_PASS=your-app-password             # App password (not regular password)
EMAIL_FROM_NAME=Viru Jash Restaurant     # Display name for emails
```

### Testing Email Setup

1. **Start the server**:
   ```bash
   npm run server
   ```

2. **Test password reset**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@restaurant.com"}'
   ```

3. **Check console output** for email status

## 📧 Email Templates

The system includes professional HTML email templates for:

### Password Reset Email
- **Subject**: "Password Reset Code - Viru Jash Restaurant"
- **Content**: Styled HTML with verification code
- **Security**: 15-minute expiry, security warnings

### Welcome Email
- **Subject**: "Welcome to Viru Jash Restaurant! 🍽️"
- **Content**: Welcome message with feature overview
- **Trigger**: Sent automatically on user registration

## 🛠️ Customization

### Update Email Templates
Edit `server/utils/emailService.js` to customize:
- Email styling and branding
- Content and messaging
- Sender information

### Add New Email Types
```javascript
const sendOrderConfirmationEmail = async (email, orderDetails) => {
    // Implementation
};
```

## 🔒 Security Best Practices

1. **Never commit email credentials** to version control
2. **Use app passwords** instead of regular passwords
3. **Implement rate limiting** for password reset requests
4. **Use environment variables** for all sensitive data
5. **Consider email service limits** (Gmail: 500/day)

## 🚨 Troubleshooting

### Common Issues

#### "Invalid login" error
- ✅ Enable 2-Factor Authentication
- ✅ Use App Password, not regular password
- ✅ Check EMAIL_USER and EMAIL_PASS in .env

#### "Connection timeout"
- ✅ Check internet connection
- ✅ Verify firewall settings
- ✅ Try different email service

#### Emails not received
- ✅ Check spam/junk folder
- ✅ Verify recipient email address
- ✅ Check email service quotas

### Debug Mode
Set `NODE_ENV=development` to see reset codes in console when email fails.

## 📊 Production Recommendations

### For Production Use:
1. **Use dedicated email service** (SendGrid, AWS SES, Mailgun)
2. **Set up proper domain authentication** (SPF, DKIM, DMARC)
3. **Implement email templates** in external service
4. **Add email analytics** and delivery tracking
5. **Set up email queues** for high volume

### Email Service Comparison:
| Service | Free Tier | Best For |
|---------|-----------|----------|
| Gmail | 500/day | Development |
| SendGrid | 100/day | Small apps |
| AWS SES | 200/day | Enterprise |
| Mailgun | 100/day | Developers |

## 🎯 Next Steps

1. Set up your email credentials in `.env`
2. Test the password reset functionality
3. Customize email templates as needed
4. Consider upgrading to professional email service for production

---

**Need Help?** Contact the development team or check the main README.md for more information.