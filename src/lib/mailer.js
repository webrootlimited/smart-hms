import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOtpEmail(to, otp) {
    const info = await transporter.sendMail({
        from: `"Smart HMS" <${process.env.SMTP_USER}>`,
        to,
        subject: "Smart HMS - Your account verification OTP Code",
        text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
        html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>Expires in 10 minutes</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
}
