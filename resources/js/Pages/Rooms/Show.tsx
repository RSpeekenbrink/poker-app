import { LinkIcon } from '@heroicons/react/24/solid';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import VoterCard from '@/Components/VoterCard';
import Participants from '@/Pages/Rooms/Partials/Participants';
import type {
    PageProps,
    ResetEvent,
    ShowEvent,
    User,
    Votes,
    VotingEvent,
    VotingOption,
} from '@/types';

export default function Show({ room, user }: PageProps) {
    const [participants, setParticipants] = useState<User[]>([]);
    const [votes, setVotes] = useState<Votes>({});
    const [showVotes, setShowVotes] = useState<boolean>(room?.show ?? false);

    const [currentVote, setCurrentVote] = useState<VotingOption | null>();

    useEffect(() => {
        if (!room) {
            return;
        }

        const channel = window.Echo.join(`room.${room.slug}`)
            .here((users: User[]) => {
                setVotes(room.votes);
                setParticipants(users);

                if (
                    user &&
                    room.votes &&
                    Object.prototype.hasOwnProperty.call(room.votes, user.id)
                ) {
                    setCurrentVote(room.votes[user.id]);
                }
            })
            .joining((joiningUser: User) => {
                setParticipants((state) => [...state, joiningUser]);
            })
            .leaving((leavingUser: User) => {
                setParticipants((state) => {
                    const updated = [...state];
                    const index = updated.indexOf(leavingUser);

                    if (index !== undefined) {
                        updated.splice(index, 1);

                        return updated;
                    }

                    return state;
                });
            })
            .error((error: unknown) => {
                console.error('Websocket Error!', error);

                router.reload();
            });

        channel.listen('.voted', (event: VotingEvent) => {
            setVotes(event.room_votes);
        });

        channel.listen('.reset', (event: ResetEvent) => {
            setVotes(event.room_votes);
            setCurrentVote(null);
            setShowVotes(false);
        });

        channel.listen('.show', (event: ShowEvent) => {
            setShowVotes(event.show);
        });

        return () => {
            window.Echo.leave(`room.${room.slug}`);
        };
    }, [room, user]);

    function vote(vote: VotingOption) {
        if (!room) {
            return;
        }

        window.axios
            .post(route('room.vote', room.slug), {
                vote,
            })
            .then(() => setCurrentVote(vote));
    }

    function toggleVotes() {
        if (!room) {
            return;
        }

        window.axios.post(route('room.showVotes', room.slug), {
            show: !showVotes,
        });
    }

    function resetVotes() {
        if (!room) {
            return;
        }

        if (window.confirm('Do you really want to reset votes for everyone?')) {
            window.axios.post(route('room.reset', room.slug));
        }
    }

    function copyRoomUrl() {
        const url = route('room.show', room?.slug);

        navigator.clipboard.writeText(url).then(() =>
            window.toast.info('Room URL copied to clipboard!', {
                icon: <>🔗</>,
            }),
        );
    }

    if (!room) {
        return;
    }

    return (
        <>
            <Head title={room.name} />

            <div className="mx-2 flex min-h-full flex-col justify-center py-2 sm:mx-0 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {room.name}
                    </h2>
                </div>

                <div className="mt-8 flex justify-between sm:mx-auto sm:w-full sm:max-w-md">
                    <DangerButton onClick={() => router.visit(route('index'))}>
                        Leave
                    </DangerButton>

                    <div className="flex justify-end">
                        <SecondaryButton onClick={() => resetVotes()}>
                            Reset Votes
                        </SecondaryButton>

                        <SecondaryButton onClick={() => toggleVotes()}>
                            {showVotes ? 'Hide votes' : 'Show votes'}
                        </SecondaryButton>

                        <SecondaryButton onClick={() => copyRoomUrl()}>
                            <LinkIcon className="size-4" />
                        </SecondaryButton>
                    </div>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="flex flex-wrap justify-center gap-4">
                            {window.VotingOptions.map((value: VotingOption) => {
                                return (
                                    <VoterCard
                                        onClick={() => vote(value)}
                                        key={value}
                                        active={value === currentVote}
                                        value={value}
                                        clickable
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="space-y-6">
                            <Participants
                                participants={participants}
                                votes={votes}
                                showVote={showVotes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
