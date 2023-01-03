export const debounce = (callback: Function, delay: number) => {
    let timeout : ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), delay);
    }
}