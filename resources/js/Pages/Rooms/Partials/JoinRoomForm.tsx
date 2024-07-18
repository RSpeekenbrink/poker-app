import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {PageProps} from "@/types";

export default function JoinRoomForm({ room, className = '' }: PageProps<{ className?: string }>) {
    const nameInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: localStorage.getItem('name') ?? '',
    });

    const joinRoom: FormEventHandler = (e) => {
        e.preventDefault();

        localStorage.setItem('name', data.name);

        post(route('room.join.request', room.slug), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    nameInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Join a room and start voting for story points!
                </p>
            </header>

            <form onSubmit={joinRoom} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Your Name"/>

                    <TextInput
                        id="name"
                        ref={nameInput}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div>
                    <PrimaryButton className={'w-full'} disabled={processing}>Join</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Joined.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
