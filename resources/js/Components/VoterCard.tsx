import {VotingOption} from "@/types";
import {HTMLAttributes} from "react";

export default function VoterCard({ className = '', value, ...props }: HTMLAttributes<HTMLDivElement> & { className?: string, value?: VotingOption}) {
    return (
        <div
            { ...props }
            className={
                `p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ` + className
            }
        >
            { value ?? '-' }
        </div>
    );
}
