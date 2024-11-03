import { useTranslation } from "@/app/i18n";
import { IoSchool } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";

async function TimelineEntry({ date, title, description, technologies, Icon, position, t }) {
    return (
        <li>
            <hr hidden={position.isFirst} />
            <div className="timeline-middle py-2 md:py-0">
                <Icon />
            </div>
            <div className={`mb-10 space-y-1 py-2 md:py-0 ${position.left ? "timeline-start md:text-end" : "timeline-end md:text-start"}`}>
                <time className="font-mono italic">{date}</time>
                <div className="text-lg font-black">{title}</div>
                {description && <div>{description}</div>}
                {technologies && (
                    <div className="space-x-2">
                        <span className="underline">{t('techs')} :</span>
                        <span>{technologies}</span>
                    </div>
                )}
            </div>
            <hr hidden={position.isLast} />
        </li>
    );
}

export default async function Experiences({ lng }) {
    const { t } = await useTranslation(lng, 'experiences');
    
    const workEntries = ["aubay", "aubay.intern", "sustainecho"].map((key) => ({
        key,
        date: t(`work.${key}.date`),
        title: t(`work.${key}.title`),
        description: t(`work.${key}.description`),
        technologies: t(`work.${key}.technologies`),
        Icon: PiBuildingsFill,
    }));

    const scholarEntries = ["graduated", "belgium", "ireland", "rouen"].map((key) => ({
        key,
        date: t(`education.${key}.date`),
        title: t(`education.${key}.title`),
        Icon: IoSchool,
    }));

    const entries = [...workEntries, ...scholarEntries].map((entry, index, array) => ({
        ...entry,
        position: {
            isFirst: index === 0,
            isLast: index === array.length - 1,
            left: index % 2 === 0,
        },
        t,
    }));

    return (
        <ul id="timeline" className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical snap-start ">
            {entries.map(({ key, ...entry }) => (
                <TimelineEntry key={key} {...entry} />
            ))}
        </ul>
    );
}
