import { RefObject } from "react";
import { useEventListener } from "./useEventListener"

/**
 * 
 * @param trigger - define border of element
 * @param handleEvent - callback when click was outside
 */
export const useClickOutside = (trigger: null | RefObject<HTMLElement>, handleEvent: Function) : void => {
    useEventListener('mousedown', (event: MouseEvent) => {
        const el = trigger?.current;
        
        if (!el || el.contains(event.target as Node)) {
            return;
        }
        
        handleEvent(event);
    }, trigger);
}