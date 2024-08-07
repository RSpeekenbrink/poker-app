import {VotingOption} from "@/types";
import {HTMLAttributes} from "react";
import {CubeIcon, CubeTransparentIcon} from "@heroicons/react/24/outline";

export default function VoterCard({ className = '', value, show = true, active = false, clickable = false, ...props }: HTMLAttributes<HTMLDivElement> & { className?: string; value?: VotingOption; show?: boolean; active?: boolean; clickable?: boolean;}) {
    return (
        <div
            { ...props }
            className={`voter-card ` + className}
        >
            <div className={'inner ' + ((active ? 'bg-gradient-to-br from-sky-500 to-sky-200 text-white dark:from-cyan-600 dark:to-cyan-900 ' : (clickable ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ' : '')) + (show ? 'flip' : ''))}>
                <div className='front'>
                    { value ? <CubeIcon className="size-6" /> : <CubeTransparentIcon className="size-6" /> }
                </div>
                <div className='back'>
                    {value ?? '-'}
                </div>
            </div>
        </div>
    );
}
