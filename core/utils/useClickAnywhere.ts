import { RefObject, useEffect, useState } from "react"
import { throttle } from "./throttle";
import { useEventListener } from "./useEventListener";

interface ClickAnywhereOutputData {
    isClick: boolean,
    cordClick: {
        cordX: number,
        cordY: number
    }
}

/**
 * @delay delay for throttle function
 * @returns config for one click
*/
export const useClickAnywhere = (delay: number, trigger: null | RefObject<HTMLElement>) : ClickAnywhereOutputData => {
    const [isClick, setClick] = useState(false);
    const [cordClick, setCordClick] = useState({
        cordX: 0,
        cordY: 0
    });

    const MakeClick = throttle((event: MouseEvent) => {
        setClick(true);
        setCordClick({
            cordX: event.pageX,
            cordY: event.pageY
        });
    }, delay);

    const { runListener } = useEventListener('click', MakeClick, trigger);

    useEffect(() => {
        runListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cordClick, isClick]);

    return {
        isClick,
        cordClick
    }
}