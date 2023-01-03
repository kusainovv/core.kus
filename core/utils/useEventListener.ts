import { RefObject, useEffect, useState } from "react"

interface EventListenerDataOutput {
    runListener: () => void,
    deleteListener: () => void
}

export const useEventListener = (event: string, callback: Function, trigger: RefObject<HTMLElement> | Window | null) : EventListenerDataOutput => {
    const [isRunListener, setRunListener] = useState(false);
    const ref_node = typeof trigger !== 'undefined' ? (trigger as RefObject<HTMLElement>)?.current : window;

    useEffect(() => {
        if (typeof trigger !== 'undefined' && isRunListener) {
            ref_node?.addEventListener(event, () => callback());
        }

        return () => { ref_node?.addEventListener(event, () => callback()) }
    }, [callback, event, ref_node, trigger, isRunListener]);

    const deleteListener = () => {
        ref_node?.removeEventListener(event, () => callback())
    }

    return {
        deleteListener,
        runListener: () => {
            setRunListener(true);
        },
    }
}