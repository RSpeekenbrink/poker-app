import { ButtonHTMLAttributes } from 'react';

export default function VoterCard({ className = '', value }: { className: string, value?: string}) {
    return (
        <div
            className={
                `p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ` + className
            }
        >
            { value ?? '-' }
        </div>
    );
}
