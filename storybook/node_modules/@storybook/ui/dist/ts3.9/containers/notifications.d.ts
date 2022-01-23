import { FunctionComponent } from 'react';
import { Combo } from '@storybook/api';
export declare const mapper: ({ state }: Combo) => {
    notifications: import("@storybook/api/dist/ts3.9/modules/notifications").Notification[];
    clearNotification: (id: string) => void;
};
declare const NotificationConnect: FunctionComponent<any>;
export default NotificationConnect;
