// src/api/message.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight check for OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      // Gmail Transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tanzimsheikh68@gmail.com',
          pass: 'qsfympzsumctnpno', // App password, no spaces
        },
      });

      // Email config
      const mailOptions = {
        from: email,
        to: 'tanzimsheikh68@gmail.com',
        subject: `New message from ${name}`,
        text: `You got a message:\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      console.log("✅ Message sent successfully:", { name, email });
      res.status(200).json({ message: "Message sent to Tanzim Sheikh!" });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
