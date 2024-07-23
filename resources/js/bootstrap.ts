import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;

/**
 * We'll add a helper function to quickly refresh the current theme.
 */
window.refreshTheme = () => {
    if (localStorage.getItem('color-theme') === '"dark"') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
}

window.refreshTheme();

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

import toast from 'react-hot-toast';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

window.toast = toast;

window.Echo.connector.pusher.connection.bind('state_change', function(states: any) {
    console.info('Websocket Status: ', states)

    if(states.current === 'connected') {
        window.toast.dismiss();

        if (states.previous === 'unavailable') {
            window.toast.success('Reconnected!')
        }
    }

    if(states.current === 'connecting') {
        window.toast.dismiss();
        window.toast.loading('Reconnecting...');
    }

    if(states.current === 'unavailable') {
        window.toast.dismiss();
        window.toast.error('Websocket Unavailable! Attempting Reconnect..', { duration: 99999 })
    }

    if(states.current === 'disconnected') {
        console.error('Websocket Disconnected!');
        window.toast.dismiss();
        window.toast.error('Websocket Disconnected! Attempting Reconnect..', { duration: 99999 })
        window.Echo.connector.pusher.connect();
    }
});
