/**
 * @callback problematic function 
 * @function_name name of function for showing next
 * @returns callback
 */
export const prepare = (callback: any, function_name: string) => {
    try {
        if (typeof callback !== 'function') {
            throw new Error(`Function ${function_name} isn't callable`);
        }

        return callback();
    } catch(error) {
        console.error(error);
        return () => {}
    }
}