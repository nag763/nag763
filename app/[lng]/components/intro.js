import { useTranslation } from "@/app/i18n";

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

export default async function Intro({lng}) {
    const {t} = await useTranslation(lng);
    return (

        <div className="flex flex-col justify-between h-full p-12 font-mono snap-center">
            <div className="text-left space-y-8 h-1/2 w-2/3 md:w-1/2 flex-1">
                <h1 className="text-6xl md:text-8xl animate-fade">LABEYE Loïc</h1>

                <div className="pl-6 space-y-4 font-semibold md:text-2xl">
                    <p className="animate-fade-right animate-duration-1000 animate-delay-1000">💼 {t('software_engineer')}</p>
                    <p className="animate-fade-right animate-fade-right animate-duration-1000 animate-delay-[2000ms]">{t('age', { "age": getYearsSince("1997-11-17") })}</p>
                    <p className="animate-fade-right animate-fade-right animate-duration-1000 animate-delay-[3000ms]">📍 Paris, France</p>
                </div>
            </div>
            <div className="flex md:text-2xl h-1/2 flex-1 font-semibold">
                <div className="w-1/3 md:w-1/2"></div>
                <h1 className="animate-fade-up animate-duration-1000 animate-delay-[4000ms] flex-1 ">
                    {t('intro')}
                </h1>
                <div className="w-1/5 hidden md:flex"></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-full text-center size-12 animate-pulse" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>

        </div>
    )

}