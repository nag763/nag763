import { useTranslation } from "../../i18n";


export default async function Footer({lng}){
    const { t } = await useTranslation(lng);
    return (
        <footer className="footer footer-center text-base-content rounded px-10 py-8">
            <aside>
                <p>{t('legal')}</p>
            </aside>
        </footer>
    );

}
