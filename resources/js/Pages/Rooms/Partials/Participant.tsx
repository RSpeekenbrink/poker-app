import {User, VotingOption} from "@/types";
import {BackgroundType, createAvatar} from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';
import VoterCard from "@/Components/VoterCard";

export default function Participant({ participant, vote, showVote = false }: { participant: User; vote?: VotingOption; showVote: boolean; }) {
    const GRADIENT_LINEAR: BackgroundType = 'gradientLinear';

    const avatar = createAvatar(funEmoji, {
        seed: participant.name,
        backgroundType: [GRADIENT_LINEAR],
    }).toDataUri();

    return (
        <>
            <div className="flex items-center gap-4 relative">
                <img className="w-10 h-10 rounded-full" src={avatar} alt=""/>
                <div className="font-medium dark:text-white">
                    <div>
                        {participant.name}
                    </div>
                </div>
                <VoterCard className="absolute right-0" value={ vote } show={showVote} />
            </div>
        </>
    );
}
