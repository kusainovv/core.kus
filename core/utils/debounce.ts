export const debounce = (callback: Function, delay: number) => {
    let timeout : ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(args), delay);
    }
}