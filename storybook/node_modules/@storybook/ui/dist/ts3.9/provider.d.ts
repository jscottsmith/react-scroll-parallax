import { Types } from '@storybook/addons';
export default class Provider {
    getElements(_type: Types): void;
    handleAPI(_api: unknown): void;
    getConfig(): {};
}
