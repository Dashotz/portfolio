# Resend Template Setup Guide

## Template Variables

When using this template in Resend's dashboard, you'll need to provide these variables:

- `{{name}}` - The sender's name
- `{{email}}` - The sender's email address
- `{{message}}` - The message content
- `{{targetEmail}}` - The target email (frncsgerard02@gmail.com)

## How to Use in Resend Dashboard

1. **Go to Resend Dashboard**: https://resend.com/templates
2. **Click "Create Template"**
3. **Copy the HTML** from `resend-template.html`
4. **Paste it into the template editor**
5. **Save the template**

## When Sending via API

When you send an email using this template, include the variables in your API call:

```javascript
const { data, error } = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'dashotz14@gmail.com',
  templateId: 'your-template-id-here',
  subject: 'Contact Form Message from {{name}}',
  variables: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a test message.',
    targetEmail: 'frncsgerard02@gmail.com'
  }
});
```

## Note

The current code in `route.ts` uses inline HTML with template literals, which works without needing Resend's template system. If you want to switch to using Resend templates, you would:

1. Create the template in Resend dashboard
2. Get the template ID
3. Update `route.ts` to use `templateId` instead of `html`

