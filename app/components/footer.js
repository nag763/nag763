
import { useTranslation} from "react-i18next";

export default function Footer() {
    const { t } = useTranslation(); 

    return (
        <footer className="footer footer-center text-base-content rounded px-10 py-8">
            <aside>
                <p>{t('legal')}</p> 
            </aside>
        </footer>
    );
}