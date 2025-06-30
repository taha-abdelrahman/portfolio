import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: `"Taha Portfolio" <${process.env.EMAIL_USERNAME}>`,
            to: 'taha.abdelra7man@gmail.com',
            subject: `💌 Message from ${name}`,
            text: message,
            html: `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9fafb; padding: 32px; max-width: 620px; margin: auto; border-radius: 16px; border: 1px solid #e5e7eb;">
    <h2 style="color: #0f172a; font-size: 20px; margin-bottom: 24px; text-align: center;">📩 New Portfolio Message</h2>

    <div style="background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 8px 16px rgba(0,0,0,0.05);">
      <p style="margin: 0 0 12px;"><strong>👤 Name:</strong> ${name}</p>
      <p style="margin: 0 0 12px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
      <p style="margin: 16px 0 8px;"><strong>💬 Message:</strong></p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px; white-space: pre-line;">${message}</div>

      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${email}?subject=RE: Portfolio Message from ${name}" 
           style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">
          Reply to ${name}
        </a>
      </div>
    </div>

    <p style="font-size: 12px; color: #6b7280; margin-top: 24px; text-align: center;">
      This message was sent automatically from <strong>Taha’s Portfolio</strong>.
    </p>
  </div>
`



        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Mailer error:", error);
        res.status(500).json({ success: false, error: "Email failed to send." });
    }
}
