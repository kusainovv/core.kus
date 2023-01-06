import { MutableRefObject, RefObject } from "react";
import { useEventListener } from "./useEventListener"

/**
 * @param trigger - define border of element
 * @param handleEvent - callback when click was outside
 */
export const useClickOutside = (trigger: null | RefObject<any> | MutableRefObject<any>, handleEvent: Function) : void => {
    useEventListener('click', (event: MouseEvent) => {
        const el = trigger?.current;
        
        if (!el || el.contains(event.target)) {
            return;
        }
        
        handleEvent(event);
    }, trigger);
}