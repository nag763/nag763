import { useTranslation } from "@/app/i18n";
import { IoSchool } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";


async function TimelineWorkEntry({ date, title, description, technologies, left = true, isFirst = false, isLast = false, lng }) {
    const { t } = await useTranslation(lng);
    return (
        <li key={title}>
            <hr hidden={isFirst} />
            <div className="timeline-middle">
                <PiBuildingsFill />
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
        <li key={title}>
            <hr hidden={isFirst} />
            <div className="timeline-middle">
                <IoSchool/>
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
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical snap-start ">
            {workKeys.map((key, index) => {
                return (<TimelineWorkEntry date={t(`work.${key}.date`)} title={t(`work.${key}.title`)} description={t(`work.${key}.description`)} technologies={t(`work.${key}.technologies`)} left={index % 2 == 0} isFirst={index == 0} lng={lng} />);
            })}
            {scholarKeys.map((key, index) => {
                return (<TimelineEducationEntry date={t(`education.${key}.date`)} title={t(`education.${key}.title`)} left={(workKeys.length + index) % 2 == 0} isLast={index + 1 == scholarKeys.length} lng={lng} />);
            })}

        </ul>
    )

}