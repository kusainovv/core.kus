
export const throttle = (callback: CallableFunction, delay: number) => {
    let lastCalled = 0;

    return (...args: any) => {
        let now = new Date().getTime();
    
        if (now - lastCalled < delay) {
            return;
        }
    
        lastCalled = now;
        return callback(...args);
    }
}