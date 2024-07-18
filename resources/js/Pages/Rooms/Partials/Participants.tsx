import {User} from "@/types";
import Participant from "@/Pages/Rooms/Partials/Participant";

export default function Participants({ participants }: { participants: User[] }) {
    return (
        <>
            { participants.map((user, i) => {
                // Return the element. Also pass key
                return (<Participant key={ user.id } participant={ user } />)
            })}
        </>
    );
}
