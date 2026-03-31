import Participant from '@/Pages/Rooms/Partials/Participant';
import type { User, Votes } from '@/types';

export default function Participants({
    participants,
    votes,
    showVote = false,
}: {
    participants: User[];
    votes: Votes;
    showVote: boolean;
}) {
    function getVote(userId: string) {
        if (votes && Object.prototype.hasOwnProperty.call(votes, userId)) {
            return votes[userId];
        }

        return undefined;
    }

    return (
        <>
            {participants.map((user) => {
                return (
                    <Participant
                        key={user.id}
                        participant={user}
                        vote={getVote(user.id)}
                        showVote={showVote}
                    />
                );
            })}
        </>
    );
}
