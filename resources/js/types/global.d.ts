import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import Pusher from "pusher-js";
import Echo from "laravel-echo";

declare global {
    interface Window {
        axios: AxiosInstance;
        refreshTheme:  Function;
        Pusher: typeof Pusher;
        Echo: Echo;
    }

    var route: typeof ziggyRoute;
}
