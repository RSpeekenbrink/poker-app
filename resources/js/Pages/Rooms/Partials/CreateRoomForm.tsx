import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function CreateRoomForm({ className = '' }: { className?: string }) {
    const roomNameInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        room_name: '',
        name: localStorage.getItem('name') ?? '',
    });

    const createRoom: FormEventHandler = (e) => {
        e.preventDefault();

        localStorage.setItem('name', data.name);

        post(route('room.create'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.room_name) {
                    reset('room_name');
                    roomNameInput.current?.focus();
                }

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
                    Create a new room, share the URL with the rest of your team to start voting for story points!
                </p>
            </header>

            <form onSubmit={createRoom} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="room_name" value="Room Name"/>

                    <TextInput
                        id="room_name"
                        ref={roomNameInput}
                        value={data.room_name}
                        onChange={(e) => setData('room_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="room-name"
                    />

                    <InputError message={errors.room_name} className="mt-2"/>
                </div>

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

                <div className="flex justify-end items-center gap-4">
                    <PrimaryButton className={'w-full'} disabled={processing}>Create</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Created.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
