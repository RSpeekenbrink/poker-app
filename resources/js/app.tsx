import './bootstrap';
import '../css/app.css';

import {createInertiaApp} from '@inertiajs/react';
import Layout from "@/Layouts/Layout";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

window.VotingOptions = ['☕', '1', '2', '3', '5', '8', '13', '20', '?'];

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: () => {
        return Layout
    },
    strictMode: true,
    withApp(app) {
        return <>{app}</>;
    },
    progress: {
        color: '#0382ff',
    },
});
