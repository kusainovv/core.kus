import { RefObject } from "react";
import { useEventListener } from "./useEventListener"

export const useClickOutside = (trigger: null | RefObject<HTMLElement>, handleEvent: Function) : void => {
    useEventListener('mousedown', (event: MouseEvent) => {
        const el = trigger?.current;
        
        if (!el || el.contains(event.target as Node)) {
            return;
        }
        
        handleEvent(event);
    }, trigger);
}