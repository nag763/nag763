import Link from "next/link";
import ThemeSwitcher from "./theme_switcher";
import { IoLanguageOutline } from "react-icons/io5";
import LanguagesMap from "@/app/consts/languages.json";

const LanguageDropdown = () => {
    return (
        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-32 space-y-2 p-2 shadow">
        {LanguagesMap.map(entry => {
            return (<Link key={entry.key} href={entry.key}>{entry.flag}  {entry.label}</Link>);
        })}                
        </ul>
    )
}

export default function Header() {
    return (<div className="navbar py-8 flex-1 " >
        <div className="navbar-start font-extrabold">
            LABEYE Loïc
        </div>
        <div className='navbar-end'>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                    <IoLanguageOutline size={20}/>
                </div>
                <LanguageDropdown/>
            </div>

            <ThemeSwitcher/>
        </div>
    </div>)
}