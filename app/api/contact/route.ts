import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration for Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER, // your Gmail email
    pass: process.env.GMAIL_APP_PASSWORD, // your Gmail app password
  },
});

/**
 * API Route to handle contact form submissions
 * Validates form data and sends email via nodemailer
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const serviceText = service ? `Service Requested: ${service}` : 'Service: Not specified';
    const phoneText = phone ? `Phone: ${phone}` : 'Phone: Not provided';
    
    const emailContent = `
New Contact Form Submission from Nimble Needle Website

Customer Details:
- Name: ${name}
- Email: ${email}
- ${phoneText}
- ${serviceText}

Message:
${message}

---
This message was sent from the Nimble Needle website contact form.
Timestamp: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
    `.trim();

    // Email options
    const mailOptions = {
      from: `"Nimble Needle Website" <${process.env.GMAIL_USER}>`,
      to: 'info@nimbleneedle.ca',
      subject: `New Contact Form Submission - ${name}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nimble Needle Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <h3 style="color: #1f2937; margin-top: 0;">Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #ec4899; text-decoration: none;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;"><a href="tel:${phone}" style="color: #ec4899; text-decoration: none;">${phone}</a></td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937;">${service}</td>
              </tr>
              ` : ''}
            </table>
            
            <h3 style="color: #1f2937; margin-top: 25px; margin-bottom: 10px;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #d1d5db; line-height: 1.6; color: #374151;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #d1d5db; font-size: 12px; color: #6b7280;">
              <p style="margin: 0;">This message was sent from the Nimble Needle website contact form.</p>
              <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</p>
            </div>
          </div>
        </div>
      `,
      // Auto-reply to customer
      replyTo: email,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent successfully:', info.messageId);

    // Optional: Send auto-reply to customer
    const autoReplyOptions = {
      from: `"Nimble Needle Tailoring" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Nimble Needle Tailoring!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nimble Needle Tailoring</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <p style="color: #1f2937; margin-top: 0;">Hi ${name},</p>
            
            <p style="color: #374151; line-height: 1.6;">Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
            
            <p style="color: #374151; line-height: 1.6;">In the meantime, feel free to visit us at either of our Ottawa locations:</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #d1d5db; margin: 15px 0;">
              <h4 style="color: #ec4899; margin: 0 0 10px 0;">Downtown Ottawa - Preston</h4>
              <p style="margin: 5px 0; color: #374151;">📍 141 Preston St, Ottawa, ON K1R 7P4</p>
              <p style="margin: 5px 0; color: #374151;">📞 (343) 588-1300</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #d1d5db; margin: 15px 0;">
              <h4 style="color: #ec4899; margin: 0 0 10px 0;">New Location - Riverside</h4>
              <p style="margin: 5px 0; color: #374151;">📍 3681 Riverside Dr, Ottawa, ON K1V 1H7</p>
              <p style="margin: 5px 0; color: #374151;">📞 (343) 588-3182</p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;"><strong>Hours:</strong> Tue-Sat: 9am-9pm • Sun-Mon: 10am-7pm</p>
            
            <p style="color: #374151; line-height: 1.6; margin-top: 20px;">Walk-ins are always welcome at both locations!</p>
            
            <p style="color: #374151; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The Nimble Needle Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Send auto-reply (don't wait for it to complete)
    transporter.sendMail(autoReplyOptions).catch((error: any) => {
      console.error('❌ Auto-reply failed:', error);
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Contact form submission failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint for contact form API
 */
export async function GET() {
  try {
    // Test email configuration
    await transporter.verify();
    
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        emailConfigured: true
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Email configuration test failed:', error);
    
    return NextResponse.json(
      { 
        status: 'error',
        timestamp: new Date().toISOString(),
        emailConfigured: false,
        error: process.env.NODE_ENV === 'development' ? error.message : 'Email configuration error'
      },
      { status: 500 }
    );
  }
} 