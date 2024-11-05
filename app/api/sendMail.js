import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Vérifiez que la méthode est POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extraire les champs du corps de la requête
    const { nom, email, sujet, contenu } = req.body;

    // Valider les champs
    if (!nom || !email || !sujet || !contenu) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'email provient du domaine autorisé
    const allowedDomain = process.env.ALLOWED_DOMAIN;
    const emailDomain = email.split('@')[1];
    if (emailDomain !== allowedDomain) {
        return res.status(403).json({ message: 'Email non autorisé.' });
    }

    // Créer un transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Par exemple : smtp.example.com
        port: process.env.SMTP_PORT, // Par exemple : 587
        secure: false, // true pour 465, false pour d'autres ports
        auth: {
            user: process.env.SMTP_USER, // Votre adresse email
            pass: process.env.SMTP_PASSWORD, // Votre mot de passe email
        },
    });

    // Définir les options de l'email
    const mailOptions = {
        from: `${nom} <${email}>`,
        to: process.env.RECEIVER_EMAIL, // Adresse à laquelle envoyer l'email
        subject: sujet,
        text: contenu,
    };

    // Envoyer l'email
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email envoyé avec succès.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
}
