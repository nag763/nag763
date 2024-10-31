import { useTranslation } from "@/app/i18n";


async function TimelineWorkEntry({ date, title, description, technologies, left = true, isFirst = false, isLast = false, lng }) {
    const { t } = await useTranslation(lng);
    return (
        <li>
            <hr hidden={isFirst} />
            <div className="timeline-middle">
                {/** TODO : Use Next Images for perfs */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M11 4V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1ZM9 2.5H7a.5.5 0 0 0-.5.5v1h3V3a.5.5 0 0 0-.5-.5ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                    <path d="M3 11.83V12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-.17c-.313.11-.65.17-1 .17H4c-.35 0-.687-.06-1-.17Z" />
                </svg>



            </div>
            <div className={`mb-10 space-y-1 ${left ? "timeline-start md:text-end" : "timeline-end md:text-start"}`}>
                <time className="font-mono italic">{date}</time>
                <div className="text-lg font-black">{title}</div>
                <div>{description}</div>
                <div className="space-x-2"><span className="underline">{t('techs')} :</span><span>{technologies}</span></div>
            </div>
            <hr hidden={isLast} />
        </li>
    )
}

async function TimelineEducationEntry({ date, title, left = true, isFirst = false, isLast = false }) {
    return (
        <li>
            <hr hidden={isFirst} />
            <div className="timeline-middle">

                {/** TODO : Use Next Images for perfs */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                    <path d="M7.702 1.368a.75.75 0 0 1 .597 0c2.098.91 4.105 1.99 6.004 3.223a.75.75 0 0 1-.194 1.348A34.27 34.27 0 0 0 8.341 8.25a.75.75 0 0 1-.682 0c-.625-.32-1.262-.62-1.909-.901v-.542a36.878 36.878 0 0 1 2.568-1.33.75.75 0 0 0-.636-1.357 38.39 38.39 0 0 0-3.06 1.605.75.75 0 0 0-.372.648v.365c-.773-.294-1.56-.56-2.359-.8a.75.75 0 0 1-.194-1.347 40.901 40.901 0 0 1 6.005-3.223ZM4.25 8.348c-.53-.212-1.067-.411-1.611-.596a40.973 40.973 0 0 0-.418 2.97.75.75 0 0 0 .474.776c.175.068.35.138.524.21a5.544 5.544 0 0 1-.58.681.75.75 0 1 0 1.06 1.06c.35-.349.655-.726.915-1.124a29.282 29.282 0 0 0-1.395-.617A5.483 5.483 0 0 0 4.25 8.5v-.152Z" />
                    <path d="M7.603 13.96c-.96-.6-1.958-1.147-2.989-1.635a6.981 6.981 0 0 0 1.12-3.341c.419.192.834.393 1.244.602a2.25 2.25 0 0 0 2.045 0 32.787 32.787 0 0 1 4.338-1.834c.175.978.315 1.969.419 2.97a.75.75 0 0 1-.474.776 29.385 29.385 0 0 0-4.909 2.461.75.75 0 0 1-.794 0Z" />
                </svg>

            </div>
            <div className={`mb-10 space-y-1 ${left ? "timeline-start md:text-end" : "timeline-end md:text-start"}`}>
                <time className="font-mono italic">{date}</time>
                <div className="text-lg font-black">{title}</div>
            </div>
            <hr hidden={isLast} />
        </li>
    )
}

export default async function Experiences({ lng }) {
    const { t } = await useTranslation(lng, 'experiences');
    const workKeys = ["aubay", "aubay.intern", "sustainecho"];
    const scholarKeys = ["graduated", "belgium", "ireland", "rouen"];
    return (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical snap-start h-full">
            {workKeys.map((key, index) => {
                return (<TimelineWorkEntry date={t(`work.${key}.date`)} title={t(`work.${key}.title`)} description={t(`work.${key}.description`)} technologies={t(`work.${key}.technologies`)} left={index % 2 == 0} isFirst={index == 0} lng={lng} />);
            })}
            {scholarKeys.map((key, index) => {
                return (<TimelineEducationEntry date={t(`education.${key}.date`)} title={t(`education.${key}.title`)} left={(workKeys.length + index) % 2 == 0} isLast={index + 1 == scholarKeys.length} lng={lng} />);
            })}

        </ul>
    )

}