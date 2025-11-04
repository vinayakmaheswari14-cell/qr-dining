# ⚡ Quick Gmail Setup for Viru Jash Restaurant

## 🎯 3-Minute Setup Guide

### Step 1: Enable 2-Factor Authentication
```
1. Go to: myaccount.google.com/security
2. Click "2-Step Verification" 
3. Follow setup wizard
4. Verify with your phone
```

### Step 2: Generate App Password
```
1. Still in Security settings
2. Click "App passwords"
3. Select "Mail" + "Other (Custom name)"
4. Type: "Viru Jash Restaurant"
5. Copy the 16-character password
```

### Step 3: Update .env File
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM_NAME=Viru Jash Restaurant
```

### Step 4: Test It
```bash
# Verify configuration
npm run verify-email

# Test password reset
npm run test-email
```

## 🚨 Common Mistakes

❌ **Using regular Gmail password** → Use App Password  
❌ **Spaces in app password** → Remove all spaces  
❌ **2FA not enabled** → Must enable first  
❌ **Wrong email format** → Must be valid Gmail address  

## ✅ Success Indicators

✅ Server console shows: "Password reset email sent successfully"  
✅ Email appears in recipient's inbox  
✅ No authentication errors in console  
✅ Professional HTML email template displays correctly  

## 🆘 Quick Troubleshooting

**"Invalid login" error?**
- Check 2FA is enabled
- Use App Password (not regular password)
- Remove spaces from app password

**Email not received?**
- Check spam folder
- Verify recipient email address
- Check Gmail sending limits (500/day)

**Need help?** See `GMAIL_SETUP_GUIDE.md` for detailed instructions.

---

**🎉 Once setup, your restaurant will send professional emails automatically!**