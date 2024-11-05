import { useTranslation } from "@/app/i18n";

export default async function Contact({ lng }) {
    const { t } = await useTranslation(lng);
    return (
        <div className="h-full snap-center items-center justify-center w-full flex flex-col space-y-3 md:space-y-8 ">
            <h1 className="text-lg md:text-2xl lg:text-5xl font-bold">{t('get_in_touch')}</h1>
            <h1 className="md:text-xl font-semibold">{t('get_in_touch_desc')}</h1>
            <form className="space-y-4 w-4/5 md:w-2/5">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{t('name')}</span>
                    </div>
                    <input
                        type="text"
                        placeholder={(t('type_here'))}
                        required={true}
                        minLength={2}
                        className="input input-bordered input-info w-full " />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{t('topic')}</span>
                    </div>
                    <input
                        type="text"
                        required={true} 
                        placeholder={(t('type_here'))}
                        minLength={2}
                        className="input input-bordered input-info w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{(t('content'))}</span>
                    </div>
                    <textarea className="textarea textarea-info resize-none" required={true}
                        minLength={2} 
                        placeholder={(t('type_here'))} ></textarea>
                </label>
                <button className="btn btn-info btn-outline animate-pulse w-full">{(t('send'))}</button>
            </form>
        </div>
    )
}