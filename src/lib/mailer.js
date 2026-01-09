import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
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

export async function sendStaffInvitationEmail(to, name, role, email, password, loginUrl) {
    // 🔹 Path to EJS template
    const templatePath = path.join(
        process.cwd(),
        "src/lib/mail-templates/staff-invitation.ejs"
    );

    // 🔹 Render HTML from EJS
    const html = await ejs.renderFile(templatePath, {
        name,
        role,
        email,
        password,
        loginUrl,
    });

    // 🔹 Send email
    const info = await transporter.sendMail({
        from: `"Smart HMS" <${process.env.SMTP_USER}>`,
        to,
        subject: "Smart HMS – Staff Invitation",
        html,
        text: `
Hello ${name},

You have been officially invited to join Smart HMS as a ${role}.

Email: ${email}
Password: ${password}
Role: ${role}

Login here:
${loginUrl}

Regards,
Smart HMS Administration Team
    `,
    });

    console.log("📧 Invitation email sent:", info.messageId);
    return info;
}
