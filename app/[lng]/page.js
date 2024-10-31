
import Experiences from "./components/experiences";
import Intro from "./components/intro";

export const metadata = {
    title: 'LABEYE Loïc',
    description: 'Homepage of LABEYE Loïc CV\'s page'
}


export default async function Snapper({ params: { lng } }) {
    return (
        <>
            <Intro lng={lng} />
            <Experiences lng={lng} />
        </>
    );
}
