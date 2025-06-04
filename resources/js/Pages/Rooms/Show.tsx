import {Head, router} from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import {PageProps, ResetEvent, ShowEvent, User, Votes, VotingEvent, VotingOption} from "@/types";
import {useEffect, useState} from "react";
import Participants from "@/Pages/Rooms/Partials/Participants";
import VoterCard from "@/Components/VoterCard";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {LinkIcon} from "@heroicons/react/24/solid";

export default function Show({ room, user }: PageProps) {
    if (!room) {
        return;
    }

    const [participants, setParticipants] = useState<User[]>([]);
    const [votes, setVotes] = useState<Votes>({});
    const [showVotes, setShowVotes] = useState<boolean>(room.show);

    const [currentVote, setCurrentVote] = useState<VotingOption|null>();

    useEffect(() => {
        const channel = window.Echo.join(`room.${room.slug}`)
            .here((users: User[]) => {
                setVotes(room.votes);
                setParticipants(users);

                if (user && room.votes && room.votes.hasOwnProperty(user.id)) {
                    setCurrentVote(room.votes[user.id]);
                }
            })
            .joining((user: User) => {
                setParticipants(state => [...state, user]);
            })
            .leaving((user: User) => {
                setParticipants(state => {
                    let updated = [...state];
                    const index = updated.indexOf(user);

                    if (index !== undefined) {
                        updated.splice(index, 1);
                        return updated;
                    }

                    return state;
                })
            })
            .error((error: any) => {
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
    }, [room]);

    function vote(vote: VotingOption) {
        if (!room) {
            return;
        }

        window.axios.post(route('room.vote', room.slug), {
            vote
        }).then(() => setCurrentVote(vote));
    }

    function toggleVotes() {
        if (!room) {
            return;
        }

        window.axios.post(route('room.showVotes', room.slug), {
            show: !showVotes
        });
    }

    function resetVotes() {
        if (!room) {
            return;
        }

        if (window.confirm("Do you really want to reset votes for everyone?")) {
            window.axios.post(route('room.reset', room.slug));
        }
    }

    function copyRoomUrl() {
        let url = route('room.show', room?.slug);

        navigator.clipboard.writeText(url);
    }

    return (
        <Layout>
            <Head title={room.name}/>

            <div className="min-h-full flex flex-col justify-center mx-2 py-2 sm:mx-0 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {room.name}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex justify-between">
                    <DangerButton onClick={() => router.visit(route('index'))}>
                        Leave
                    </DangerButton>

                    <div className='flex justify-end'>
                        <SecondaryButton onClick={() => resetVotes()}>
                            Reset Votes
                        </SecondaryButton>

                        <SecondaryButton onClick={() => toggleVotes()}>
                            { showVotes ? 'Hide votes' : 'Show votes' }
                        </SecondaryButton>

                        <SecondaryButton onClick={() => copyRoomUrl()}>
                            <LinkIcon className="size-4" />
                        </SecondaryButton>
                    </div>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="flex justify-center gap-4 flex-wrap">
                            {window.VotingOptions.map((value: VotingOption) => {
                                return <VoterCard onClick={() => vote(value)} key={value} active={value === currentVote}
                                                  value={value} clickable/>
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="space-y-6">
                            <Participants participants={participants} votes={votes} showVote={showVotes}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
