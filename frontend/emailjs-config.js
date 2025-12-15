// EmailJS Configuration
// 
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with these variables:
//    - {{from_name}}
//    - {{from_email}}
//    - {{phone}}
//    - {{material_type}}
//    - {{quantity}}
//    - {{message}}
//    - {{to_email}}
// 4. Get your Service ID, Template ID, and Public Key from the dashboard
// 5. Replace the placeholders in src/App.jsx:
//    - YOUR_SERVICE_ID
//    - YOUR_TEMPLATE_ID
//    - YOUR_PUBLIC_KEY
//    - YOUR_NEWSLETTER_TEMPLATE_ID (for newsletter subscription)

export const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  newsletterTemplateId: "YOUR_NEWSLETTER_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY"
};

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  number: "9877443093", // Your WhatsApp business number
  defaultMessage: "Hello, I would like to know more about your building materials."
};

