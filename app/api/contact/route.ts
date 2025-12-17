import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in environment variables');
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please set RESEND_API_KEY in your .env.local file. See README for setup instructions.',
          details: 'Missing RESEND_API_KEY environment variable'
        },
        { status: 500 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Sanitize HTML to prevent XSS
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedMessage = sanitizeHtml(message);

    // Send email using Resend
    // Note: Resend free tier only allows sending to verified email addresses
    // Sending to verified email (dashotz14@gmail.com) but including target email in subject
    const recipientEmail = process.env.RESEND_TO_EMAIL || 'dashotz14@gmail.com';
    const targetEmail = 'frncsgerard02@gmail.com'; // Your main email address
    
    // Create a cleaner subject line to avoid spam triggers
    // Avoid special characters, all caps, and spam trigger words
    const subject = `Contact Form Message from ${sanitizedName}`;
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: recipientEmail,
      replyTo: email, // This allows you to reply directly to the sender
      subject: subject,
      // Add headers to improve deliverability
      headers: {
        'X-Entity-Ref-ID': `contact-${Date.now()}`,
        'X-Priority': '1',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'normal',
      },
      // Add tags for better tracking and categorization
      tags: [
        { name: 'category', value: 'contact-form' },
        { name: 'source', value: 'portfolio' },
      ],
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="format-detection" content="telephone=no">
          <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000; color: #ededed;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 30px; text-align: center; border-bottom: 2px solid #333333;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
                        New Contact Form
                      </h1>
                      <p style="margin: 10px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                        Portfolio Website
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Target Email Notice -->
                  <tr>
                    <td style="background-color: #1a1a1a; padding: 20px 30px; border-bottom: 1px solid #333333;">
                      <div style="background-color: #0a0a0a; border-left: 4px solid #ffffff; padding: 15px; border-radius: 4px;">
                        <p style="margin: 0 0 8px 0; font-weight: bold; color: #ffffff; font-size: 14px;">
                          For: <a href="mailto:${targetEmail}" style="color: #ffffff; text-decoration: underline;">${targetEmail}</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #888888;">
                          Intended recipient: ${targetEmail}
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <!-- Sender Info -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 15px; background-color: #0a0a0a; border: 1px solid #333333; border-radius: 4px; margin-bottom: 10px;">
                            <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                              From
                            </p>
                            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #ffffff;">
                              ${sanitizedName}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 15px; background-color: #0a0a0a; border: 1px solid #333333; border-radius: 4px; margin-top: 10px;">
                            <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                              Email
                            </p>
                            <p style="margin: 0;">
                              <a href="mailto:${sanitizedEmail}" style="color: #ffffff; text-decoration: underline; font-size: 16px; font-weight: 500;">
                                ${sanitizedEmail}
                              </a>
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message -->
                      <div style="margin-top: 30px;">
                        <p style="margin: 0 0 15px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                          Message
                        </p>
                        <div style="background-color: #0a0a0a; border: 1px solid #333333; border-left: 4px solid #ffffff; padding: 20px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; color: #ededed;">
                          ${sanitizedMessage.replace(/\n/g, '<br>')}
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #0a0a0a; padding: 20px 30px; text-align: center; border-top: 1px solid #333333;">
                      <p style="margin: 0; font-size: 11px; color: #666666;">
                        This email was sent from your portfolio contact form
                      </p>
                      <p style="margin: 10px 0 0 0; font-size: 11px; color: #666666;">
                        Reply to this email to respond to ${sanitizedEmail}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `Contact Form Submission

This message is for: ${targetEmail}

From: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
Reply directly to respond to ${email}
Forward this email to ${targetEmail} if needed.`,
    });

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: error.message || 'Failed to send email. Please try again later.',
          details: error.name || 'Unknown error'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

