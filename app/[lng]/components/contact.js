import { getTranslations } from "@/app/i18n";
import MailForm from "./mail_form";

export default async function Contact({ lng }) {
    const { t } = await getTranslations(lng);
    const translations = {
        name: t('name'),
        type_here: t('type_here'),
        topic: t('topic'),
        content: t('content'),
        send: t('send'),
        thank_you_for_your_mail: t('thank_you_for_your_mail'),
        error_while_sending: t('error_while_sending'),
        success: t('success'),
        email: t('email'),
        get_in_touch_desc: t('get_in_touch_desc')
    };
    return (
        <div className="min-h-full snap-center items-center justify-center w-full flex flex-col space-y-8 md:space-y-8 ">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-pink-500 via-purple-500 to-indigo-500">{t('get_in_touch')}</h1>
            <MailForm translations={translations} mailApiEnabled={process.env.API_ENABLED === 'true' && process.env.MAIL_ENABLED === 'true'}/>
        </div>
    )
}