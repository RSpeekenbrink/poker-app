import { PropsWithChildren } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "@/Components/SecondaryButton";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: PropsWithChildren) {
    const [theme, setTheme] = useLocalStorage(
        'color-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    // Refresh theme after initialization
    window.refreshTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')

        window.refreshTheme();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ToastContainer toastStyle={{
                borderRadius: '10px',
                background: theme === 'dark' ? '#1e2937' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
            }} />
            <header className="pt-4 sm:pt-6 sm:px-6 flex justify-end">
                <SecondaryButton onClick={toggleTheme}>
                    { theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" /> }
                </SecondaryButton>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}
