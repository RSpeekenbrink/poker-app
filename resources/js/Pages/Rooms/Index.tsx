import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import CreateRoomForm from "@/Pages/Rooms/Partials/CreateRoomForm";

export default function Index() {
    return (
        <Layout>
            <Head title="Create Room"/>

            <div className="min-h-full flex flex-col justify-center mx-2 py-2 sm:mx-0 sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create a room
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
                        by
                        <a href="https://rspeekenbrink.co.uk"
                           className="font-medium text-blue-500 hover:text-blue-400 dark:hover:text-cyan-400 ml-1 dark:text-cyan-500"
                           target="_blank"
                        >
                        RSpeekenbrink
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="space-y-6">
                            <CreateRoomForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
