export const prepare = (callback: any, error_message: string) => {
    try {
        if (typeof callback !== 'function') {
            throw new Error(`Function ${callback} isn't callable`);
        }

        return callback();
    } catch(error) {
        console.error(error);
        return () => {}
    }
}