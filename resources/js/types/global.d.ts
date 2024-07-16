import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        refreshTheme:  Function;
    }

    var route: typeof ziggyRoute;
}
