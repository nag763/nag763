import Contact from "./components/contact";
import Experiences from "./components/experiences";
import Hobbies from "./components/hobbies";
import Intro from "./components/intro";
import Projects from "./components/projects"
import { getTranslations } from "../i18n";


export async function generateMetadata({ params : {lng} }) {
    const {t} = await getTranslations(lng);
    return {
      title: t('meta.title'),
      description: t('meta.description'),
      keywords: "LABEYE Loïc, rust, javascript, Aubay, nextjs, python"
      
    }
  }
   


export default async function Snapper({ params: { lng } }) {
    return (
        <>
            <Intro lng={lng} />
            <Experiences lng={lng} />
            <Projects lng={lng} />
            <Hobbies lng={lng} />
            <Contact lng={lng} />
        </>
    );
}
