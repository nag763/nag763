'use client'

import { useState, useEffect } from 'react';
import Toast from './toast';

// Composant FormField pour un champ de formulaire réutilisable
function FormField({ label, name, value, onChange, type = 'text', placeholder, required = false }) {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="textarea textarea-secondary resize-none w-full"
                    required={required}
                    minLength={2}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    minLength={2}
                    className="input input-bordered input-secondary w-full"
                />
            )}
        </label>
    );
}

export default function MailForm({ translations, mailApiEnabled = false }) {
    const [formState, setFormState] = useState({
        formData: { name: '', topic: '', content: '', email: '' },
        toastMessage: null,
        isError: false,
        isMailSent: false,
        isLoading: false
    });

    useEffect(() => {
        // Vérifie si le cookie "mailSent" est présent
        const mailSentCookie = document.cookie.split('; ').find(row => row.startsWith('mailSent='));
        if (mailSentCookie) setFormState(prevState => ({ ...prevState, isMailSent: true }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            formData: { ...prevState.formData, [name]: value }
        }));
    };

    const sendMailApi = async (data) => {
        if (mailApiEnabled) {
            try {
                const response = await fetch('/api/mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                return response.ok;
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            window.location.href = `mailto:loic.labeye@pm.me?subject=${data.topic}&body=${data.content}`;
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState(prevState => ({ ...prevState, isLoading: true }));

        const data = mailApiEnabled ? formState.formData : { name: formState.formData.name, topic: formState.formData.topic, content: formState.formData.content };

        const isSuccess = await sendMailApi(data);

        if (isSuccess) {
            setFormState(prevState => ({
                ...prevState,
                toastMessage: translations.success,
                isMailSent: true,
                formData: { name: '', topic: '', content: '', email: '' }
            }));
            document.cookie = "mailSent=true; max-age=604800; path=/"; // Crée le cookie "mailSent" pour 7 jours
        } else {
            setFormState(prevState => ({
                ...prevState,
                toastMessage: translations.error_while_sending,
                isError: true
            }));
        }

        setFormState(prevState => ({ ...prevState, isLoading: false }));
    };

    if (formState.isMailSent) {
        return (<>
            <p className="text-center text-xl font-semibold">{translations.thank_you_for_your_mail}</p>
            {formState.toastMessage && (
                <Toast
                    message={formState.toastMessage}
                    isError={formState.isError}
                    onClose={() => setFormState(prevState => ({ ...prevState, toastMessage: null }))}
                />
            )}
        </>
        );
    }

    return (
        <>
            <h1 className="md:text-xl font-semibold">{translations.get_in_touch_desc}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-4/5 md:w-2/5">
                <FormField
                    label={translations.name}
                    name="name"
                    value={formState.formData.name}
                    onChange={handleChange}
                    required
                    placeholder={translations.type_here}
                />
                {mailApiEnabled && (
                    <FormField
                        label={translations.email}
                        name="email"
                        value={formState.formData.email}
                        onChange={handleChange}
                        type="email"
                        required={mailApiEnabled}
                        placeholder={translations.type_here}
                    />
                )}
                <FormField
                    label={translations.topic}
                    name="topic"
                    value={formState.formData.topic}
                    onChange={handleChange}
                    required
                    placeholder={translations.type_here}
                />
                <FormField
                    label={translations.content}
                    name="content"
                    value={formState.formData.content}
                    onChange={handleChange}
                    type="textarea"
                    required
                    placeholder={translations.type_here}
                />
                <button type="submit" className="btn btn-secondary btn-outline animate-pulse w-full">
                    {translations.send}
                </button>
            </form>

            {formState.toastMessage && (
                <Toast
                    message={formState.toastMessage}
                    isError={formState.isError}
                    onClose={() => setFormState(prevState => ({ ...prevState, toastMessage: null }))}
                />
            )}
        </>
    );
}
