import Link from "next/link";

const LNG_FLAG_MAP = [
    {
        key: "en",
        flag: "🇬🇧",
        label: "English"
    },
    {
        key: "fr",
        flag: "🇫🇷",
        label: "Français"
    },
    {
        key: "de",
        flag: "🇩🇪",
        label: "Deutsch"
    },
    {
        key: "da",
        flag: "🇩🇰",
        label: "Dansk"
    },
]

export default function Header() {
    return (<div className="navbar py-8">
        <div className="navbar-start font-extrabold">
            LABEYE Loïc
        </div>
        <div className='navbar-end'>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-32 space-y-2 p-2 shadow">
                    {LNG_FLAG_MAP.map(entry => {
                        return (<Link key={entry.key} href={entry.key}>{entry.flag}  {entry.label}</Link>);
                    })}                </ul>
            </div>
            <label className="grid cursor-pointer place-items-center">
                <input
                    type="checkbox"
                    value="dracula"
                    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 dark:hidden" />
                <input
                    type="checkbox"
                    value="light"
                    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 hidden dark:block" />
                <svg
                    className="stroke-base-100 fill-base-100 row-start-1 col-start-1 dark:col-start-2"

                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                    className="stroke-base-100 fill-base-100 row-start-1 col-start-2 dark:col-start-1"

                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>

            </label>
        </div>
    </div>)
}