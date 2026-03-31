import type { AxiosInstance } from 'axios';
import type Echo from 'laravel-echo';
import type Pusher from 'pusher-js';
import type { toast } from 'react-toastify';
import type { VotingOption } from '@/types/index';
import type { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        refreshTheme: () => void;
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>;
        VotingOptions: VotingOption[];
        toast: typeof toast;
    }

    var route: typeof ziggyRoute;
}
