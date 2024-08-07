import {User, Votes} from "@/types";
import Participant from "@/Pages/Rooms/Partials/Participant";

export default function Participants({ participants, votes, showVote = false }: { participants: User[]; votes: Votes; showVote: boolean; }) {
    function getVote(userId: string) {
        if (votes && votes.hasOwnProperty(userId)) {
            return votes[userId];
        }

        return undefined;
    }

    return (
        <>
            { participants.map((user, i) => {
                // Return the element. Also pass key
                return (<Participant key={ user.id } participant={ user } vote={getVote(user.id)} showVote={showVote} />)
            })}
        </>
    );
}
