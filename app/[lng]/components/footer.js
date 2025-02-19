import { getTranslations } from "../../i18n";


export default async function Footer({lng}){
    const { t } = await getTranslations(lng);
    const currYear = new Date().getFullYear();
    return (
        <footer className="footer footer-center text-base-content rounded px-10 py-8">
            <aside>
                <p>{t('legal', {currYear})}</p>
            </aside>
        </footer>
    );

}
