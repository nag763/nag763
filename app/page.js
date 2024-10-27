
export const metadata = {
  title: 'LABEYE Loïc',
  description: 'Homepage of LABEYE Loïc CV\'s page'
}

function getYearsSince(dateString) {
  const startDate = new Date(dateString);
  const today = new Date();

  let yearsDifference = today.getFullYear() - startDate.getFullYear();

  // Ajuster si l'anniversaire de l'année en cours n'est pas encore passé
  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() && today.getDate() < startDate.getDate())
  ) {
    yearsDifference--;
  }

  return yearsDifference;
}

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-full py-12 font-mono ">
      <div className="text-left space-y-8 h-1/2 w-1/2 flex-1">
        <h1 className="text-8xl animate-fade">LABEYE Loïc</h1>

        <div className="pl-6 space-y-4 font-bold text-2xl">
          <p className="animate-fade-right animate-duration-1000 animate-delay-1000">💼 Ingénieur Logiciel</p>
          <p className="animate-fade-right animate-fade-right animate-duration-1000 animate-delay-[2000ms]">🎂 {getYearsSince("1997-11-17")} ans</p>
          <p className="animate-fade-right animate-fade-right animate-duration-1000 animate-delay-[3000ms]">📍 Paris, France</p>
        </div>
      </div>
      <div className="flex text-2xl h-1/2 flex-1">
        <div className="w-1/2"></div>
        <h1 className="animate-fade-up animate-duration-1000 animate-delay-[4000ms] flex-1 ">
          Bienvenue sur mon site personnel. Ce site a pour but de vous présenter mes expériences et projets.
        </h1>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
}
