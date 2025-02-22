import Contact from "./components/contact";
import Experiences from "./components/experiences";
import Hobbies from "./components/hobbies";
import Intro from "./components/intro";
import Projects from "./components/projects"
import { getTranslations } from "../i18n";


export async function generateMetadata({ params  }) {
    const { lng } = await params;
    const {t} = await getTranslations(lng);
    return {
      title: t('meta.title'),
      description: t('meta.description'),
      keywords: "LABEYE Loïc, Rust, Javascript, TotalEnergies, NextJS, Python, Web, Software Engineer",
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1.0",
      charset: "UTF-8",
    }
  }
   


export default async function Snapper({ params }) {
  const { lng } = await params;
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
