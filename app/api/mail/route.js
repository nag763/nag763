import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export const maxDuration = 5;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendError(message, status = 400) {
    let uuid = uuidv4();
    return NextResponse.json({ message, uuid }, { status });
}

export async function POST(request) {
    const allowedDomain = process.env.ALLOWED_DOMAIN;
    const refererHeader = request.headers.get('referer') || '';

    if (!refererHeader.startsWith(allowedDomain)) {
        return sendError("Unauthorized request origin", 403);
    }

    if (process.env.MAIL_ENABLED !== 'true') {
        return sendError("Service is disabled", 503);
    }

    const { name, email, topic, content } = await request.json();

    if (!name || !email || !topic || !content) {
        return sendError("Partial request received");
    }

    if (!isValidEmail(email)) {
        return sendError("Email is not valid");
    }

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `${name} ${email} - ${topic}`,
        text: content,
    };

    const acknowledgmentMailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Your message has been received",
        text: `Dear ${name},\n\nThank you for reaching out! I have received your message and will review it shortly.\n\nTopic: ${topic}\n\nI will get back to you if further information is required.\n\nIf this email was sent to you in error, please ignore it.\n\nBest regards,\nLABEYE Loïc`,
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(acknowledgmentMailOptions);

        let uuid = uuidv4();
        console.log({
            name,
            email,
            topic,
            content,
            uuid,
            request,
        });

        return NextResponse.json({ message: "Emails sent successfully" });
    } catch (error) {
        console.error(error);
        return sendError("Internal Error", 500);
    }
}
