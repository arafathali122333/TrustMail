const nodemailer = require("nodemailer");

//Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

//Send email function
async function sendEmail({ org_name, to, subject, text, html, attachments }) {
    const mailOptions = {
        from: `"${org_name}" <${process.env.EMAIL_USER}>`,
        to: to.toLowerCase().trim(),
        subject,
        text,
        html,
        attachments: attachments?.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype
        }))
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully!" };
}

module.exports = { sendEmail };
