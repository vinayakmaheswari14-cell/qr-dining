# 📧 Gmail Setup Guide for Viru Jash Restaurant Email System

Follow these detailed steps to enable Gmail for sending password reset and welcome emails.

## 🚀 Step-by-Step Gmail Configuration

### Step 1: Enable 2-Factor Authentication

1. **Go to Google Account Settings**
   - Open your web browser
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Sign in with your Gmail account

2. **Navigate to Security**
   - Click on **"Security"** in the left sidebar
   - Or go directly to [myaccount.google.com/security](https://myaccount.google.com/security)

3. **Enable 2-Step Verification**
   - Look for **"2-Step Verification"** section
   - Click **"2-Step Verification"**
   - Click **"Get Started"**
   - Follow the prompts to set up 2FA using:
     - Your phone number (SMS or call)
     - Google Authenticator app
     - Backup codes

4. **Complete 2FA Setup**
   - Verify your phone number
   - Test the 2FA method
   - Save backup codes in a safe place

### Step 2: Generate App Password

1. **Return to Security Settings**
   - Go back to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Make sure 2-Step Verification shows as **"On"**

2. **Find App Passwords**
   - Look for **"App passwords"** section
   - Click **"App passwords"**
   - You may need to sign in again

3. **Generate New App Password**
   - In the **"Select app"** dropdown, choose **"Mail"**
   - In the **"Select device"** dropdown, choose **"Other (Custom name)"**
   - Type: **"Viru Jash Restaurant"**
   - Click **"Generate"**

4. **Copy the App Password**
   - Google will show a 16-character password like: `abcd efgh ijkl mnop`
   - **IMPORTANT**: Copy this password immediately
   - You won't be able to see it again
   - Remove spaces when copying: `abcdefghijklmnop`

### Step 3: Update Your .env File

1. **Open your .env file** in the project root directory

2. **Update the email configuration**:
   ```env
   # Replace with your actual Gmail address
   EMAIL_USER=your-gmail-address@gmail.com
   
   # Replace with the 16-character app password (no spaces)
   EMAIL_PASS=abcdefghijklmnop
   
   # Optional: Customize the sender name
   EMAIL_FROM_NAME=Viru Jash Restaurant
   ```

3. **Example .env configuration**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/scan-dine-lite
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_REFRESH_SECRET=your-refresh-secret-key
   NODE_ENV=development
   PORT=5000
   
   # Email Configuration
   EMAIL_USER=restaurant.owner@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   EMAIL_FROM_NAME=Viru Jash Restaurant
   ```

### Step 4: Test the Email Configuration

1. **Restart your server**:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart
   npm run server
   ```

2. **Test password reset email**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@restaurant.com"}'
   ```

3. **Check for success**:
   - Look for "✅ Password reset email sent successfully" in server console
   - Check the recipient's email inbox (including spam folder)

## 🔍 Troubleshooting Common Issues

### Issue 1: "Invalid login" Error
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solutions:**
- ✅ Make sure 2-Factor Authentication is enabled
- ✅ Use the App Password, not your regular Gmail password
- ✅ Remove all spaces from the app password
- ✅ Double-check EMAIL_USER has the correct Gmail address

### Issue 2: "App passwords" option not visible

**Solutions:**
- ✅ Ensure 2-Step Verification is fully enabled and working
- ✅ Wait a few minutes after enabling 2FA
- ✅ Try signing out and back into your Google account
- ✅ Use a different browser or incognito mode

### Issue 3: Emails going to spam folder

**Solutions:**
- ✅ Check recipient's spam/junk folder
- ✅ Add your Gmail address to recipient's contacts
- ✅ Ask recipient to mark emails as "Not Spam"

### Issue 4: Daily sending limits

**Gmail Limits:**
- **Free Gmail**: 500 emails per day
- **Google Workspace**: 2000 emails per day

**Solutions:**
- ✅ Monitor your daily email count
- ✅ Consider upgrading to Google Workspace for higher limits
- ✅ For production, use dedicated email services (SendGrid, AWS SES)

## 🔒 Security Best Practices

### 1. Protect Your Credentials
- ✅ Never commit .env file to version control
- ✅ Add .env to your .gitignore file
- ✅ Use different app passwords for different applications
- ✅ Regularly rotate app passwords

### 2. Monitor Email Activity
- ✅ Check Google Account activity regularly
- ✅ Review "Recent security activity" in Google Account
- ✅ Revoke unused app passwords

### 3. Backup and Recovery
- ✅ Save backup codes from 2FA setup
- ✅ Keep app passwords in a secure password manager
- ✅ Document which app password is used for which application

## 📱 Alternative 2FA Methods

If you prefer not to use SMS, you can use:

### Google Authenticator App
1. Download Google Authenticator app
2. Scan QR code during 2FA setup
3. Use 6-digit codes from the app

### Hardware Security Keys
1. Purchase a FIDO2 security key
2. Register it during 2FA setup
3. Use physical key for authentication

## 🎯 Production Recommendations

For production use, consider:

### 1. Dedicated Email Service
- **SendGrid**: 100 free emails/day, then paid plans
- **AWS SES**: $0.10 per 1,000 emails
- **Mailgun**: 100 free emails/day, then paid plans

### 2. Custom Domain
- Use your own domain: `noreply@virujashrestaurant.com`
- Set up SPF, DKIM, and DMARC records
- Improves deliverability and trust

### 3. Email Templates
- Use external template services
- A/B test email designs
- Track open rates and click-through rates

## ✅ Verification Checklist

Before going live, verify:

- [ ] 2-Factor Authentication is enabled on Gmail
- [ ] App password is generated and copied correctly
- [ ] .env file is updated with correct credentials
- [ ] .env file is added to .gitignore
- [ ] Server restarts successfully
- [ ] Test email sends successfully
- [ ] Email appears in recipient's inbox (not spam)
- [ ] Email template displays correctly
- [ ] All links in email work properly

## 🆘 Need Help?

If you encounter issues:

1. **Check server console** for detailed error messages
2. **Verify Gmail settings** by logging into your Google Account
3. **Test with a simple email** to yourself first
4. **Check Google Account security activity** for any blocks
5. **Try generating a new app password** if the current one doesn't work

---

**🎉 Once configured, your restaurant will send professional emails for password resets and welcome messages!**

**📧 Your customers will receive beautifully formatted emails with:**
- Restaurant branding and logo
- Clear instructions and security warnings
- Professional styling and layout
- Contact information and support details