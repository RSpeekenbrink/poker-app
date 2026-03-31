import { bottts } from '@dicebear/collection';
import type { BackgroundType } from '@dicebear/core';
import { createAvatar } from '@dicebear/core';
import VoterCard from '@/Components/VoterCard';
import type { User, VotingOption } from '@/types';

export default function Participant({
    participant,
    vote,
    showVote = false,
}: {
    participant: User;
    vote?: VotingOption;
    showVote: boolean;
}) {
    const GRADIENT_LINEAR: BackgroundType = 'gradientLinear';

    const avatar = createAvatar(bottts, {
        seed: participant.name,
        backgroundType: [GRADIENT_LINEAR],
        eyes: [
            'eva',
            'frame1',
            'frame2',
            'happy',
            'hearts',
            'robocop',
            'roundFrame01',
            'roundFrame02',
            'sensor',
            'shade01',
        ],
        textureProbability: 75,
    }).toDataUri();

    return (
        <>
            <div className="relative flex items-center gap-4">
                <img className="h-12 w-12 rounded-full" src={avatar} alt="" />
                <div className="font-medium dark:text-white">
                    <div>{participant.name}</div>
                </div>
                <VoterCard
                    className="absolute right-0"
                    value={vote}
                    show={showVote}
                />
            </div>
        </>
    );
}
