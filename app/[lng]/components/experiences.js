import { getTranslations } from "@/app/i18n";
import { IoSchool } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";
import EXPERIENCES from "@/app/consts/experiences.json";

function TimelineEntry({ date, title, description, technologies, Icon, position }) {
    return (
        <li>
            {!position.isFirst && <hr />}
            <div className="timeline-middle py-2 md:py-0">
                <Icon />
            </div>
            <div className={`mb-10 space-y-1 py-2 md:py-0 ${position.left ? "timeline-start md:text-end" : "timeline-end md:text-start"}`}>
                <time className="font-mono italic">{date}</time>
                <div className="text-lg font-black">{title}</div>
                {description && <div>{description}</div>}
                {technologies && (
                    <TechnologyBadges technologies={technologies} />
                )}
            </div>
            {!position.isLast && <hr />}
        </li>
    );
}

function TechnologyBadges({ technologies }) {
    return (
        <div className="space-x-2">
            {technologies.map((tech) => (
                <span key={tech} className="badge badge-outline">{tech}</span>
            ))}
        </div>
    );
}

export default async function Experiences({ lng }) {
    const { t } = await getTranslations(lng, 'experiences');

    const entries = EXPERIENCES.map(({ type, key, ...entry }, index, array) => ({
        ...entry,
        key,
        date: t(`${type}.${key}.date`),
        title: t(`${type}.${key}.title`),
        description: type === "work" && t(`${type}.${key}.description`),
        technologies: entry.technologies,
        Icon: type === "work" ? PiBuildingsFill : IoSchool,
        position: calculatePosition(index, array.length),
    }));

    return (
        <ul id="timeline" className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical snap-start section-header xl:px-[16%]" data-section-name={t('experiences.section')}>
            {entries.map(({ key, ...entry }) => (
                <TimelineEntry key={key} {...entry} />
            ))}
        </ul>
    );
}

function calculatePosition(index, total) {
    return {
        isFirst: index === 0,
        isLast: index === total - 1,
        left: index % 2 === 0,
    };
}
