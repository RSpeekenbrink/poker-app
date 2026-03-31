import { CubeIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import type { HTMLAttributes } from 'react';
import type { VotingOption } from '@/types';

export default function VoterCard({
    className = '',
    value,
    show = true,
    active = false,
    clickable = false,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    className?: string;
    value?: VotingOption;
    show?: boolean;
    active?: boolean;
    clickable?: boolean;
}) {
    return (
        <div {...props} className={`voter-card ` + className}>
            <div
                className={
                    'inner ' +
                    ((active
                        ? 'bg-linear-to-br from-sky-500 to-sky-200 text-white dark:from-cyan-600 dark:to-cyan-900 '
                        : clickable
                          ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 '
                          : '') +
                        (show ? 'flip' : ''))
                }
            >
                <div className="front">
                    {value ? (
                        <CubeIcon className="size-6" />
                    ) : (
                        <CubeTransparentIcon className="size-6" />
                    )}
                </div>
                <div className="back">{value ?? '-'}</div>
            </div>
        </div>
    );
}
