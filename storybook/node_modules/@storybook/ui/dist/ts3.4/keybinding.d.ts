declare const codeToKeyMap: {
    Space: string;
    Slash: string;
    ArrowLeft: string;
    ArrowUp: string;
    ArrowRight: string;
    ArrowDown: string;
    Escape: string;
    Enter: string;
};
interface Modifiers {
    alt?: boolean;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
}
export declare const matchesModifiers: (modifiers: Modifiers | false, event: KeyboardEvent) => boolean;
export declare const matchesKeyCode: (code: keyof typeof codeToKeyMap, event: KeyboardEvent) => boolean;
export {};
