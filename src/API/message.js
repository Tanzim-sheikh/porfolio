// src/api/message.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/message', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Transporter Setup (using Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tanzimsheikh68@gmail.com', // your Gmail
        pass: "qsfy mpzs umct npno",        // NOT your Gmail password
      },
    });

    // 2. Email Options
    const mailOptions = {
      from: email, // sender's email
      to: 'tanzimsheikh68@gmail.com', // your email
      subject: `New Message from ${name}`,
      text: `
        You got a new message:
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent to Tanzim Sheikh via Email!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

export default router;
