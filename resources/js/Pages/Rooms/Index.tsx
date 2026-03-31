import { Head } from '@inertiajs/react';
import CreateRoomForm from '@/Pages/Rooms/Partials/CreateRoomForm';
import type { PageProps } from '@/types';

export default function Index({ error }: PageProps<{ error?: string }>) {
    return (
        <>
            <Head title="Create Room" />

            <div className="mx-2 flex min-h-full flex-col justify-center py-2 sm:mx-0 sm:px-6 sm:py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create a room
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
                        by
                        <a
                            href="https://rspeekenbrink.co.uk"
                            className="ml-1 font-medium text-blue-500 hover:text-blue-400 dark:text-cyan-500 dark:hover:text-cyan-400"
                            target="_blank"
                        >
                            RSpeekenbrink
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    {error ? (
                        <div
                            className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="space-y-6">
                            <CreateRoomForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
