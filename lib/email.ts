/**
 * Email utility functions
 * 
 * Currently logs email content. To enable actual email sending:
 * 1. Install an email service provider (e.g., Resend, SendGrid, Nodemailer)
 * 2. Add API key to CONTACT_API_KEY in .env
 * 3. Update sendContactEmail function to use the provider
 */

interface ContactEmailData {
  name: string
  email: string
  message: string
  formType: 'general' | 'booking' | 'membership'
  phone?: string
  eventDate?: string
  eventLocation?: string
  eventType?: string
  expectedAttendees?: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  const recipientEmail = process.env.CONTACT_TO_EMAIL
  const apiKey = process.env.CONTACT_API_KEY

  if (!recipientEmail) {
    console.warn('CONTACT_TO_EMAIL not set. Email will not be sent.')
    return { success: false, error: 'Email recipient not configured' }
  }

  // Prepare email content
  const formTypeLabel = 
    data.formType === 'booking' ? 'Booking' : 
    data.formType === 'membership' ? 'Membership' : 
    'Contact'

  const subject = `New ${formTypeLabel} Inquiry from ${data.name}`
  
  let body = `New ${formTypeLabel} Inquiry\n\n`
  body += `Name: ${data.name}\n`
  body += `Email: ${data.email}\n`
  
  if (data.phone) {
    body += `Phone: ${data.phone}\n`
  }
  if (data.eventDate) {
    body += `Event Date: ${data.eventDate}\n`
  }
  if (data.eventLocation) {
    body += `Event Location: ${data.eventLocation}\n`
  }
  if (data.eventType) {
    body += `Event Type: ${data.eventType}\n`
  }
  if (data.expectedAttendees) {
    body += `Expected Attendees: ${data.expectedAttendees}\n`
  }
  
  body += `\nMessage:\n${data.message}\n`

  // If API key is provided, you can integrate with an email service
  // For now, we'll log the email (remove in production when email service is added)
  if (apiKey) {
    // TODO: Integrate with email service provider
    // Example with Resend:
    // const resend = new Resend(apiKey)
    // const result = await resend.emails.send({
    //   from: 'contact@historicreenactors.com',
    //   to: recipientEmail,
    //   subject,
    //   text: body,
    //   replyTo: data.email,
    // })
    // return { success: true }
    
    console.log('Email service integration needed. Email content:')
    console.log('To:', recipientEmail)
    console.log('Subject:', subject)
    console.log('Body:', body)
    return { success: false, error: 'Email service not yet configured' }
  }

  // Development mode: log email content
  console.log('=== Contact Form Email ===')
  console.log('To:', recipientEmail)
  console.log('Subject:', subject)
  console.log('Body:', body)
  console.log('========================')
  
  // In production, you should integrate with an email service
  // For now, return success so the form submission works
  // Remove this and implement actual email sending
  return { success: true }
}
