import { getTranslations } from "@/app/i18n";
import CERTIFICATIONS from "@/app/consts/certifications.json";
import Link from "next/link";


async function CertificationCard({ certification, t }) {
    return (
        <div className={`card shadow-lg bg-base-${certification.earned ? "200 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"  : "100"}`}>
            <div className="card-body ">
                <div className="flex justify-between space-x-4">
                    <div className="flex-1">
                        <h2 className="card-title">{t(certification.name)}</h2>
                        {certification.earned && <p>{new Date(certification.earned).toLocaleDateString()}</p>}
                    </div>
                    {
                        certification.earned ?
                            <div className="flex-1 md:justify-end flex flex-col-reverse md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2">
                                <Link href={t(`${certification.name}.page`)} target="_blank">
                                    <button className="btn btn-secondary w-full md:w-auto">
                                        {t("view_ceritification_page")}
                                    </button>
                                </Link>
                                <Link href={t(`${certification.name}.check`)} target="_blank">
                                    <button className="btn btn-primary w-full md:w-auto">
                                        {t("check_myself")}
                                    </button>
                                </Link>
                            </div> : <p className="text-right flex-1">{t("not_earned_yet")}</p>
                    }

                </div>
            </div>
        </div>
    );
}

export default async function Certifications({ lng }) {
    const { t } = await getTranslations(lng, 'certifications');

    return (
        <div className="snap-start min-h-full section-header items-center justify-center" data-section-name={t("certifications.section")}>
            <div className="flex flex-col space-y-2">
                {CERTIFICATIONS.map(certification => (
                    <CertificationCard certification={certification} t={t} key={certification.name} />
                ))}
            </div>
        </div >
    )
}