import { FunctionComponent } from 'react';
import { State } from '@storybook/api';
import { CSSObject } from '@storybook/theming';
declare const NotificationList: FunctionComponent<{
    placement: CSSObject;
    notifications: State['notifications'];
    clearNotification: (id: string) => void;
}>;
export default NotificationList;
