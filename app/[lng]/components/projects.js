import { useTranslation } from "@/app/i18n";
import Browser from "./browser";
import PROJECTS from "@/app/consts/projects.json";


export default async function Projects({ lng }) {
    const { t } = await useTranslation(lng);

    return (
        <div className="snap-center h-full">
            <Browser data={PROJECTS.map(project => ({
                ...project,
                description: t(`${project.name}.description`)
            }))} translations={{ goto_gh: t('goto_gh') }}/>
        </div >
    )
}