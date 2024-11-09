'use client'

import { useState, useEffect } from 'react';
import Toast from './toast';

export default function MailForm({ translations, mailApiEnabled = false }) {
    const [formData, setFormData] = useState({ name: '', topic: '', content: '', email: '' });
    const [toastMessage, setToastMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isMailSent, setIsMailSent] = useState(false);

    useEffect(() => {
        // Vérifie si le cookie "mailSent" est présent
        const mailSentCookie = document.cookie.split('; ').find(row => row.startsWith('mailSent='));
        if (mailSentCookie) setIsMailSent(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = mailApiEnabled ? formData : { name: formData.name, topic: formData.topic, content: formData.content };

        if (mailApiEnabled) {
            try {
                const response = await fetch('/api/mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    setIsError(false);
                    setToastMessage('Message envoyé avec succès');
                    setIsMailSent(true);
                    document.cookie = "mailSent=true; max-age=604800; path=/"; // Crée le cookie "mailSent" pour 7 jours
                    setFormData({ name: '', topic: '', content: '', email: '' });
                } else {
                    setIsError(true);
                    setToastMessage('Erreur lors de l\'envoi du message');
                }
            } catch {
                setIsError(true);
                setToastMessage('Erreur réseau');
            }
        } else {
            window.location.href = `mailto:loic.labeye@pm.me?subject=${formData.topic}&body=${formData.content}`;
            setIsError(false);
            setToastMessage('Succès');
            setIsMailSent(true);
            document.cookie = "mailSent=true; max-age=604800; path=/"; // Définit le cookie après succès
        }
    };

    if (isMailSent) {
        return <p className="text-center text-xl font-semibold">{translations.thank_you_for_your_mail}</p>;
    }

    return (
        <>
            <h1 className="md:text-xl font-semibold">{translations.get_in_touch_desc}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-4/5 md:w-2/5">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{translations.name}</span>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={translations.type_here}
                        required
                        minLength={2}
                        className="input input-bordered input-info w-full"
                    />
                </label>

                {mailApiEnabled && (
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{translations.email}</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={translations.type_here}
                            required={mailApiEnabled}
                            className="input input-bordered input-info w-full"
                        />
                    </label>
                )}

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{translations.topic}</span>
                    </div>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder={translations.type_here}
                        required
                        minLength={2}
                        className="input input-bordered input-info w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{translations.content}</span>
                    </div>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="textarea textarea-info resize-none w-full"
                        required
                        minLength={2}
                        placeholder={translations.type_here}
                    ></textarea>
                </label>

                <button type="submit" className="btn btn-info btn-outline animate-pulse w-full">
                    {translations.send}
                </button>
            </form>

            {toastMessage && (
                <Toast
                    message={toastMessage}
                    isError={isError}
                    onClose={() => setToastMessage(null)}
                />
            )}
        </>
    );
}
