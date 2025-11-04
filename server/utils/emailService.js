const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email credentials not configured. Emails will be logged to console.');
        return null;
    }

    try {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } catch (error) {
        console.error('Error creating email transporter:', error);
        return null;
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetCode, userName = 'User') => {
    try {
        const transporter = createTransporter();

        // If no transporter (no email config), just log to console
        if (!transporter) {
            console.log(`📧 Password Reset Email (would be sent to ${email}):`);
            console.log(`   To: ${email}`);
            console.log(`   Code: ${resetCode}`);
            console.log(`   User: ${userName}`);
            return { success: true, messageId: 'console-log' };
        }

        const mailOptions = {
            from: {
                name: 'Viru Jash Restaurant',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: 'Password Reset Code - Viru Jash Restaurant',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                        .header { text-align: center; margin-bottom: 30px; }
                        .logo { font-size: 28px; font-weight: bold; color: #2196f3; margin-bottom: 10px; }
                        .reset-code { background: #f8f9fa; border: 2px dashed #2196f3; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
                        .code { font-size: 32px; font-weight: bold; color: #2196f3; letter-spacing: 5px; font-family: 'Courier New', monospace; }
                        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🍽️ Viru Jash Restaurant</div>
                            <h2>Password Reset Request</h2>
                        </div>
                        
                        <p>Hello <strong>${userName}</strong>,</p>
                        
                        <p>We received a request to reset your password for your Viru Jash Restaurant account. Use the verification code below to reset your password:</p>
                        
                        <div class="reset-code">
                            <p style="margin: 0; font-size: 16px; color: #666;">Your verification code is:</p>
                            <div class="code">${resetCode}</div>
                        </div>
                        
                        <p>Enter this code on the password reset page to create a new password.</p>
                        
                        <div class="warning">
                            <strong>⚠️ Security Notice:</strong>
                            <ul style="margin: 10px 0;">
                                <li>This code will expire in <strong>15 minutes</strong></li>
                                <li>Don't share this code with anyone</li>
                                <li>If you didn't request this reset, please ignore this email</li>
                            </ul>
                        </div>
                        
                        <p>If you're having trouble, you can contact our support team or visit our restaurant.</p>
                        
                        <div class="footer">
                            <p><strong>Viru Jash Restaurant</strong><br>
                            Pure Vegetarian Indian Cuisine<br>
                            📧 info@virujashrestaurant.com | 📞 +91 98765 43210</p>
                            
                            <p style="font-size: 12px; color: #999;">
                                This is an automated message. Please do not reply to this email.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Viru Jash Restaurant - Password Reset
                
                Hello ${userName},
                
                We received a request to reset your password. Your verification code is: ${resetCode}
                
                This code will expire in 15 minutes. Enter this code on the password reset page to create a new password.
                
                If you didn't request this reset, please ignore this email.
                
                Best regards,
                Viru Jash Restaurant Team
                info@virujashrestaurant.com
                +91 98765 43210
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Password reset email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('❌ Error sending password reset email:', error.message);
        return { success: false, error: error.message };
    }
};

// Send welcome email (optional)
const sendWelcomeEmail = async (email, userName) => {
    try {
        const transporter = createTransporter();

        // If no transporter (no email config), just log to console
        if (!transporter) {
            console.log(`📧 Welcome Email (would be sent to ${email}):`);
            console.log(`   To: ${email}`);
            console.log(`   User: ${userName}`);
            return { success: true, messageId: 'console-log' };
        }

        const mailOptions = {
            from: {
                name: 'Viru Jash Restaurant',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: 'Welcome to Viru Jash Restaurant! 🍽️',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                        .header { text-align: center; margin-bottom: 30px; }
                        .logo { font-size: 24px; font-weight: bold; color: #2196f3; }
                        .feature { margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🍽️ Viru Jash Restaurant</div>
                        </div>
                        <h2>Welcome ${userName}!</h2>
                        <p>Thank you for joining Viru Jash Restaurant. We're excited to serve you delicious pure vegetarian Indian cuisine.</p>
                        
                        <h3>What you can do now:</h3>
                        <div class="feature">🍽️ Browse our menu using QR codes at tables</div>
                        <div class="feature">🛒 Place orders online with our easy cart system</div>
                        <div class="feature">📱 Track your order status in real-time</div>
                        <div class="feature">🎟️ Use discount coupons for great savings</div>
                        
                        <p>Visit our demo menu: <a href="http://localhost:3000/m/demo-table">Demo Table Menu</a></p>
                        
                        <p>Best regards,<br><strong>Viru Jash Restaurant Team</strong><br>
                        📧 info@virujashrestaurant.com | 📞 +91 98765 43210</p>
                    </div>
                </body>
                </html>
            `,
            text: `
                Welcome to Viru Jash Restaurant!
                
                Hello ${userName},
                
                Thank you for joining us. You can now:
                - Browse our menu using QR codes
                - Place orders online
                - Track order status
                - Use discount coupons
                
                Visit: http://localhost:3000/m/demo-table
                
                Best regards,
                Viru Jash Restaurant Team
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Welcome email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('❌ Error sending welcome email:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendPasswordResetEmail,
    sendWelcomeEmail
};