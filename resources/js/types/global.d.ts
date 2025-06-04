import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { VotingOption } from "@/types/index";
import { toast } from "react-toastify";

declare global {
    interface Window {
        axios: AxiosInstance;
        refreshTheme:  Function;
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>;
        VotingOptions: VotingOption[];
        toast: typeof toast;
    }

    var route: typeof ziggyRoute;
}
