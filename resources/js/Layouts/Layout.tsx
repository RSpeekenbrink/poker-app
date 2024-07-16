import { useEffect, PropsWithChildren } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }: PropsWithChildren) {
    const [theme, setTheme] = useLocalStorage('color-theme', 'light');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')

        window.refreshTheme();
    };

    return (
        <div className="min-h-screen pt-6 sm:pt-0 bg-white dark:bg-gray-900">
            <header className="p-6 flex justify-end">
                <button type="button"
                        onClick={toggleTheme}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    { theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" /> }
                </button>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}
