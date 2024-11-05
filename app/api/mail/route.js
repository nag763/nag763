import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {v4 as uuidv4} from 'uuid';

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
    if(process.env.MAIL_ENABLED !== 'true') {
        return sendError("Service is disabled", 503)
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
        to: email,
        subject: topic,
        text: content,
    };

    try {
        await transporter.sendMail(mailOptions);
        let uuid = uuidv4();
        console.log({
            name,
            email,
            topic,
            content,
            uuid,
            request
        });
        return new NextResponse;
    } catch (error) {
        console.error(error);
        return sendError("Internal Error", 500);
    }

}
