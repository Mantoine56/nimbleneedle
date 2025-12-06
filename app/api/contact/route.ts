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

// Turnstile configuration and safety utilities
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const ALLOWLISTED_TLDS = ['com', 'ca', 'net', 'org', 'io', 'co', 'edu', 'gov'];
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;
const rateLimitBuckets = new Map<string, { count: number; windowStart: number }>();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const plainText = (value: string) => value.replace(/<[^>]*>/g, '').trim();

const getClientIp = (request: NextRequest) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  (request as any).ip ||
  'unknown';

// In-memory leaky bucket to slow bursts; keeps UX friendly for humans.
const isRateLimited = (ip: string) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket) {
    rateLimitBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};

const verifyTurnstile = async (token: string, ip: string) => {
  if (!TURNSTILE_SECRET) {
    console.error('Turnstile secret key is missing');
    return false;
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET,
        response: token,
        remoteip: ip,
      }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error('Turnstile verification failed:', err);
    return false;
  }
};

const shouldAutoReply = (email: string, turnstilePassed: boolean) => {
  if (!turnstilePassed) return false;
  const domain = email.split('@')[1] || '';
  const tld = domain.split('.').pop() || '';
  return ALLOWLISTED_TLDS.includes(tld.toLowerCase());
};

/**
 * API Route to handle contact form submissions
 * Validates form data and sends email via nodemailer
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, service, message, turnstileToken, honeypot, elapsedMs } = body;
    const clientIp = getClientIp(request);

    // Honeypot and timing checks block basic bots without hurting humans.
    if (honeypot) {
      return NextResponse.json({ error: 'Unable to process request.' }, { status: 400 });
    }

    if (typeof elapsedMs === 'number' && elapsedMs < 1000) {
      return NextResponse.json({ error: 'Please wait a moment before submitting.' }, { status: 400 });
    }

    // Rate limit by IP to curb bursts; keeps UX acceptable.
    if (isRateLimited(clientIp)) {
      return NextResponse.json({ error: 'Too many requests. Please try again soon.' }, { status: 429 });
    }

    // Validate required fields
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message, and verification token are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify Turnstile token server-side.
    const turnstilePassed = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstilePassed) {
      return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 400 });
    }

    // Content hardening to strip markup and keep reasonable lengths.
    const cleanMessage = plainText(String(message || '')).slice(0, 2000);
    const cleanName = plainText(String(name || '')).slice(0, 200);
    const cleanPhone = plainText(String(phone || '')).slice(0, 50);
    const cleanService = plainText(String(service || '')).slice(0, 100);

    if (cleanMessage.length < 5) {
      return NextResponse.json({ error: 'Message is too short.' }, { status: 400 });
    }

    // Prepare email content
    const serviceText = cleanService ? `Service Requested: ${cleanService}` : 'Service: Not specified';
    const phoneText = cleanPhone ? `Phone: ${cleanPhone}` : 'Phone: Not provided';
    
    const emailContent = `
New Contact Form Submission from Nimble Needle Website

Customer Details:
- Name: ${cleanName}
- Email: ${email}
       - ${phoneText}
       - ${serviceText}

Message:
${cleanMessage}

---
This message was sent from the Nimble Needle website contact form.
Timestamp: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
    `.trim();

    // Email options
    const mailOptions = {
      from: `"Nimble Needle Website" <${process.env.GMAIL_USER}>`,
      to: 'info@nimbleneedle.ca',
      subject: `New Contact Form Submission - ${cleanName}`,
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
                <td style="padding: 8px 0; color: #1f2937;">${cleanName}</td>
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
              ${cleanMessage.replace(/\n/g, '<br>')}
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

    // Optional: Send auto-reply to customer when domain looks safe.
    if (shouldAutoReply(email, turnstilePassed)) {
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
              <p style="color: #1f2937; margin-top: 0;">Hi ${cleanName || 'there'},</p>
              
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
              
              <p style="color: #374151; line-height: 1.6;"><strong>Hours:</strong> Mon-Fri: 10am-8pm • Saturday: 10am-6pm • Sunday: 11am-6pm</p>
              
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
    }

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