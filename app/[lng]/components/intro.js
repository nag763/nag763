import { getTranslations } from "@/app/i18n";
import StartButton from "./start_button";

function getYearsSince(dateString) {
    const startDate = new Date(dateString);
    const today = new Date();

    let yearsDifference = today.getFullYear() - startDate.getFullYear();

    if (
        today.getMonth() < startDate.getMonth() ||
        (today.getMonth() === startDate.getMonth() && today.getDate() < startDate.getDate())
    ) {
        yearsDifference--;
    }

    return yearsDifference;
}

export default async function Intro({ lng }) {
    const { t } = await getTranslations(lng);
    return (

        <div className="flex flex-col h-full p-12 font-mono snap-center">
            <div className="hero h-full">
                <div className="hero-content ">
                    <div className="max-w-md md:max-w space-y-4 md:space-y-8">
                        <h1 className="text-2xl md:text-5xl lg:text-8xl text-left md:text-center font-bold bg-gradient-to-r text-transparent bg-clip-text from-indigo-500 via-purple-500 to-pink-500">LABEYE Loïc</h1>
                        <div className="pl-6 text-lg md:text-xl lg:text-3xl font-semibold space-y-2">
                            <p className="animate-fade-right animate-duration-1000 animate-delay-1000">💼 {t('software_engineer')}</p>
                            <p className="animate-fade-right animate-duration-1000 animate-delay-[2000ms]">{t('age', { "age": getYearsSince("1997-11-17") })}</p>
                            <p className="animate-fade-right animate-duration-1000 animate-delay-[3000ms]">📍 Paris, France</p>
                        </div>
                        <p className="animate-fade-up md:text-lg lg:text-xl animate-duration-1000 animate-delay-[4000ms] text-justify">
                            {t('intro')}
                        </p>
                        <div className="w-full flex justify-center">
                            <StartButton label={t('start')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}