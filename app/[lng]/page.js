
import Experiences from "./components/experiences";
import Hobbies from "./components/hobbies";
import Intro from "./components/intro";
import Projects from "./components/projects"


export const metadata = {
    title: 'LABEYE Loïc',
    description: 'Homepage of LABEYE Loïc CV\'s page'
}


export default async function Snapper({ params: { lng } }) {
    return (
        <>
            <Intro lng={lng} />
            <Experiences lng={lng} />
            <Projects lng={lng} />
            <Hobbies lng={lng} />
        </>
    );
}
