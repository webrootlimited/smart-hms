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


export async function sendOtpEmail(to, otp, role, expiry) {
    const templatePath = path.join(
        process.cwd(),
        "src/lib/mail-templates/registration-otp-verify.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
        otp,
        role,
        expiresIn: expiry,
    });

    const info = await transporter.sendMail({
        from: `"Smart HMS" <${process.env.SMTP_USER}>`,
        to,
        subject: "Smart HMS – Account Verification OTP",
        html,
        text: `
Your Smart HMS verification code is: ${otp}
This OTP will expire at ${expiry}.

If you did not request this, please ignore this email.
        `,
    });

    console.log("OTP email sent:", info.messageId);
    return info;
}

export async function sendResetPasswordEmail(to, role, resetLink, expiry) {
    const templatePath = path.join(
        process.cwd(),
        "src/lib/mail-templates/reset-password.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
        role,
        resetLink,
        expiresIn: expiry,
    });

    const info = await transporter.sendMail({
        from: `"Smart HMS" <${process.env.SMTP_USER}>`,
        to,
        subject: "Smart HMS – Reset Password",
        html,
        text: `
Hello,

You have requested to reset your password. Please use the following link to reset your password:
${resetLink}
This link will expire at ${expiry}.

If you did not request this, please ignore this email.
        `,
    });

    console.log("Reset password email sent:", info.messageId);
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
