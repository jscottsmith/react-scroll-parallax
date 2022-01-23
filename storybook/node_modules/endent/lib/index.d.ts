declare function endent(strings: TemplateStringsArray, ...values: any[]): string;
declare namespace endent {
    var pretty: (data?: string | number | object | null | undefined) => string | number | object | null | undefined;
}
export default endent;
