// Vercel Serverless Function for sending emails with nodemailer
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      email,
      materialType,
      quantity,
      additionalDetails
    } = req.body || {};

    // Basic validation
    if (!name || !phone || !materialType) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and material type are required."
      });
    }

    // Get environment variables from Vercel
    const ownerEmail = process.env.OWNER_EMAIL || "pleaseprimededo@gmail.com";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error("Missing email configuration in environment variables.");
      return res.status(500).json({
        success: false,
        message:
          "Email configuration is not set on the server. Please contact the site owner."
      });
    }

    // Create transport using Gmail + App Password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const subject = "New Material Inquiry from Website";

    const textBody = `
New inquiry received from website:

Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Material Type: ${materialType}
Quantity: ${quantity || "N/A"}
Additional Details: ${additionalDetails || "N/A"}
`;

    const htmlBody = `
      <h2>New Material Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "N/A"}</p>
      <p><strong>Material Type:</strong> ${materialType}</p>
      <p><strong>Quantity:</strong> ${quantity || "N/A"}</p>
      <p><strong>Additional Details:</strong></p>
      <p>${additionalDetails ? additionalDetails.replace(/\n/g, "<br>") : "N/A"}</p>
    `;

    await transporter.sendMail({
      from: `"Shiv Shankar Website" <${smtpUser}>`,
      to: ownerEmail,
      subject,
      text: textBody,
      html: htmlBody
    });

    return res.status(200).json({
      success: true,
      message: "Inquiry sent successfully!"
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again later."
    });
  }
};

