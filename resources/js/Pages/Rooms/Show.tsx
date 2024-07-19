import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import {PageProps, User, VotingEvent, VotingOption} from "@/types";
import {useEffect, useState} from "react";
import Participants from "@/Pages/Rooms/Partials/Participants";
import VoterCard from "@/Components/VoterCard";

export default function Show({ room, user }: PageProps) {
    const [participants, setParticipants] = useState<User[]>([]);

    useEffect(() => {
        if (!room) {
            return;
        }

        const channel = window.Echo.join(`room.${room.slug}`)
            .here((users: User[]) => {
                setParticipants(users);
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
                console.error(error);
            });

            channel.listen('.voted', (event: VotingEvent) => {
                setParticipants(participants => {
                    let updated = [...participants];

                    const index = updated.findIndex((element: User) => element.id === event.user_id);

                    if (index !== undefined) {
                        updated[index].currentVote = event.vote;
                    }

                    return updated;
                });
            });

        return () => {
            window.Echo.disconnect();
        };
    }, [room]);

    if (!room) {
        return;
    }

    function vote(vote: VotingOption) {
        if (!room) {
            return;
        }

        window.axios.post(route('room.vote', room.slug), {
            vote
        });
    }

    return (
        <Layout>
            <Head title={room.name}/>

            <div className="min-h-full flex flex-col justify-center mx-2 py-2 sm:mx-0 sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {room.name}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="flex justify-center gap-4 flex-wrap">
                            { window.VotingOptions.map((value: VotingOption) => {
                                return <VoterCard onClick={() => vote(value)} key={ value } className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" value={value} />
                            }) }
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="space-y-6">
                            <Participants participants={participants}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
