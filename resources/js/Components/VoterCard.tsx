import {VotingOption} from "@/types";

export default function VoterCard({ className = '', value }: { className?: string, value?: VotingOption}) {
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
